import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: `${post.frontmatter.title} | Leandro Alves`,
      description: post.frontmatter.description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050810]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h1>
          <Link
            href="/blog"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500">
            <Calendar className="w-4 h-4" />
            {new Date(post.frontmatter.date).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
            <MarkdownRenderer content={post.content} />
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
