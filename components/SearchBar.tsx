'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import BlogCard from './BlogCard'
import type { PostWithContent } from '@/lib/posts'
import { debounce } from '@/lib/utils'

export default function SearchBar({ posts }: { posts: PostWithContent[] }) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const debouncedSetQuery = useMemo(() => debounce(setDebouncedQuery, 200), [])

  useEffect(() => {
    debouncedSetQuery(query)
  }, [query, debouncedSetQuery])

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return posts
    const q = debouncedQuery.toLowerCase()
    return posts.filter((post) => {
      const { title, description, tags } = post.frontmatter
      if (title.toLowerCase().includes(q)) return true
      if (description.toLowerCase().includes(q)) return true
      if (tags.some((t) => t.toLowerCase().includes(q))) return true
      if (post.content.toLowerCase().includes(q)) return true
      return false
    })
  }, [debouncedQuery, posts])

  return (
    <div>
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, tag, or content..."
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {query && (
        <p className="text-sm text-gray-500 dark:text-slate-400 text-center mb-6">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
          {results.length === 0 && '. Try a different search term'}
        </p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {results.map((post, index) => (
          <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} index={index} />
        ))}
      </div>
    </div>
  )
}
