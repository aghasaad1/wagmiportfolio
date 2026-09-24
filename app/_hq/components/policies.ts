/*
 * Policy text shown in the footer modals.
 *
 * {{...}} marks a business decision the owner must confirm before launch (billing terms, notice
 * periods, refund eligibility, governing law, IP). They render highlighted so they're easy to spot;
 * replace each with the real term and remove the braces. See chatgpt/LAUNCH_CHECKLIST.md:
 * "Do not invent refund windows or governing-law terms."
 *
 * A body item is a paragraph (string) or a bulleted list (string[]).
 */

export type PolicySection = { heading: string; body: (string | string[])[] }
export type Policy = { id: 'terms' | 'privacy' | 'refunds'; title: string; tab: string; updated: string; intro: string; sections: PolicySection[] }

const BUSINESS = 'WAGMI HQ LLC'
const EMAIL = 'aghasaad@wagmihq.com'
const MAILING = '1001 S. Main St. #12995, Kalispell, MT 59901'
const UPDATED = 'September 24, 2026'

export const POLICIES: Policy[] = [
  {
    id: 'terms',
    title: 'Terms & Conditions',
    tab: 'Terms',
    updated: UPDATED,
    intro: `These terms explain how you can use this website and how ${BUSINESS} provides its services. By using the website or engaging us, you agree to them.`,
    sections: [
      {
        heading: '1. Who we are',
        body: [
          `This website is operated by ${BUSINESS} (“WAGMI”, “we”, “us”). Our mailing address is ${MAILING}, and you can reach us at ${EMAIL}.`,
          'If you sign a proposal, statement of work or service agreement with us, that document sets out the specific terms of your engagement. Where it conflicts with these terms, the signed document takes priority.',
        ],
      },
      {
        heading: '2. Our services',
        body: [
          'We provide content strategy, video production, organic publishing and paid creative. Descriptions of our packages on this website are summaries to help you choose. They are not binding offers.',
          'The exact deliverables, quantities, platforms, timelines and fees for your engagement are confirmed in writing before work begins. Media buying, ad spend and community management are not included unless your agreement says so.',
        ],
      },
      {
        heading: '3. What we need from you',
        body: [
          'Our work depends on your input. You agree to:',
          [
            'provide accurate information about your business, offer and audience;',
            'supply the assets, account access and performance data we need, when we need them;',
            'record on the agreed schedule (for organic packages, 60 minutes of prepared recording per week);',
            'give feedback and approvals within a reasonable time; and',
            'only give us material you own or have permission to use.',
          ],
          'If inputs arrive late or incomplete, delivery dates may move accordingly.',
        ],
      },
      {
        heading: '4. Fees, billing and renewal',
        body: [
          'Fees are set out in your proposal or agreement. Payments are processed by third-party payment providers; we do not store full card details.',
          'Billing: {{billing frequency, e.g. monthly in advance}}. Recurring packages {{confirm whether they renew automatically each billing period until cancelled}}. Cancellation is covered in our Refund & Cancellation Policy.',
          'If a payment is late, we may pause work until the account is up to date.',
        ],
      },
      {
        heading: '5. Delivery and revisions',
        body: [
          'We deliver work on the schedule agreed for your package. Short-form edits are typically delivered 12–24 hours after a prepared recording; other formats follow the agreed production schedule.',
          'Revisions: {{number of revision rounds included per deliverable}}. Requests that change the agreed scope may be quoted separately.',
        ],
      },
      {
        heading: '6. Intellectual property',
        body: [
          'You keep ownership of everything you provide to us, such as your recordings, logos and brand materials.',
          'Final deliverables: {{confirm ownership, e.g. ownership of final delivered files transfers to you once the related fees are paid in full}}. We keep ownership of our own templates, methods, tools and working files.',
          'Portfolio use: {{confirm whether we may show your work in our portfolio, and how a client can opt out}}.',
        ],
      },
      {
        heading: '7. Results',
        body: [
          'We plan and produce content to help you win attention and clients, and we use available performance data to improve it. However, results depend on factors outside our control, including your offer, market, distribution, ad spend and sales process. We do not guarantee any specific number of views, leads, clients or revenue.',
        ],
      },
      {
        heading: '8. Third-party platforms',
        body: [
          'Content is published on platforms such as YouTube, Instagram, TikTok and Meta, each with its own rules. We are not responsible for platform policy changes, algorithm changes, outages, or actions a platform takes on your account.',
        ],
      },
      {
        heading: '9. Confidentiality',
        body: [
          'We keep your non-public business information confidential and use it only to deliver our services. Please do the same with any non-public information about our methods and pricing.',
        ],
      },
      {
        heading: '10. Limitation of liability',
        body: [
          'To the fullest extent permitted by law, we are not liable for indirect or consequential losses, such as lost profits or lost opportunities. Our total liability for any claim relating to our services is limited to {{liability cap, e.g. the fees you paid us in the three months before the claim}}.',
        ],
      },
      {
        heading: '11. Ending our work together',
        body: [
          'You can cancel as described in our Refund & Cancellation Policy. We may end or suspend an engagement if fees remain unpaid or these terms are seriously breached, after giving you notice and a reasonable chance to fix the issue.',
        ],
      },
      {
        heading: '12. Using this website',
        body: [
          'The content on this website belongs to WAGMI unless stated otherwise. Please do not copy it for commercial use, attempt to disrupt the site, or submit false information through our forms.',
        ],
      },
      {
        heading: '13. Governing law',
        body: ['These terms are governed by the laws of {{state or jurisdiction}}, and any disputes will be handled in {{courts / venue}}.'],
      },
      {
        heading: '14. Changes and contact',
        body: [
          `We may update these terms from time to time; the date at the top shows the latest version. Questions? Email ${EMAIL}.`,
        ],
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    tab: 'Privacy',
    updated: UPDATED,
    intro: `This policy explains what personal information ${BUSINESS} collects through this website and our services, how we use it, and the choices you have.`,
    sections: [
      {
        heading: '1. Who we are',
        body: [`${BUSINESS} is responsible for your personal information. Mailing address: ${MAILING}. Email: ${EMAIL}.`],
      },
      {
        heading: '2. What we collect',
        body: [
          [
            'Inquiry form: your name, email address, website or social profile, the service you’re interested in, and your message.',
            'Careers form: your name, email address, role, a link to your work, and what you tell us about yourself.',
            'Emails and calls: anything you choose to share when you contact us directly.',
            'Client work: information you provide so we can deliver our services, such as recordings, brand assets, platform access and performance data.',
            'Payments: billing details are collected and processed by our payment providers. We do not see or store your full card number.',
            'Website usage: anonymous, aggregated information such as pages viewed, referring site, device and browser type, and page performance, collected through Vercel Web Analytics and Speed Insights. These tools do not use cookies to track you across sites.',
          ],
        ],
      },
      {
        heading: '3. How we use it',
        body: [
          [
            'to reply to your inquiry and arrange calls;',
            'to plan, produce, publish and report on your content;',
            'to bill for our services and keep business records;',
            'to review job applications;',
            'to understand how the website is used and improve it; and',
            'to meet legal, tax and accounting obligations.',
          ],
          'We do not sell your personal information, and we do not use it for automated decision-making.',
        ],
      },
      {
        heading: '4. Who we share it with',
        body: [
          'We share information only with service providers who help us run the business, and only as needed:',
          [
            'Vercel: website hosting and anonymous analytics;',
            'Google: business email, which receives the messages sent through our forms;',
            'payment processors such as Square and Nsave (and Stripe, if we add it): to take payments;',
            'the platforms you ask us to publish to on your behalf.',
          ],
          'We may also disclose information if the law requires it, or to protect our rights.',
        ],
      },
      {
        heading: '5. How long we keep it',
        body: [
          'We keep inquiries and applications for {{retention period, e.g. 24 months}} unless they lead to an engagement. We keep client and billing records for as long as the engagement lasts and afterwards for as long as legal, tax or accounting rules require.',
        ],
      },
      {
        heading: '6. How we protect it',
        body: [
          'We use reputable providers, encrypted connections (HTTPS) and access limited to the people who need it. No method of transmission or storage is perfectly secure, but we take reasonable steps to protect your information.',
        ],
      },
      {
        heading: '7. Your choices and rights',
        body: [
          'Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal information, and to object to or restrict certain uses. To make a request, email us from the address we have on file. We will respond within {{response time, e.g. 30 days}}.',
        ],
      },
      {
        heading: '8. International visitors',
        body: [
          'We are based in the United States, and our providers may process information in the United States and other countries. By contacting us, you understand your information may be transferred there.',
        ],
      },
      {
        heading: '9. Children',
        body: ['This website and our services are intended for businesses and adults. We do not knowingly collect information from children under 16.'],
      },
      {
        heading: '10. Changes and contact',
        body: [`We may update this policy from time to time; the date at the top shows the latest version. Privacy questions? Email ${EMAIL}.`],
      },
    ],
  },
  {
    id: 'refunds',
    title: 'Refund & Cancellation Policy',
    tab: 'Refunds',
    updated: UPDATED,
    intro: `This policy explains how to cancel a ${BUSINESS} package or project, and when refunds apply. Your written agreement may include additional terms for your engagement.`,
    sections: [
      {
        heading: '1. Cancelling a recurring package',
        body: [
          `You can cancel a recurring package at any time by emailing ${EMAIL}. Please give at least {{notice period, e.g. 14 days}} notice before your next billing date.`,
          'Your cancellation takes effect at the end of the billing period you have already paid for. We keep working and delivering through that period, and you won’t be charged again after it ends.',
        ],
      },
      {
        heading: '2. Minimum commitments',
        body: [
          'Some offers include a minimum commitment, for example packages that include a VSL launch build. If yours does, your agreement states the commitment period, and cancellation takes effect at the end of that period.',
        ],
      },
      {
        heading: '3. Refunds',
        body: [
          'Our fees reserve production time and cover work that begins as soon as a billing period starts. For that reason: {{refund eligibility, e.g. fees for a billing period that has already started are non-refundable}}.',
          'If we are unable to deliver work we have committed to, we will {{remedy, e.g. refund the undelivered portion of your fees}}.',
        ],
      },
      {
        heading: '4. One-off projects',
        body: [
          'For focused projects, payment terms and any deposit are set out in your project agreement. Deposits: {{confirm whether deposits are refundable, and when}}. If a project is cancelled after work has started, fees for work already completed remain payable.',
        ],
      },
      {
        heading: '5. Work completed before cancelling',
        body: [
          'Any work completed and paid for before your cancellation takes effect will be delivered to you. Ownership of delivered work follows our Terms & Conditions.',
        ],
      },
      {
        heading: '6. How to request a refund',
        body: [
          `Email ${EMAIL} with your name, business and the reason for your request. We will reply within {{response time, e.g. 5 business days}}. Approved refunds are returned to your original payment method, and your bank or card provider may take a few extra days to show them.`,
          'If you have a billing concern, please contact us before opening a dispute with your bank. Most issues can be resolved quickly by talking to us.',
        ],
      },
    ],
  },
]
