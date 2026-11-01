import type { PostMeta } from './posts'

/** Normalise text for accent-insensitive, case-insensitive matching. */
export function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function tokenize(query: string): string[] {
  return fold(query).split(' ').filter(Boolean)
}

function wordScore(
  words: string[],
  token: string,
  exact: number,
  prefix: number,
  partial: number
): number {
  if (words.includes(token)) return exact
  if (words.some((word) => word.startsWith(token))) return prefix
  if (words.some((word) => word.includes(token))) return partial
  return 0
}

function scorePost(post: PostMeta, tokens: string[]): number {
  const title = fold(post.frontmatter.title)
  const description = fold(post.frontmatter.description)
  const tags = post.frontmatter.tags.map(fold)

  const titleWords = title.split(' ')
  const descriptionWords = description.split(' ')

  let score = 0

  for (const token of tokens) {
    const best = Math.max(
      wordScore(titleWords, token, 80, 60, 40),
      wordScore(descriptionWords, token, 25, 20, 15),
      tags.includes(token) ? 35 : tags.some((tag) => tag.includes(token)) ? 20 : 0
    )

    if (best === 0) return 0
    score += best
  }

  return score
}

/**
 * Rank posts by title, description and tags. The full body deliberately stays
 * on the server: shipping every article to the browser made the blog index
 * grow linearly with the archive.
 */
export function searchPosts(posts: PostMeta[], query: string): PostMeta[] {
  const tokens = tokenize(query)
  if (tokens.length === 0) return posts

  return posts
    .map((post) => ({ post, score: scorePost(post, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (a.post.frontmatter.title.length !== b.post.frontmatter.title.length) {
        return a.post.frontmatter.title.length - b.post.frontmatter.title.length
      }
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      )
    })
    .map((entry) => entry.post)
}
