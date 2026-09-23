import { ACTIVE_DESIGN } from '@/design.config'
import LegacyHomePage from './_legacy/LegacyHomePage'
import HqHomePage from './_hq/HqHomePage'

// Design switch lives in design.config.ts
export default function Page() {
  return ACTIVE_DESIGN === 'hq' ? <HqHomePage /> : <LegacyHomePage />
}
