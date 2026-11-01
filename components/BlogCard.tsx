'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import type { PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export default function BlogCard({
  post,
  index,
}: {
  post: PostMeta
  index: number
}) {
  const { slug, frontmatter, readingMinutes } = post

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="h-full"
    >
      <Link href={`/blog/${slug}/`} className="group block h-full">
        <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-indigo-500/50 dark:hover:shadow-indigo-500/10">
          <div className="mb-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {frontmatter.title}
          </h2>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-slate-400">
            {frontmatter.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 dark:text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={frontmatter.date}>
                  {formatDate(frontmatter.date)}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {readingMinutes} min read
              </span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 dark:text-indigo-400">
              Read more <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
