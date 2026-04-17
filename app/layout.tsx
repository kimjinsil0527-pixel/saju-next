import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import PageTracker from '@/components/PageTracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'MINGYUN — Decode Your Destiny',
  description: 'AI-powered Four Pillars of Destiny analysis. Daily fortune, annual reports, and expert 1:1 consultation.',
  keywords: 'four pillars, bazi, saju, fortune, astrology, compatibility, destiny, horoscope',
  metadataBase: new URL('https://mingyun.app'),
  openGraph: {
    title: 'MINGYUN — Decode Your Destiny',
    description: 'AI-powered Four Pillars analysis. Start free, no sign-up required.',
    locale: 'en_US',
    type: 'website',
    siteName: 'MINGYUN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MINGYUN — Decode Your Destiny',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MINGYUN — Decode Your Destiny',
    description: 'AI-powered Four Pillars analysis. Start free, no sign-up required.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <PageTracker />
        <Analytics />
      </body>
    </html>
  )
}
