import type { Metadata } from 'next'
import { legacyRobots } from '@/lib/legacy-seo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TeamContent from './TeamContent'

export const metadata: Metadata = {
  title: 'Meet the Team — WAGMI Media',
  description: 'The people behind the content engine. Meet the strategists, editors, and creatives who make brands grow.',
  // noindex while the HQ design is live (see lib/legacy-seo.ts)
  ...legacyRobots,
}

export default function MeetTheTeamPage() {
  return (
    <>
      <TeamContent />
    </>
  )
}
