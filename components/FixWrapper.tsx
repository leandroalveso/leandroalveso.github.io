'use client'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter'

import './prism-token-colors.css'

// The default Prism entry point bundles every one of refractor's grammars
// (~1.2 MB) into the client chunk. `PrismLight` starts from the core and pulls
// in only the languages the blog actually uses.
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker'
import git from 'react-syntax-highlighter/dist/esm/languages/prism/git'
import hcl from 'react-syntax-highlighter/dist/esm/languages/prism/hcl'
import ini from 'react-syntax-highlighter/dist/esm/languages/prism/ini'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import makefile from 'react-syntax-highlighter/dist/esm/languages/prism/makefile'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import properties from 'react-syntax-highlighter/dist/esm/languages/prism/properties'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust'
import scala from 'react-syntax-highlighter/dist/esm/languages/prism/scala'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import toml from 'react-syntax-highlighter/dist/esm/languages/prism/toml'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'

const LANGUAGES: Record<string, unknown> = {
  bash,
  css,
  docker,
  git,
  hcl,
  ini,
  java,
  javascript,
  json,
  makefile,
  markdown,
  markup,
  properties,
  python,
  rust,
  scala,
  sql,
  toml,
  typescript,
  yaml,
}

for (const [name, grammar] of Object.entries(LANGUAGES)) {
  SyntaxHighlighter.registerLanguage(name, grammar as never)
}

/** Languages registered with PrismLight — anything else falls back to plain text. */
export const supportedLanguages = new Set(Object.keys(LANGUAGES))

export default function SyntaxHighlighterWrapper(props: SyntaxHighlighterProps) {
  return (
    <SyntaxHighlighter
      {...props}
      style={vscDarkPlus as never}
      useInlineStyles={false}
    />
  )
}
