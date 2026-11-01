import { Metadata } from 'next'
import SearchBar from '@/components/SearchBar'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts on data engineering, machine learning, AI agents, and cloud architecture.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Blog | Leandro Alves',
    description:
      'Thoughts on data engineering, machine learning, AI agents, and cloud architecture.',
    url: 'https://leandroalveso.github.io/blog/',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Leandro Alves Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Leandro Alves',
    description:
      'Thoughts on data engineering, machine learning, AI agents, and cloud architecture.',
    images: ['/twitter-image.jpg'],
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810]">
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="relative z-10 container mx-auto px-6">
          <h1
            className="mb-4 text-4xl font-black text-gray-900 dark:text-white md:text-5xl"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Blog
          </h1>
          <p className="max-w-2xl text-lg text-gray-500 dark:text-slate-400">
            Thoughts on data engineering, machine learning, AI agents, and cloud
            architecture.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <h2 className="sr-only">Latest posts</h2>
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-400 dark:text-slate-500">
              No posts yet. Coming soon.
            </p>
          </div>
        ) : (
          <SearchBar posts={posts} />
        )}
      </section>
    </div>
  )
}
