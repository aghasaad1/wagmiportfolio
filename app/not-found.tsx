import type { Metadata } from 'next'
import { ACTIVE_DESIGN } from '@/design.config'
import LegacyNotFound from './_legacy/LegacyNotFound'
import HqNotFound from './_hq/HqNotFound'

// The root layout sets `index, follow` for the real site, which would otherwise
// sit alongside the automatic noindex Next.js emits with the 404 status. Setting
// robots here replaces it, so a dead URL carries one unambiguous directive.
export const metadata: Metadata = {
  title: 'Page not found | WAGMI HQ LLC',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

// Design switch lives in design.config.ts
export default function NotFound() {
  return ACTIVE_DESIGN === 'hq' ? <HqNotFound /> : <LegacyNotFound />
}
