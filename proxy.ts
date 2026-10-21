import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACTIVE_DESIGN } from './design.config'

// The HQ design is a single page, so the legacy sub-pages are hidden while it's live.
export function proxy(request: NextRequest) {
  if (ACTIVE_DESIGN === 'hq') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  /*
   * The legacy page routes only, as literal patterns.
   *
   * Two constraints, both learned the hard way, keep this list the way it is:
   *
   *  1. It must be literal. Next reads this array at build time by static
   *     analysis, so a computed value (even `LEGACY_ROUTES.map(...)`) is not
   *     understood and the proxy silently runs on *every* request — which
   *     redirects '/' to itself in a loop.
   *  2. It must not be one catch-all with a negative lookahead (what this used
   *     to be): Next 16 never runs the proxy at all with that pattern, so the
   *     legacy pages stayed reachable while the HQ design was live.
   *
   * Keep in sync with LEGACY_ROUTES in lib/site.ts (robots.ts and sitemap.ts
   * use that list; this one can't import it, per 1 above).
   *
   * Listing the routes also means an unknown URL falls through to
   * app/not-found.tsx instead of redirecting to '/', so typos get a real 404.
   */
  matcher: ['/services/:path*', '/work/:path*', '/careers/:path*', '/meet-the-team/:path*'],
}
