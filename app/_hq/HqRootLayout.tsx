import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import './hq.css'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site'
import JsonLd from './components/JsonLd'

const manrope = localFont({
  src: [
    { path: './fonts/manrope-regular.ttf', weight: '400' },
    { path: './fonts/manrope-bold.ttf', weight: '700' },
    { path: './fonts/manrope-extrabold.ttf', weight: '800' },
  ],
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
})

export const metadata: Metadata = {
  // Lets the relative URLs below (canonical, OG image) resolve to absolute ones.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Single-page site, so every crawl of '/' points at the same canonical URL.
  alternates: { canonical: '/' },
  icons: { icon: '/hq/favicon.ico', apple: '/hq/apple-icon.png' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0c1814',
  colorScheme: 'dark',
}

export default function HqRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="hq">
      <body className={manrope.className}>
        <noscript>
          <style>{'html.hq [data-anim]{visibility:visible!important}'}</style>
        </noscript>
        {children}
        <JsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
