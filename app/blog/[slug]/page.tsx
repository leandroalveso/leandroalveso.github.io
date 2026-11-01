import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
} from 'lucide-react'
import {
  getAllSlugs,
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import BlogToc from '@/components/BlogToc'
import BlogScrollProgress from '@/components/BlogScrollProgress'
import BlogErrorBoundary from '@/components/BlogErrorBoundary'
import FocusableScrollers from '@/components/FocusableScrollers'
import SharePost from '@/components/SharePost'

const SITE_URL = 'https://leandroalveso.github.io'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const postUrl = `${SITE_URL}/blog/${post.slug}/`

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      authors: ['Leandro Alves'],
      tags: post.frontmatter.tags,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.frontmatter.title} | Leandro Alves`,
      description: post.frontmatter.description,
      images: ['/twitter-image.jpg'],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const { previous, next } = getAdjacentPosts(post.slug)
  const related = getRelatedPosts(post.slug, 2)
  const postUrl = `${SITE_URL}/blog/${post.slug}/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    url: postUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    author: {
      '@type': 'Person',
      name: 'Leandro Alves',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Leandro Alves',
      url: SITE_URL,
    },
    image: `${SITE_URL}/og-image.jpg`,
    keywords: post.frontmatter.tags.join(', '),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingMinutes}M`,
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.frontmatter.title,
        item: postUrl,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810]">
      <BlogScrollProgress />
      <FocusableScrollers selector="[data-blog-content]" />

      <section className="relative overflow-hidden pb-12 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="relative z-10 container mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <Link
              href="/blog/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to blog
            </Link>

            <div className="mb-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 transition-colors hover:border-indigo-400 hover:bg-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:border-indigo-400/60 dark:hover:bg-indigo-500/20"
                  aria-label={`Browse posts tagged ${tag}`}
                >
                  {tag}
                </Link>
              ))}
            </div>

            <h1
              className="mb-4 text-3xl font-black leading-tight text-gray-900 dark:text-white md:text-4xl"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              {post.frontmatter.title}
            </h1>

            {post.frontmatter.description && (
              <p className="mb-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-300">
                {post.frontmatter.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 dark:text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                Leandro Alves
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.frontmatter.date}>
                  {formatDate(post.frontmatter.date)}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
          {/* First in the DOM so it sits above the article on phones. */}
          <BlogToc className="lg:col-start-2 lg:row-start-1" />

          <div className="min-w-0 max-w-3xl lg:col-start-1 lg:row-start-1">
            <article data-blog-content className="blog-prose">
              <BlogErrorBoundary>
                <MarkdownRenderer
                  content={post.content}
                  pageTitle={post.frontmatter.title}
                />
              </BlogErrorBoundary>
            </article>

            <SharePost title={post.frontmatter.title} url={postUrl} />

            <nav aria-label="More posts" className="mt-10 grid gap-4 sm:grid-cols-2">
              {previous && (
                <Link
                  href={`/blog/${previous.slug}/`}
                  className="group rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-indigo-500/50"
                >
                  <span className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                    Newer post
                  </span>
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {previous.frontmatter.title}
                  </span>
                </Link>
              )}

              {next && (
                <Link
                  href={`/blog/${next.slug}/`}
                  className="group rounded-xl border border-gray-200 bg-white p-4 text-right transition-colors hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-indigo-500/50"
                >
                  <span className="mb-1 flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                    Older post
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {next.frontmatter.title}
                  </span>
                </Link>
              )}
            </nav>

            {related.length > 0 && (
              <section
                aria-labelledby="related-posts"
                className="mt-12 border-t border-gray-200 pt-8 dark:border-slate-800"
              >
                <h2
                  id="related-posts"
                  className="mb-4 text-lg font-bold text-gray-900 dark:text-white"
                >
                  Related posts
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {related.map((relatedPost) => (
                    <li key={relatedPost.slug}>
                      <Link
                        href={`/blog/${relatedPost.slug}/`}
                        className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900/50 dark:hover:border-indigo-500/50"
                      >
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                          {relatedPost.frontmatter.title}
                        </span>
                        <span className="mt-1 text-xs text-gray-400 dark:text-slate-500">
                          {relatedPost.readingMinutes} min read
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-slate-800">
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  )
}
