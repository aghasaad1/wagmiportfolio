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
  // Every page route except '/', skipping API routes, Next internals and static files.
  matcher: '/((?!api|_next|.*\\..*).+)',
}
