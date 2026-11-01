'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, ListTree } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function BlogToc({ className = '' }: { className?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const root = document.querySelector('[data-blog-content]')
    if (!root) return

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>('h2[id], h3[id], h4[id]')
    )

    setHeadings(
      elements.map((element) => ({
        id: element.id,
        text: element.textContent || element.id,
        level: element.tagName === 'H4' ? 4 : element.tagName === 'H3' ? 3 : 2,
      }))
    )
    setActiveId('')
  }, [pathname])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || headings.length === 0) {
      return
    }

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }

        const first = headings.find((heading) => visible.has(heading.id))
        if (first) setActiveId(first.id)
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
    )

    for (const heading of headings) {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  const closeMobile = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest('details')?.removeAttribute('open')
  }

  const links = (
    <nav aria-label="On this page" className="space-y-0.5">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          onClick={closeMobile}
          className={`block rounded-md py-1.5 pr-2 text-sm leading-snug transition-colors break-words ${
            heading.level === 4
              ? 'pl-9'
              : heading.level === 3
                ? 'pl-6'
                : 'pl-3'
          } ${
            activeId === heading.id
              ? 'border-l-2 border-indigo-500 bg-indigo-50 pl-[calc(0.75rem-2px)] font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )

  return (
    <div className={className}>
      <details className="group mb-8 rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-gray-900 dark:text-white">
          <span className="inline-flex items-center gap-2">
            <ListTree className="h-4 w-4 text-indigo-500" aria-hidden="true" />
            On this page
          </span>
          <ChevronDown
            className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-3">{links}</div>
      </details>

      {/* Sticky on the aside itself: its containing block is the grid item
          (stretched to the full article height), so it follows the reader down
          the whole post and releases at the end. Sticky on a child of the aside
          would have zero travel — the aside is only as tall as its content.
          The max-height keeps long TOCs scrollable while stuck. */}
      <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain lg:block">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
          <ListTree className="h-3.5 w-3.5" aria-hidden="true" />
          On this page
        </p>
        {links}
      </aside>
    </div>
  )
}
