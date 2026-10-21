import type { MetadataRoute } from 'next'
import { ACTIVE_DESIGN } from '@/design.config'
import { absoluteUrl } from '@/lib/site'

// Routes that should never be indexed, whichever design is live.
const ALWAYS_DISALLOW = ['/api/', '/scroll-test']

// The HQ design is a single page and proxy.ts redirects these to '/', so they
// are kept out of the crawl while it's live. Flipping ACTIVE_DESIGN back to
// 'legacy' restores them automatically.
const LEGACY_ROUTES = ['/services', '/work', '/careers', '/meet-the-team']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ACTIVE_DESIGN === 'hq' ? [...ALWAYS_DISALLOW, ...LEGACY_ROUTES] : ALWAYS_DISALLOW,
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
