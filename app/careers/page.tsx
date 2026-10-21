import type { Metadata } from 'next'
import { legacyRobots } from '@/lib/legacy-seo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CareersContent from './CareersContent'

export const metadata: Metadata = {
  title: 'Careers — WAGMI Media',
  description: 'Join the team that\'s built channels to 14 million subscribers. We\'re looking for obsessed creatives.',
  // noindex while the HQ design is live (see lib/legacy-seo.ts)
  ...legacyRobots,
}

export default function CareersPage() {
  return (
    <>
      <CareersContent />
    </>
  )
}
