'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import SyntaxHighlighterWrapper, { supportedLanguages } from './FixWrapper'
import BlogImage from './BlogImage'

const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false })

interface MarkdownRendererProps {
  content: string
  /** Title shown by the page. A leading duplicate `# H1` is removed. */
  pageTitle?: string
}

const langMap: Record<string, string> = {
  diagram: 'text',
  mermaid: 'mermaid',
  math: 'math',
  text: 'text',
  txt: 'text',
  plaintext: 'text',
  sql: 'sql',
  psql: 'sql',
  postgresql: 'sql',
  plsql: 'sql',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'typescript',
  python: 'python',
  py: 'python',
  rust: 'rust',
  rs: 'rust',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  terraform: 'hcl',
  hcl: 'hcl',
  tf: 'hcl',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  toml: 'toml',
  ini: 'ini',
  cfg: 'ini',
  conf: 'ini',
  markdown: 'markdown',
  md: 'markdown',
  java: 'java',
  dockerfile: 'docker',
  docker: 'docker',
  makefile: 'makefile',
  make: 'makefile',
  properties: 'properties',
  dotenv: 'properties',
  xml: 'markup',
  html: 'markup',
  svg: 'markup',
  css: 'css',
  scala: 'scala',
  gitignore: 'git',
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), 'target', 'rel'],
    div: [...(defaultSchema.attributes?.div ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
    input: [...(defaultSchema.attributes?.input ?? []), ['checked', true]],
    // `language-*` is allowed by default, but math and plain-text blocks need
    // their classes to survive until the renderer sees them.
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ['className', /^language-./, 'math-inline', 'math-display'],
    ],
  },
  tagNames: [...(defaultSchema.tagNames ?? []), 'cite', 'figure', 'figcaption'],
}

interface HastNode {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function hastText(node: HastNode): string {
  if (node.type === 'text') return node.value ?? ''
  if (Array.isArray(node.children)) return node.children.map(hastText).join('')
  return ''
}

function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Adds stable, unique ids to headings so the table of contents can link. */
function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const seen = new Map<string, number>()

    const walk = (node: HastNode) => {
      if (
        node.type === 'element' &&
        (node.tagName === 'h2' ||
          node.tagName === 'h3' ||
          node.tagName === 'h4')
      ) {
        const base = slugifyHeading(hastText(node)) || 'section'
        const count = (seen.get(base) ?? 0) + 1
        seen.set(base, count)
        node.properties = {
          ...node.properties,
          id: count === 1 ? base : `${base}-${count}`,
        }
      }

      if (Array.isArray(node.children)) node.children.forEach(walk)
    }

    walk(tree)
  }
}

/**
 * Gives every fenced code block a language. This is the reliable way to tell a
 * fence without an info string from inline code: the Markdown AST already
 * knows which is which, but both arrive at the `code` component as `<code>`.
 */
function remarkDefaultCodeLanguage() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (node.type === 'code' && !node.lang) node.lang = 'plaintext'
      if (Array.isArray(node.children)) node.children.forEach(walk)
    }
    walk(tree)
  }
}

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = textToCopy
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text', error)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded border border-gray-300 bg-white/80 px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
      aria-label="Copy code"
      title="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function CodeBlock({
  code,
  language,
}: {
  code: string
  language: string
}) {
  const isPlain = language === 'text'

  return (
    <div className="not-prose my-6 w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
        <span className="truncate font-mono text-xs lowercase text-gray-500 dark:text-slate-400">
          {isPlain ? 'text' : language}
        </span>
        <CopyButton textToCopy={code} />
      </div>

      {isPlain ? (
        <pre className="overflow-x-auto bg-[#1e1e1e] p-4 text-sm leading-relaxed text-gray-100">
          <code className="whitespace-pre font-mono">{code}</code>
        </pre>
      ) : (
        <div className="overflow-x-auto">
          <SyntaxHighlighterWrapper
            language={language}
            PreTag="div"
            className="!my-0 !rounded-none"
          >
            {code}
          </SyntaxHighlighterWrapper>
        </div>
      )}
    </div>
  )
}

function MathBlock({ tex }: { tex: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const renderMath = async () => {
      try {
        const katex = await import('katex')
        if (!mounted || !containerRef.current) return

        containerRef.current.innerHTML = katex.default.renderToString(tex, {
          displayMode: true,
          throwOnError: false,
        })
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render math')
        }
      }
    }

    renderMath()
    return () => {
      mounted = false
    }
  }, [tex])

  if (error) {
    return (
      <div className="my-6 overflow-x-auto rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
        Math rendering error: {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto text-center"
      aria-label="Mathematical expression"
    />
  )
}

// ─── Callout preprocessor ─────────────────────────────────────────────────────

const ALERT_META: Record<string, { cls: string; icon: string; label: string }> = {
  NOTE: { cls: 'callout-note', icon: 'ℹ️', label: 'Note' },
  INFO: { cls: 'callout-note', icon: 'ℹ️', label: 'Info' },
  WARNING: { cls: 'callout-warning', icon: '⚠️', label: 'Warning' },
  DANGER: { cls: 'callout-danger', icon: '🚨', label: 'Danger' },
  ERROR: { cls: 'callout-danger', icon: '🚨', label: 'Error' },
  SUCCESS: { cls: 'callout-success', icon: '✅', label: 'Success' },
  TIP: { cls: 'callout-tip', icon: '💡', label: 'Tip' },
  IMPORTANT: { cls: 'callout-important', icon: '📌', label: 'Important' },
}

const ALERT_TYPES =
  'NOTE|INFO|WARNING|DANGER|ERROR|SUCCESS|TIP|IMPORTANT'

function toCalloutHtml(type: string, title: string, body: string): string {
  const meta = ALERT_META[type.toUpperCase()]
  if (!meta) return ''

  const label = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

  return (
    `<div class="callout ${meta.cls}">\n` +
    `<div class="callout-header"><span class="callout-icon">${meta.icon}</span><span class="callout-label">${
      label || meta.label
    }</span></div>\n` +
    `<div class="callout-body">\n\n${body}\n\n</div>\n` +
    `</div>\n`
  )
}

function applyAlerts(markdown: string): string {
  let result = markdown

  // Blockquote form:
  //   > [!WARNING]
  //   > Body line
  result = result.replace(
    new RegExp(
      `^> \\[!(${ALERT_TYPES})\\][ \\t]*\\n((?:[ \\t]*>[ \\t]?[^\\n]*\\n?)*)`,
      'gim'
    ),
    (_match: string, type: string, rest: string) => {
      const body = rest
        .split('\n')
        .map((line: string) => line.replace(/^[ \t]*>[ \t]?/, ''))
        .filter((line: string) => line.trim() !== '')
        .join('\n')

      return toCalloutHtml(type, '', body)
    }
  )

  // Plain form:
  //   [!NOTE] Optional title
  //   Body
  result = result.replace(
    new RegExp(
      `^\\[!(${ALERT_TYPES})\\]([^\\n]*)\\n([\\s\\S]*?)(?=\\n\\n|\\n\\[!|(?![\\s\\S]))`,
      'gm'
    ),
    (_match: string, type: string, titleLine: string, rest: string) => {
      return toCalloutHtml(type, titleLine.trim(), rest.trim())
    }
  )

  return result
}

/**
 * Applies a Markdown transform only outside fenced code blocks, so examples
 * that show callout syntax are not rewritten into real callouts.
 */
function transformOutsideFences(
  markdown: string,
  transform: (chunk: string) => string
): string {
  const lines = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  const output: string[] = []
  let buffer: string[] = []
  let fenceChar: string | null = null

  const flush = () => {
    if (!buffer.length) return
    output.push(transform(buffer.join('\n')))
    buffer = []
  }

  for (const line of lines) {
    const fence = /^\s*(`{3,}|~{3,})/.exec(line)

    if (fence) {
      flush()
      if (!fenceChar) {
        fenceChar = fence[1][0]
      } else if (line.trim().startsWith(fenceChar.repeat(3))) {
        fenceChar = null
      }
      output.push(line)
      continue
    }

    if (fenceChar) {
      output.push(line)
      continue
    }

    buffer.push(line)
  }

  flush()
  return output.join('\n')
}

function preprocessAlerts(markdown: string): string {
  return transformOutsideFences(markdown, applyAlerts)
}

/** Drops a leading `# Heading` that repeats the title the page already shows. */
function stripDuplicateTitle(markdown: string, pageTitle?: string): string {
  if (!pageTitle) return markdown

  const match = /^\s*#\s+(.+?)\s*(?:\n|$)/.exec(markdown)
  if (!match) return markdown

  const normalise = (value: string) =>
    value.replace(/\s+/g, ' ').trim().toLowerCase()

  if (normalise(match[1]) !== normalise(pageTitle)) return markdown

  return markdown.slice(match[0].length).replace(/^\s*\n/, '')
}

export default function MarkdownRenderer({
  content,
  pageTitle,
}: MarkdownRendererProps) {
  const processedContent = preprocessAlerts(
    stripDuplicateTitle(content, pageTitle)
  )

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath, remarkDefaultCodeLanguage]}
      rehypePlugins={[
        rehypeRaw,
        [rehypeSanitize, sanitizeSchema],
        rehypeHeadingIds,
        rehypeKatex,
      ]}
      components={{
        h1: ({ children, id }) => (
          <h1
            id={id}
            className="mb-6 mt-8 scroll-mt-24 text-4xl font-bold text-gray-900 dark:text-white"
          >
            {children}
          </h1>
        ),
        h2: ({ children, id }) => (
          <h2
            id={id}
            className="mb-4 mt-10 scroll-mt-24 border-b border-gray-200 pb-2 text-3xl font-bold text-gray-900 dark:border-slate-800 dark:text-white"
          >
            {children}
          </h2>
        ),
        h3: ({ children, id }) => (
          <h3
            id={id}
            className="mb-3 mt-8 scroll-mt-24 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {children}
          </h3>
        ),
        h4: ({ children, id }) => (
          <h4
            id={id}
            className="mb-2 mt-6 scroll-mt-24 text-xl font-semibold text-gray-900 dark:text-white"
          >
            {children}
          </h4>
        ),

        p: ({ children }) => (
          <p className="mb-4 leading-7 text-gray-700 dark:text-slate-300">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-slate-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6 text-gray-700 dark:text-slate-300">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-7 text-gray-700 dark:text-slate-300">
            {children}
          </li>
        ),

        pre: ({ children }) => (
          <div className="not-prose my-0 w-full min-w-0">{children}</div>
        ),

        code: ({ className, children }) => {
          const match = /language-([a-z0-9_+-]+)/i.exec(className || '')
          const langRaw = match ? match[1].toLowerCase() : null

          if (!langRaw) {
            return (
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800 break-words dark:bg-slate-800 dark:text-slate-200">
                {children}
              </code>
            )
          }

          const language = langMap[langRaw] ?? langRaw
          const codeString = String(children).replace(/\n$/, '')

          if (language === 'mermaid') {
            return <MermaidDiagram code={codeString} />
          }

          if (language === 'math') {
            return <MathBlock tex={codeString} />
          }

          const resolvedLanguage =
            language === 'text' || !supportedLanguages.has(language)
              ? 'text'
              : language

          return <CodeBlock code={codeString} language={resolvedLanguage} />
        },

        blockquote: ({ children }) => (
          <blockquote className="my-5 border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-slate-400">
            {children}
          </blockquote>
        ),

        a: ({ href, children }) => {
          const url = typeof href === 'string' ? href : ''
          const external = /^https?:\/\//i.test(url)

          return (
            <a
              href={url}
              className="font-medium text-indigo-600 underline decoration-indigo-500/30 underline-offset-2 transition-colors hover:text-indigo-500 break-words dark:text-indigo-400 dark:hover:text-indigo-300"
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          )
        },

        table: ({ children }) => (
          <div
            className="blog-table-scroll my-6 overflow-x-auto overscroll-contain rounded-xl border border-gray-200 dark:border-slate-800"
            role="region"
            aria-label="Table: scroll inside this box to see all rows and columns"
            tabIndex={0}
          >
            <table className="w-max min-w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50 dark:bg-slate-900">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-gray-900 dark:border-slate-800 dark:text-white">
            <div className="blog-cell">{children}</div>
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-gray-100 px-4 py-2.5 text-gray-600 dark:border-slate-800 dark:text-slate-300">
            <div className="blog-cell">{children}</div>
          </td>
        ),

        hr: () => <hr className="my-8 border-gray-200 dark:border-slate-800" />,

        img: ({ src, alt, title }) => (
          <BlogImage
            src={typeof src === 'string' ? src : ''}
            alt={alt ?? ''}
            caption={title}
          />
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-white">
            {children}
          </strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,

        input: ({ checked, ...props }) => (
          <input
            {...props}
            type="checkbox"
            checked={checked ?? false}
            readOnly
            className="mr-2 h-4 w-4 rounded border-gray-300 align-middle accent-indigo-600"
          />
        ),
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}
