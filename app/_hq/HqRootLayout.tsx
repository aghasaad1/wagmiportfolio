import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import './hq.css'

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
  title: 'WAGMI HQ LLC | Content Strategy & Video Production',
  description:
    'WAGMI HQ LLC provides content strategy, video production, organic publishing and paid creative for coaches and agency owners.',
  icons: { icon: '/hq/favicon.ico', apple: '/hq/apple-icon.png' },
}

export default function HqRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="hq">
      <body className={manrope.className}>
        <noscript>
          <style>{'html.hq [data-anim]{visibility:visible!important}'}</style>
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
