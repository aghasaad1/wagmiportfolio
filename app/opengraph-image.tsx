import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { SITE_NAME } from '@/lib/site'

// Image metadata
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_NAME} — Your done-for-you content funnel`

/**
 * Social share card, generated at build time.
 *
 * Built typographically from the site's own wordmark, hero headline and
 * palette. The wagmi-mark.svg asset isn't used here because it relies on SVG
 * filters and an embedded bitmap, which Satori (the renderer behind
 * ImageResponse) doesn't support — only a subset of CSS and flexbox is.
 */
export default async function Image() {
  const [bold, extrabold] = await Promise.all([
    readFile(path.join(process.cwd(), 'app/_hq/fonts/manrope-bold.ttf')),
    readFile(path.join(process.cwd(), 'app/_hq/fonts/manrope-extrabold.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // Matches the site background, including its radial wash.
          backgroundColor: '#0c1814',
          backgroundImage:
            'radial-gradient(ellipse 70% 520px at 48% 180px, #1a3024 0%, rgba(26,48,36,0) 85%)',
          padding: '72px 80px',
          fontFamily: 'Manrope',
        }}
      >
        {/* Eyebrow — the hero's own qualifier */}
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#aab6aa',
          }}
        >
          For businesses with a proven offer
        </div>

        {/* Headline — the hero H1 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 86,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.1,
              color: '#f4f1d6',
            }}
          >
            <span>Your done-for-you&nbsp;</span>
            {/* Accent sweep behind the key phrase, as on the page */}
            <span
              style={{
                display: 'flex',
                backgroundColor: '#f3e38a',
                color: '#0c1814',
                padding: '0 16px',
                borderRadius: 10,
              }}
            >
              content funnel
            </span>
            <span>.</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.5,
              color: '#b8c1b7',
            }}
          >
            Organic and paid content built to turn attention into clients.
          </div>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(244,241,214,0.18)',
            paddingTop: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: '0.02em',
              color: '#f4f1d6',
            }}
          >
            {SITE_NAME}
          </div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: '#8fa18f' }}>
            Content strategy &amp; video production
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Manrope', data: bold, weight: 700, style: 'normal' },
        { name: 'Manrope', data: extrabold, weight: 800, style: 'normal' },
      ],
    }
  )
}
