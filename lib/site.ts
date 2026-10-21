/**
 * Single source of truth for site-wide SEO constants.
 *
 * The production domain is read from NEXT_PUBLIC_SITE_URL so it can be set per
 * environment (Vercel preview vs. production) without a code change. The
 * fallback matches the contact address used across the site (@wagmihq.com).
 * If the canonical domain ever changes, set that env var — nothing else.
 *
 * Every string here is copy that already exists elsewhere in the site; this
 * file centralises it for metadata and JSON-LD rather than introducing new
 * marketing claims.
 */

// No trailing slash: metadataBase and the sitemap both compose paths onto this.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wagmihq.com').replace(/\/+$/, '')

export const SITE_NAME = 'WAGMI HQ LLC'
export const SITE_SHORT_NAME = 'WAGMI HQ'

export const SITE_TITLE = 'WAGMI HQ LLC | Content Strategy & Video Production'

// Matches the existing <meta description> and the footer blurb.
export const SITE_DESCRIPTION =
  'WAGMI HQ LLC provides content strategy, video production, organic publishing and paid creative for coaches and agency owners.'

// From the footer: the one-paragraph description of what the company does.
export const SITE_SUMMARY =
  'Content strategy, video production and creative execution for businesses with proven offers. Organic content, paid creative and VSLs built around what you already sell.'

export const CONTACT_EMAIL = 'aghasaad@wagmihq.com'

// From the footer <address> block.
export const ADDRESS = {
  street: '1001 S. Main St. #12995',
  city: 'Kalispell',
  region: 'MT',
  postalCode: '59901',
  country: 'US',
} as const

export const LOGO_PATH = '/hq/wagmi-mark.svg'
export const OG_IMAGE_PATH = '/opengraph-image'

/**
 * The legacy design's own page routes.
 *
 * Shared by robots.ts and sitemap.ts. proxy.ts needs the same list but can't
 * import it — its matcher must be a static literal — so keep the two in sync.
 * '/scroll-test' is deliberately absent: it's a direct-visit sandbox, already
 * noindex and disallowed, and stays reachable whichever design is active.
 */
export const LEGACY_ROUTES = ['/services', '/work', '/careers', '/meet-the-team'] as const

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
