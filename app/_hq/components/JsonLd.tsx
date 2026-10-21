import {
  ADDRESS,
  CONTACT_EMAIL,
  LOGO_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SUMMARY,
  SITE_URL,
  absoluteUrl,
} from '@/lib/site'
import { FAQS } from './faqData'
import { PACKAGES } from './Packages'

/**
 * Structured data (schema.org JSON-LD) for the single-page HQ site.
 *
 * Every value is drawn from copy that already exists on the page — the footer
 * address block, the FAQ answers and the package definitions — so the markup
 * Google reads matches what a visitor sees. Nothing here states a claim the
 * page doesn't already make.
 */

// The package `fit` strings use **bold** markers for in-page rendering.
const stripMarkdown = (text: string) => text.replace(/\*\*/g, '')

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE_NAME,
  url: absoluteUrl('/'),
  description: SITE_SUMMARY,
  email: CONTACT_EMAIL,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(LOGO_PATH),
  },
  image: absoluteUrl(LOGO_PATH),
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: CONTACT_EMAIL,
    availableLanguage: 'English',
  },
  // Service area is remote/global rather than a storefront catchment.
  areaServed: 'Worldwide',
  knowsAbout: [
    'Content strategy',
    'Video production',
    'Organic content',
    'Paid creative',
    'Video sales letters',
    'Short-form content',
  ],
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: absoluteUrl('/'),
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
}

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQS.map(([question, answers]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answers.join(' '),
    },
  })),
}

const services = PACKAGES.map((pkg) => ({
  '@type': 'Service',
  '@id': `${SITE_URL}/#service-${pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
  name: pkg.name,
  serviceType: pkg.tag.replace(/^\d+\s*\/\s*/, ''),
  description: `${pkg.outcome} ${stripMarkdown(pkg.fit)}`,
  provider: { '@id': ORG_ID },
  areaServed: 'Worldwide',
}))

const graph = {
  '@context': 'https://schema.org',
  '@graph': [organization, website, faqPage, ...services],
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Static, build-time object with no user input, so there is nothing to escape beyond
      // the closing-tag guard below.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\u003c') }}
    />
  )
}
