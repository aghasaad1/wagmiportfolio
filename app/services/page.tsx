import type { Metadata } from 'next'
import { legacyRobots } from '@/lib/legacy-seo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'Services — WAGMI Media',
  description: 'Scripts, editing, strategy, distribution — we run the entire content operation so you can focus on your business.',
  // noindex while the HQ design is live (see lib/legacy-seo.ts)
  ...legacyRobots,
}

export default function ServicesPage() {
  return (
    <>
      <ServicesContent />
    </>
  )
}
