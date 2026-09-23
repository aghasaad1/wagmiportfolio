import { ACTIVE_DESIGN } from '@/design.config'
import LegacyRootLayout, { metadata as legacyMetadata } from './_legacy/LegacyRootLayout'
import HqRootLayout, { metadata as hqMetadata } from './_hq/HqRootLayout'

// Design switch lives in design.config.ts
export const metadata = ACTIVE_DESIGN === 'hq' ? hqMetadata : legacyMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ACTIVE_DESIGN === 'hq'
    ? <HqRootLayout>{children}</HqRootLayout>
    : <LegacyRootLayout>{children}</LegacyRootLayout>
}
