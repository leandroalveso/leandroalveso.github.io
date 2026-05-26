import { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts on data engineering, machine learning, AI agents, and cloud architecture.',
  openGraph: {
    title: 'Blog | Leandro Alves',
    description:
      'Thoughts on data engineering, machine learning, AI agents, and cloud architecture.',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810]">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="relative z-10 container mx-auto px-6">
          <h1
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Blog
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl">
            Thoughts on data engineering, machine learning, AI agents, and cloud architecture.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-slate-500 text-lg">No posts yet. Coming soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
