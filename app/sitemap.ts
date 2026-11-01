import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

const SITE_URL = 'https://leandroalveso.github.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestPostDate = posts[0]?.frontmatter.date

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: latestPostDate ? new Date(latestPostDate) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
