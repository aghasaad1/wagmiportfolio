import type { Metadata } from 'next'
import { legacyRobots } from '@/lib/legacy-seo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WorkContent from './WorkContent'

export const metadata: Metadata = {
  title: 'Our Work — WAGMI Media',
  description: 'Real results for real brands. From zero to millions — see what the WAGMI content engine delivers.',
  // noindex while the HQ design is live (see lib/legacy-seo.ts)
  ...legacyRobots,
}

export default function WorkPage() {
  return (
    <>
      <WorkContent />
    </>
  )
}
