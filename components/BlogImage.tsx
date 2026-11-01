'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ZoomIn } from 'lucide-react'

interface BlogImageProps {
  src: string
  alt?: string
  caption?: string
}

/**
 * An image in blog content. Rendered with phrasing elements (span/button) so it
 * stays valid when Markdown wraps it in a paragraph, then opens a lightbox via
 * a portal so the dialog escapes the prose column.
 */
export default function BlogImage({ src, alt = '', caption }: BlogImageProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previous
    }
  }, [open, close])

  const label = caption || alt

  return (
    <>
      <span className="my-6 block" role="figure" aria-label={label || 'Image'}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          aria-label={alt ? `Enlarge image: ${alt}` : 'Enlarge image'}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="mx-auto max-h-[32rem] w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
          />
          <span className="flex items-center justify-center gap-1.5 border-t border-gray-200 py-1.5 text-xs text-gray-500 dark:border-slate-700 dark:text-slate-400">
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
            Click to enlarge
          </span>
        </button>
        {label && (
          <span className="mt-2 block text-center text-sm text-gray-500 dark:text-slate-400">
            {label}
          </span>
        )}
      </span>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt || 'Image'}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close image"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[88vh] max-w-full rounded-lg object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </>
  )
}
