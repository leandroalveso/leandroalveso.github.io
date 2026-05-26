'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import type { PostFrontmatter } from '@/lib/posts'

export default function BlogCard({
  slug,
  frontmatter,
  index,
}: {
  slug: string
  frontmatter: PostFrontmatter
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${slug}`}
        className="group block h-full"
      >
        <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-300">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {frontmatter.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
            {frontmatter.description}
          </p>

          {/* Date + Read More */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(frontmatter.date).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Read more <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
