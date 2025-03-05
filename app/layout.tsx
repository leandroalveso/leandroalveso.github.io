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
    default: "Leandro Alves | Software Developer",
    template: "%s | Leandro Alves"
  },
  description: "Personal portfolio and professional showcase of Leandro Alves, a passionate software developer",
  keywords: [
    "software developer", 
    "web development", 
    "portfolio", 
    "React", 
    "Next.js"
  ],
  authors: [{ name: "Leandro Alves" }],
  creator: "Leandro Alves",
  publisher: "Leandro Alves",
  openGraph: {
    title: "Leandro Alves - Software Developer",
    description: "Personal portfolio showcasing professional skills and projects",
    url: 'https://leandroalveso.github.io',
    siteName: "Leandro Alves Portfolio",
    images: [
      {
        url: '/profile.jpeg', // Replace with your actual profile image path
        width: 800,
        height: 600,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Leandro Alves - Software Developer",
    description: "Personal portfolio showcasing professional skills and projects",
    images: ['/profile.jpeg'], // Replace with your actual profile image path
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
    google: 'your-google-site-verification-code', // Optional: Replace with your Google Search Console verification code
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