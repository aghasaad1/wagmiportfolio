import type { MetadataRoute } from 'next'
import { ACTIVE_DESIGN } from '@/design.config'
import { absoluteUrl } from '@/lib/site'

// The legacy design's indexable pages. While the HQ single-page design is live
// these are redirected by proxy.ts, so they're left out of the sitemap.
const LEGACY_PAGES = ['/services', '/work', '/careers', '/meet-the-team']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const home = {
    url: absoluteUrl('/'),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  if (ACTIVE_DESIGN === 'hq') return [home]

  return [
    home,
    ...LEGACY_PAGES.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
