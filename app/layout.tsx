import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

// Self-hosted fonts (no runtime requests to fonts.googleapis.com).
// DM Sans: variable weight 100–1000 incl. true italics (used by blog prose <em>).
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: 'variable',
  style: ['normal', 'italic'],
})

// Syne: variable weight 400–800 (the family's axis max — `font-black` clamps to 800).
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: 'variable',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://leandroalveso.github.io'),
  title: {
    default: 'Leandro Alves | Data & Machine Learning Engineer',
    template: '%s | Leandro Alves',
  },
  description:
    'Data, Analytics, ML & Software Engineer with 9+ years of experience. Specialising in cloud-native architectures (AWS · Azure · GCP), lakehouse platforms, and AI/ML systems. Based in Sydney, Australia.',
  keywords: [
    'Data Engineer',
    'Machine Learning Engineer',
    'Software Engineer',
    'Cloud Architect',
    'AWS',
    'Azure',
    'GCP',
    'Databricks',
    'Apache Spark',
    'dbt',
    'Terraform',
    'Python',
    'TypeScript',
    'Data Analytics',
    'Cloud Computing',
    'Leandro Alves',
    'Brazil',
    'Australia',
    'Sydney',
    'Nuniversity',
    'DNX Solutions',
  ],
  authors: [{ name: 'Leandro Alves', url: 'https://leandroalveso.github.io' }],
  creator: 'Leandro Alves',
  publisher: 'Leandro Alves',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://leandroalveso.github.io',
    title: 'Leandro Alves | Data & Machine Learning Engineer',
    description:
      'Data, Analytics, ML & Software Engineer with 9+ years of experience building cloud-native data platforms.',
    siteName: 'Leandro Alves Portfolio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Leandro Alves' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leandro Alves | Data & Machine Learning Engineer',
    description:
      'Data, Analytics, ML & Software Engineer, Sydney, Australia',
    images: ['/twitter-image.jpg'],
  },
  alternates: { canonical: 'https://leandroalveso.github.io' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Leandro Alves — Blog"
          href="/feed.xml"
        />
        <meta name="theme-color" content="#050810" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Leandro Alves',
              jobTitle: 'Data & Machine Learning Engineer',
              description:
                'Data, Analytics, ML & Software Engineer with 9+ years of experience building cloud-native data platforms.',
              url: 'https://leandroalveso.github.io',
              sameAs: [
                'https://www.linkedin.com/in/leandroalveso',
                'https://github.com/leandroalveso',
                'https://nuniversity.pages.dev/en',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sydney',
                addressRegion: 'NSW',
                addressCountry: 'Australia',
              },
              email: 'engleandroalveso@gmail.com',
            }),
          }}
        />
      </head>
      <body className={dmSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}