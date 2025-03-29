import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://leandroalveso.github.io'), // Replace with your actual GitHub Pages URL
  title: {
    default: "Leandro Alves | Data/Cloud/Software Engineer",
    template: "%s | Leandro Alves"
  },
  description: "Personal website of Leandro Alves, an experienced data/software/cloud engineer.",
  keywords: [
    "software", 
    "data", 
    "cloud", 
    "engineering",
    "data engineering",
    "cloud engineering",
    "SQL",
    "Python",
    "C#",
    "Apache Spark",
    "Node.js",
    "TypeScript",
    "React", 
    "Next.js",
    "Tailwind CSS"
  ],
  authors: [{ name: "Leandro Alves" }],
  creator: "Leandro Alves",
  publisher: "Leandro Alves",
  openGraph: {
    title: "Leandro Alves - Data/Cloud/Software Engineer",
    description: "Personal website of Leandro Alves, an experienced data/software/cloud engineer.",
    url: 'https://leandroalveso.github.io',
    siteName: "Leandro Alves Portfolio",
    images: [
      {
        url: '/profile.jpeg',
        width: 800,
        height: 600,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
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
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body 
        className={`
          antialiased 
          bg-gradient-to-br 
          from-gray-100 
          to-gray-200 
          min-h-screen 
          text-gray-900
        `}
      >
        {/* Main content */}
        {children}
        {/* Vercel Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}