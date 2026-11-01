'use client'

import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Search, SearchX, X } from 'lucide-react'
import BlogCard from './BlogCard'
import type { PostMeta } from '@/lib/posts'
import { searchPosts } from '@/lib/blog-search'

export default function SearchBar({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [tagReady, setTagReady] = useState(false)

  const deferredQuery = useDeferredValue(query)

  const allTags = useMemo(
    () =>
      Array.from(
        new Set(posts.flatMap((post) => post.frontmatter.tags))
      ).sort((a, b) => a.localeCompare(b)),
    [posts]
  )

  // A tag can be shared as /blog/?tag=LangGraph.
  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get('tag')
    if (tag && allTags.includes(tag)) setActiveTag(tag)
    setTagReady(true)
  }, [allTags])

  useEffect(() => {
    if (!tagReady) return

    const params = new URLSearchParams(window.location.search)
    if (activeTag) params.set('tag', activeTag)
    else params.delete('tag')

    const search = params.toString()
    const nextUrl = `${window.location.pathname}${search ? `?${search}` : ''}`
    window.history.replaceState(null, '', nextUrl)
  }, [activeTag, tagReady])

  const filteredPosts = useMemo(() => {
    const byTag = activeTag
      ? posts.filter((post) => post.frontmatter.tags.includes(activeTag))
      : posts

    return searchPosts(byTag, deferredQuery)
  }, [posts, activeTag, deferredQuery])

  const hasFilters = Boolean(query.trim() || activeTag)

  const clearFilters = () => {
    setQuery('')
    setActiveTag(null)
  }

  return (
    <div>
      <div className="mx-auto mb-5 max-w-xl" role="search">
        <label htmlFor="blog-search" className="sr-only">
          Search posts
        </label>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-slate-500"
            aria-hidden="true"
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts by title, description, or tag..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-10 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {allTags.length > 0 && (
        <div
          className="mx-auto mb-8 flex max-w-4xl flex-wrap items-center justify-center gap-2"
          aria-label="Filter posts by tag"
        >
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={!activeTag}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              !activeTag
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300'
            }`}
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'border-indigo-500 bg-indigo-600 text-white'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:text-indigo-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <p
        className="mb-6 text-center text-sm text-gray-500 dark:text-slate-400"
        aria-live="polite"
      >
        {hasFilters
          ? `${filteredPosts.length} ${
              filteredPosts.length === 1 ? 'result' : 'results'
            } of ${posts.length}`
          : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
      </p>

      {filteredPosts.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-slate-700/60 dark:bg-slate-900/50">
          <SearchX
            className="mx-auto mb-4 h-10 w-10 text-gray-300 dark:text-slate-600"
            aria-hidden="true"
          />
          <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            No posts match
          </h2>
          <p className="mb-5 text-sm text-gray-500 dark:text-slate-400">
            Try a different search term, or clear the filters to see every post.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
