import type { MetadataRoute } from 'next'
import { ACTIVE_DESIGN } from '@/design.config'
import { absoluteUrl, LEGACY_ROUTES } from '@/lib/site'

// While the HQ single-page design is live the legacy pages are redirected by
// proxy.ts, so they're left out of the sitemap.

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
    ...LEGACY_ROUTES.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
