import { getAllPostsWithContent } from '@/lib/posts'

export const dynamic = 'force-static'

const SITE_URL = 'https://leandroalveso.github.io'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime())
    ? new Date(0).toUTCString()
    : parsed.toUTCString()
}

export async function GET() {
  const posts = getAllPostsWithContent()
  const lastBuildDate = posts[0]
    ? toRfc822(posts[0].frontmatter.date)
    : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`
      const categories = post.frontmatter.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n')

      return [
        '    <item>',
        `      <title>${escapeXml(post.frontmatter.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${toRfc822(post.frontmatter.date)}</pubDate>`,
        `      <description>${escapeXml(post.frontmatter.description)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leandro Alves — Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Thoughts on data engineering, machine learning, AI agents, and cloud architecture.</description>
    <language>en-AU</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
