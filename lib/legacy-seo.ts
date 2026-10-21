import type { Metadata } from 'next'
import { ACTIVE_DESIGN } from '@/design.config'

/**
 * Keeps the legacy sub-pages out of search results while the HQ single-page
 * design is live.
 *
 * proxy.ts redirects these routes to '/', but they are still prerendered at
 * build time, so without this they can be indexed and compete with the home
 * page. Flipping ACTIVE_DESIGN back to 'legacy' makes them indexable again —
 * their own titles and descriptions are left untouched either way.
 */
export const legacyRobots: Pick<Metadata, 'robots'> =
  ACTIVE_DESIGN === 'hq' ? { robots: { index: false, follow: false } } : {}
