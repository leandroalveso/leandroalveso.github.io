'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface FocusableScrollersProps {
  selector?: string
}

/**
 * Makes horizontally scrollable regions keyboard-operable. Wide tables, code
 * blocks and Mermaid diagrams can be scrolled with a pointer; without a tab
 * stop a keyboard user cannot reach them.
 */
export default function FocusableScrollers({
  selector = '[data-blog-content]',
}: FocusableScrollersProps) {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.querySelector(selector)
    if (!root) return

    const candidates = root.querySelectorAll<HTMLElement>(
      '.katex-display, .mermaid-scroll-container, .blog-table-scroll, pre, .prismjs'
    )

    const apply = () => {
      for (const element of Array.from(candidates)) {
        const overflows = element.scrollWidth > element.clientWidth + 1

        if (overflows && !element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '0')
          element.setAttribute('role', 'region')
          element.setAttribute('aria-label', 'Scrollable content')
          element.dataset.focusAuto = 'true'
        } else if (!overflows && element.dataset.focusAuto === 'true') {
          element.removeAttribute('tabindex')
          element.removeAttribute('role')
          element.removeAttribute('aria-label')
          delete element.dataset.focusAuto
        }
      }
    }

    apply()

    const observer = new ResizeObserver(apply)
    observer.observe(root)
    return () => observer.disconnect()
  }, [selector, pathname])

  return null
}
