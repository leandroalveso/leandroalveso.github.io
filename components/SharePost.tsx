'use client'

import { useState } from 'react'
import { Check, Link2, Linkedin, Twitter } from 'lucide-react'

interface SharePostProps {
  title: string
  url: string
}

export default function SharePost({ title, url }: SharePostProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy link', error)
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const buttonClass =
    'inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300'

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6 dark:border-slate-800">
      <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
        Share this post
      </span>

      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? (
          <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy link'}
      </button>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
        LinkedIn
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <Twitter className="h-4 w-4" aria-hidden="true" />
        X
      </a>
    </div>
  )
}
