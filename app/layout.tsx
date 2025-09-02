import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  // Add metadataBase to fix the warning
  metadataBase: new URL('https://leandroalveso.github.io'),
  title: {
    default: 'Leandro Alves - Data & Machine Learning Engineer',
    template: '%s | Leandro Alves'
  },
  description: 'Experienced Data/Machine Learning/Software Engineer specializing in cloud-based data platforms, AWS, Azure, GCP. Transforming data into valuable assets and actionable insights.',
  keywords: [
    'Data Engineer',
    'Machine Learning Engineer',
    'Software Engineer',
    'AWS',
    'Azure',
    'GCP',
    'Python',
    'TypeScript',
    'Data Analytics',
    'Cloud Computing',
    'Leandro Alves',
    'Brazil',
    'Australia',
    'Sydney'
  ],
  authors: [{ name: 'Leandro Alves', url: 'https://leandroalveso.github.io' }],
  creator: 'Leandro Alves',
  publisher: 'Leandro Alves',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leandroalveso.github.io',
    title: 'Leandro Alves - Data & Machine Learning Engineer',
    description: 'Experienced Data/Machine Learning/Software Engineer specializing in cloud-based data platforms',
    siteName: 'Leandro Alves Portfolio',
    images: [
      {
        url: '/og-image.jpg', // This will now resolve correctly with metadataBase
        width: 1200,
        height: 630,
        alt: 'Leandro Alves - Data & Machine Learning Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leandro Alves - Data & Machine Learning Engineer',
    description: 'Experienced Data/Machine Learning/Software Engineer specializing in cloud-based data platforms',
    images: ['/twitter-image.jpg'], // This will now resolve correctly with metadataBase
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://leandroalveso.github.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Leandro Alves",
              "jobTitle": "Data & Machine Learning Engineer",
              "description": "Experienced Data/Machine Learning/Software Engineer specializing in cloud-based data platforms",
              "url": "https://leandroalveso.github.io",
              "sameAs": [
                "https://www.linkedin.com/in/leandroalveso",
                "https://github.com/leandroalveso"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sydney",
                "addressRegion": "NSW",
                "addressCountry": "Australia"
              },
              "email": "engleandroalveso@gmail.com",
              "telephone": "+61 0433 514 560"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
