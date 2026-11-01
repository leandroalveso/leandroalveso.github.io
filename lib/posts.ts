import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostFrontmatter = {
  title: string
  date: string
  tags: string[]
  description: string
}

export type PostMeta = {
  slug: string
  frontmatter: PostFrontmatter
  /** Number of words in the body, excluding fenced/inline code. */
  wordCount: number
  /** Estimated reading time in minutes, at 200 words per minute. */
  readingMinutes: number
}

export type Post = PostMeta & {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/i

function normaliseTags(value: unknown): string[] {
  const raw = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : []

  return Array.from(
    new Set(
      raw
        .map((tag) => String(tag).trim())
        .filter(Boolean)
    )
  )
}

function normaliseDate(value: unknown, fileName: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  const date = typeof value === 'string' ? value.trim() : ''
  if (!date || Number.isNaN(Date.parse(date))) {
    throw new Error(
      `Post "${fileName}" is missing a valid "date" in its frontmatter.`
    )
  }

  return date
}

/**
 * Approximate word count for the reading-time estimate. Code is removed before
 * counting so a post full of snippets does not look like a 40-minute read.
 */
function countWords(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|=-]/g, ' ')

  return text.split(/\s+/).filter(Boolean).length
}

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (typeof data.title !== 'string' || !data.title.trim()) {
    throw new Error(`Post "${fileName}" is missing a "title" in its frontmatter.`)
  }

  const wordCount = countWords(content)

  return {
    slug,
    frontmatter: {
      title: data.title.trim(),
      date: normaliseDate(data.date, fileName),
      tags: normaliseTags(data.tags),
      description:
        typeof data.description === 'string' ? data.description.trim() : '',
    },
    wordCount,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    content,
  }
}

function readAllPosts(): Post[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(parsePost)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

function toMeta({ content: _content, ...meta }: Post): PostMeta {
  return meta
}

export function getAllPosts(): PostMeta[] {
  return readAllPosts().map(toMeta)
}

export function getAllPostsWithContent(): Post[] {
  return readAllPosts()
}

export function getPostBySlug(slug: string): Post | null {
  if (!SLUG_PATTERN.test(slug)) return null

  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  return parsePost(`${slug}.md`)
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getAllTags(): string[] {
  return Array.from(
    new Set(getAllPosts().flatMap((post) => post.frontmatter.tags))
  ).sort((a, b) => a.localeCompare(b))
}

/**
 * Posts are ordered newest first. "Previous" is therefore the newer post and
 * "next" is the older one, which is the order readers expect in a blog.
 */
export function getAdjacentPosts(slug: string): {
  previous: PostMeta | null
  next: PostMeta | null
} {
  const posts = getAllPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  if (index === -1) return { previous: null, next: null }

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }
}

/** Posts sharing the most tags with the current post. */
export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const posts = getAllPosts()
  const current = posts.find((post) => post.slug === slug)

  if (!current) return []

  const currentTags = new Set(current.frontmatter.tags)

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      shared: post.frontmatter.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        new Date(b.post.frontmatter.date).getTime() -
          new Date(a.post.frontmatter.date).getTime()
    )
    .slice(0, limit)
    .map((entry) => entry.post)
}
