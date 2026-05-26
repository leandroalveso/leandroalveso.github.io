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
}

export type Post = PostMeta & {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug,
        frontmatter: data as PostFrontmatter,
      }
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    }
  } catch {
    return null
  }
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.filter((fn) => fn.endsWith('.md')).map((fn) => fn.replace(/\.md$/, ''))
}
