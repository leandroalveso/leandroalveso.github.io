'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import SyntaxHighlighterWrapper from './FixWrapper'

const MermaidDiagram = dynamic(() => import('./MermaidDiagram'), { ssr: false })

interface MarkdownRendererProps {
  content: string
}

const langMap: Record<string, string> = {
  diagram: 'diagram',
  mermaid: 'mermaid',
  sql: 'sql',
  psql: 'sql',
  postgresql: 'sql',
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  py: 'python',
  rust: 'rust',
  rs: 'rust',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  terraform: 'terraform',
  hcl: 'terraform',
  tf: 'terraform',
}

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Failed to copy text', e)
    }
  }

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
      aria-label="Copy code"
      type="button"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

const ALERT_META: Record<string, { cls: string; icon: string; label: string }> = {
  NOTE:      { cls: 'callout-note',      icon: 'ℹ️',  label: 'Note' },
  INFO:      { cls: 'callout-note',      icon: 'ℹ️',  label: 'Info' },
  WARNING:   { cls: 'callout-warning',   icon: '⚠️',  label: 'Warning' },
  DANGER:    { cls: 'callout-danger',    icon: '🚨',  label: 'Danger' },
  ERROR:     { cls: 'callout-danger',    icon: '🚨',  label: 'Error' },
  SUCCESS:   { cls: 'callout-success',   icon: '✅',  label: 'Success' },
  TIP:       { cls: 'callout-tip',       icon: '💡',  label: 'Tip' },
  IMPORTANT: { cls: 'callout-important', icon: '📌',  label: 'Important' },
}

function toCalloutHtml(type: string, title: string, body: string): string {
  const meta = ALERT_META[type.toUpperCase()]
  if (!meta) return ''
  const label = title || meta.label
  return (
    `<div class="callout ${meta.cls}">\n` +
    `<div class="callout-header"><span class="callout-icon">${meta.icon}</span><span class="callout-label">${label}</span></div>\n` +
    `<div class="callout-body">\n\n${body}\n\n</div>\n` +
    `</div>\n`
  )
}

function preprocessAlerts(md: string): string {
  let result = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  result = result.replace(
    /^> \[!(NOTE|INFO|WARNING|DANGER|ERROR|SUCCESS|TIP|IMPORTANT)\][ \t]*\n((?:[ \t]*>[ \t]?[^\n]*\n?)*)/gim,
    (match: string, type: string, rest: string) => {
      const body = rest
        .split('\n')
        .map((line: string) => line.replace(/^[ \t]*>[ \t]?/, ''))
        .filter((line: string) => line.trim() !== '')
        .join('\n')

      return toCalloutHtml(type, '', body)
    }
  )

  result = result.replace(
    /^\[!(NOTE|INFO|WARNING|DANGER|ERROR|SUCCESS|TIP|IMPORTANT)\]([^\n]*)\n([\s\S]*?)(?=\n\n|\n\[!|(?![\s\S]))/gm,
    (match: string, type: string, titleLine: string, rest: string) => {
      const body = rest.trim()
      return toCalloutHtml(type, titleLine.trim(), body)
    }
  )

  return result
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = preprocessAlerts(content)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 mt-8 text-foreground">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 mt-6 text-foreground border-b pb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-semibold mb-3 mt-5 text-foreground">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-semibold mb-2 mt-4 text-foreground">{children}</h4>,

        p: ({ children }) => <p className="mb-4 leading-7 text-foreground/90">{children}</p>,

        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>,
        li: ({ children }) => <li className="leading-7 text-foreground/90">{children}</li>,

        pre: ({ children }) => <div className="not-prose overflow-visible">{children}</div>,

        code: ({ node, className, children, ...props }) => {
          const match = /language-([a-z0-9_+-]+)/i.exec(className || '')
          const langRaw = match ? match[1].toLowerCase() : null
          const language = langRaw ? (langMap[langRaw] ?? langRaw) : null

          if (language) {
            const codeString = String(children).replace(/\n$/, '')

            if (language === 'mermaid') {
              return <MermaidDiagram code={codeString} />
            }

            return (
              <div className="relative my-6 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 font-mono flex justify-between items-center">
                  <span>{language}</span>
                  <CopyButton textToCopy={codeString} />
                </div>
                <SyntaxHighlighterWrapper language={language} PreTag="div" className="!my-0 !rounded-none">
                  {codeString}
                </SyntaxHighlighterWrapper>
              </div>
            )
          }

          return (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
              {children}
            </code>
          )
        },

        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),

        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary hover:underline font-medium"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),

        table: ({ children }) => (
          <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-slate-800">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-gray-50 dark:bg-slate-900">{children}</thead>,
        th: ({ children }) => <th className="font-semibold text-left px-4 py-3 text-gray-700 dark:text-slate-300">{children}</th>,
        td: ({ children }) => <td className="px-4 py-3 border-t border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400">{children}</td>,

        hr: () => <hr className="my-8 border-border" />,

        img: ({ src, alt }) => (
          <div className="my-6">
            <img src={src} alt={alt || ''} className="rounded-lg max-w-full h-auto shadow-lg" />
            {alt && <p className="text-center text-sm text-muted-foreground mt-2">{alt}</p>}
          </div>
        ),

        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}
