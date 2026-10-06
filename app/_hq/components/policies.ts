/*
 * Policy text shown in the footer modals.
 *
 * A body item is a paragraph (string) or a bulleted list (string[]). Strings may use **bold**, and
 * {{...}} still renders as a highlighted "confirm before launch" field if one is ever needed.
 */

export type PolicySection = { heading: string; body: (string | string[])[] }
export type Policy = {
  id: 'terms' | 'privacy' | 'cookies' | 'refunds'
  title: string
  tab: string
  updated: string
  intro: string
  sections: PolicySection[]
}

const BUSINESS = 'WAGMI HQ LLC'
const EMAIL = 'aghasaad@wagmihq.com'
// Line breaks inside a string render as line breaks (policy paragraphs use white-space: pre-line)
const ADDRESS = `**${BUSINESS}**
1001 S. Main St. #12995
Kalispell, MT 59901
United States`

export const POLICIES: Policy[] = [
  {
    id: 'terms',
    title: 'Terms & Conditions',
    tab: 'Terms',
    updated: 'October 3, 2026',
    intro: `These Terms & Conditions govern your use of the ${BUSINESS} website and our services. By using this website, submitting an inquiry, purchasing services, or engaging ${BUSINESS}, you agree to these Terms.`,
    sections: [
      {
        heading: '1. Who We Are',
        body: [
          `This website is operated by **${BUSINESS}** (“WAGMI,” “we,” “us,” or “our”).`,
          `**Mailing address:**
${BUSINESS}
1001 S. Main St. #12995
Kalispell, MT 59901
United States`,
          `**Email:** ${EMAIL}`,
          'If you sign a proposal, statement of work, or separate service agreement with us, that agreement will govern the specific scope, pricing, and terms of your engagement. If there is a conflict, the signed agreement takes priority.',
        ],
      },
      {
        heading: '2. Our Services',
        body: [
          'WAGMI provides content strategy, video production, editing, paid creative, VSLs, short-form and long-form content, content repurposing, publishing, scripting, project management, AI-assisted creative, and selected funnel or automation services where agreed.',
          'Website package descriptions are general summaries only. Exact deliverables, quantities, timelines, platforms, fees, and responsibilities will be confirmed in writing before work begins.',
          'Media buying, ad spend, software subscriptions, and other third-party costs are not included unless specifically stated.',
        ],
      },
      {
        heading: '3. What We Need From You',
        body: [
          'To deliver the work, you agree to provide the information, recordings, footage, brand assets, account access, approvals, and performance data reasonably required for the project.',
          'You are responsible for ensuring that materials you provide can legally be used and that claims relating to your business, products, services, testimonials, financial results, health, or other regulated topics are accurate and properly approved.',
          'For organic content packages, you may be required to complete approximately **60 minutes of prepared recording per week**, depending on the service selected.',
          'If required inputs or approvals are delayed, delivery dates may also move.',
        ],
      },
      {
        heading: '4. Your WAGMI Team',
        body: [
          'Depending on your package, your account may include a dedicated editor, project manager, strategist, designer, or other production team members.',
          'WAGMI may use employees, contractors, and specialist partners to deliver services while remaining responsible for managing the work.',
        ],
      },
      {
        heading: '5. Fees, Billing, and Reserved Capacity',
        body: [
          'Fees and billing schedules are stated in your proposal, invoice, checkout page, or service agreement.',
          'Unless otherwise agreed:',
          [
            'recurring services are billed in advance;',
            'one-time projects follow the agreed payment schedule;',
            'work may be paused if payment becomes overdue; and',
            'recurring services continue until cancelled under the applicable cancellation terms.',
          ],
          'Monthly services reserve production capacity for your business. If work cannot be completed because you delay recordings, approvals, assets, access, or other required inputs, billing may continue and unused capacity may expire at the end of that billing period.',
          'Payments are processed through third-party payment providers. WAGMI does not store complete payment-card details.',
        ],
      },
      {
        heading: '6. Delivery, Approvals, and Revisions',
        body: [
          'Delivery schedules depend on the service selected.',
          'Prepared short-form content is typically delivered within approximately **12 to 24 hours**, while long-form content, VSLs, ad creatives, funnels, and other projects follow the agreed production schedule.',
          'Clients should provide approvals or revision requests within approximately **48 business hours** where reasonably possible.',
          'Revisions are included when they remain within the approved brief.',
          'A materially different concept, script, footage set, offer, CTA, duration, audience, format, or creative direction may be treated as new scope and quoted separately.',
        ],
      },
      {
        heading: '7. Ownership and Project Files',
        body: [
          'You keep ownership of the materials you provide to us.',
          'Unless otherwise agreed, ownership of custom final deliverables transfers to you after the related fees have been paid in full.',
          'WAGMI retains ownership of its internal workflows, templates, systems, methods, tools, prompts, processes, and know-how.',
          'Editable project files, source files, internal working files, and templates are not automatically included unless specifically agreed.',
          'Projects may also use licensed music, stock assets, fonts, software, templates, AI tools, or other third-party materials. These remain subject to the licenses of their respective providers.',
        ],
      },
      {
        heading: '8. AI-Assisted Production',
        body: [
          'Some projects may use AI-assisted tools for video, images, voice, scripting, editing, ideation, or other production tasks.',
          'AI-assisted outputs are subject to the terms and technical limitations of the relevant third-party providers, and exact visual, audio, or character consistency cannot always be guaranteed.',
        ],
      },
      {
        heading: '9. Portfolio and Confidentiality',
        body: [
          'Unless confidentiality has been agreed in writing, WAGMI may display publicly released work in our website, portfolio, proposals, social media, case studies, and sales materials.',
          'We will not intentionally disclose non-public confidential business information.',
          'Both parties agree to use reasonable care when handling confidential information received during the engagement.',
        ],
      },
      {
        heading: '10. Results and Third-Party Platforms',
        body: [
          'We create content and creative intended to improve attention, communication, distribution, and marketing performance.',
          'However, we do not guarantee any specific number of:',
          ['views;', 'followers;', 'leads;', 'sales;', 'clients;', 'ROAS;', 'revenue; or', 'other business results.'],
          'Results depend on factors outside our control, including your offer, market, audience, distribution, advertising spend, sales process, and competition.',
          'Past results, testimonials, and case studies do not guarantee future performance.',
          'We are also not responsible for algorithm changes, platform outages, account suspensions, advertising rejections, reach reductions, or other actions taken by third-party platforms.',
        ],
      },
      {
        heading: '11. Cancellation, Refunds, and Payment Disputes',
        body: [
          'Cancellation and refund terms are governed by our **Refund & Cancellation Policy** and any separate written agreement with you.',
          `If you believe there is a billing error, please contact **${EMAIL}** before initiating a payment dispute.`,
          'Where necessary, WAGMI may provide contracts, invoices, communications, approvals, delivery records, and other relevant documentation to payment processors or financial institutions when responding to a dispute.',
        ],
      },
      {
        heading: '12. Suspension and Termination',
        body: [
          'We may pause or end services if:',
          [
            'payments remain unpaid;',
            'a client materially breaches an agreement;',
            'required cooperation is repeatedly withheld;',
            'unlawful or deceptive work is requested; or',
            'continued work would create unreasonable legal, platform, financial, or reputational risk.',
          ],
          'Where appropriate, we will provide notice and a reasonable opportunity to resolve the issue.',
        ],
      },
      {
        heading: '13. Liability',
        body: [
          'To the fullest extent permitted by law, WAGMI will not be liable for indirect, incidental, special, or consequential losses, including lost profits, lost revenue, lost opportunities, advertising spend, or anticipated business.',
          'Unless a separate written agreement states otherwise, WAGMI’s total liability relating to an engagement will not exceed the fees paid to WAGMI for the relevant services during the **three months immediately before the event giving rise to the claim**.',
          'Nothing in these Terms limits liability where doing so would be prohibited by law.',
        ],
      },
      {
        heading: '14. General Terms',
        body: [
          'WAGMI operates as an independent contractor. Nothing in these Terms creates an employment relationship, partnership, or joint venture between WAGMI and the client.',
          'We are not responsible for delays caused by events reasonably outside our control, including internet outages, software failures, platform outages, natural disasters, government action, illness, or similar events.',
          'The content, branding, design, and original materials on this website belong to WAGMI or are used under license and may not be commercially copied without permission.',
          'If any part of these Terms is found to be unenforceable, the remaining provisions will continue to apply.',
        ],
      },
      {
        heading: '15. Governing Law and Contact',
        body: [
          'These Terms are governed by the laws of the **State of Montana, United States**, without regard to conflict-of-law principles.',
          'Unless otherwise agreed in writing, any legal proceeding relating to these Terms or our services must be brought in the applicable state or federal courts in Montana.',
          'Before beginning formal legal proceedings, both parties agree to make a reasonable good-faith effort to resolve the issue directly.',
          'Questions about these Terms can be sent to:',
          `${ADDRESS}
**${EMAIL}**`,
        ],
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    tab: 'Privacy',
    updated: 'October 6, 2026',
    intro: `${BUSINESS} respects your privacy. This policy explains what information we collect and how we use it.`,
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'We may collect information you provide through our website or when working with us, including:',
          [
            'name and email;',
            'website or social profile;',
            'business and project information;',
            'messages submitted through forms;',
            'billing and transaction information;',
            'recordings, footage, brand assets, or other materials you provide.',
          ],
          'We may also collect basic website data such as IP address, browser type, device information, and pages visited.',
        ],
      },
      {
        heading: '2. How We Use Information',
        body: [
          'We use information to:',
          [
            'respond to inquiries;',
            'provide and manage services;',
            'process payments;',
            'communicate with clients;',
            'improve our website and services;',
            'maintain security and business records.',
          ],
          'We do not sell your personal information.',
        ],
      },
      {
        heading: '3. Third-Party Services',
        body: [
          'We may use trusted third-party providers for payments, website hosting, analytics, communication, cloud storage, and project management.',
          'These providers may receive information only as needed to provide their services.',
        ],
      },
      {
        heading: '4. Cookies and Analytics',
        body: [
          'Our website may use cookies and analytics tools to understand website usage, improve performance, and measure marketing activity.',
          'Where required, you may be given options to manage non-essential cookies.',
        ],
      },
      {
        heading: '5. Data Security and Retention',
        body: [
          'We use reasonable measures to protect your information and keep it only as long as necessary for providing services, maintaining records, resolving disputes, or meeting legal obligations.',
          'No online system can guarantee complete security.',
        ],
      },
      {
        heading: '6. Your Rights',
        body: [
          'Depending on where you live, you may have the right to request access to, correction of, or deletion of certain personal information.',
          `To make a request, contact us at **${EMAIL}**.`,
        ],
      },
      {
        heading: '7. Changes',
        body: ['We may update this Privacy Policy from time to time. The date above shows the latest version.'],
      },
      {
        heading: '8. Contact',
        body: [ADDRESS, `**Email:** ${EMAIL}`],
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    tab: 'Cookies',
    updated: 'October 6, 2026',
    intro: `This Cookie Policy explains how ${BUSINESS} uses cookies and similar technologies on our website.`,
    sections: [
      {
        heading: '1. What Cookies Are',
        body: [
          'Cookies are small files stored on your device when you visit a website. They can help a website function properly, remember preferences, and understand how visitors use the site.',
        ],
      },
      {
        heading: '2. How We Use Cookies',
        body: [
          'We may use cookies and similar technologies to:',
          [
            'keep the website functioning properly;',
            'understand how visitors use the website;',
            'measure website performance;',
            'improve the user experience;',
            'measure marketing and advertising activity.',
          ],
        ],
      },
      {
        heading: '3. Types of Cookies We May Use',
        body: [
          '**Essential cookies**\nNeeded for the website to function properly.',
          '**Analytics cookies**\nHelp us understand website traffic and visitor behavior.',
          '**Marketing cookies**\nMay be used to measure advertising performance or support retargeting where applicable.',
        ],
      },
      {
        heading: '4. Third-Party Tools',
        body: [
          'Some cookies may be placed by third-party services we use, such as analytics, advertising, payment, or website technology providers.',
          'Those services operate under their own privacy and cookie policies.',
        ],
      },
      {
        heading: '5. Managing Cookies',
        body: [
          'Where required, you may be able to accept, reject, or manage non-essential cookies through the cookie banner on our website.',
          'You can also control or delete cookies through your browser settings.',
          'Disabling certain cookies may affect how some parts of the website work.',
        ],
      },
      {
        heading: '6. Changes',
        body: ['We may update this Cookie Policy from time to time. The date above shows the latest version.'],
      },
      {
        heading: '7. Contact',
        body: [ADDRESS, `**Email:** ${EMAIL}`],
      },
    ],
  },
  {
    id: 'refunds',
    title: 'Refund & Cancellation Policy',
    tab: 'Refunds',
    updated: 'October 6, 2026',
    intro: `This policy explains how cancellations, refunds, recurring services, and client-caused delays are handled by **${BUSINESS}**.`,
    sections: [
      {
        heading: '1. One-Time Projects',
        body: [
          'For one-time projects, payments are generally non-refundable once work has started.',
          'If a project is cancelled before work begins, any refund or credit will depend on the circumstances and any non-recoverable costs already incurred.',
          'If work has already been completed or partially completed, fees paid for that work are not refundable.',
        ],
      },
      {
        heading: '2. Recurring Services',
        body: [
          'Recurring packages are billed in advance for each billing period unless otherwise agreed in writing.',
          'You may cancel a recurring service by providing written notice before the next billing date.',
          'Cancellation stops future billing. It does not automatically create a refund for the current billing period.',
          'Work already scheduled or completed during the current billing period remains payable.',
        ],
      },
      {
        heading: '3. Client Delays and Unused Capacity',
        body: [
          'Monthly services reserve production capacity for your business.',
          'If work is delayed because recordings, assets, approvals, access, feedback, or other required inputs are not provided on time, billing may continue as scheduled.',
          'Unused production capacity caused by client delays does not automatically roll over into a future billing period and is not refundable unless agreed otherwise in writing.',
        ],
      },
      {
        heading: '4. Revisions and Scope Changes',
        body: [
          'Revisions included within the approved brief are handled according to the applicable service agreement.',
          'Requests that materially change the original concept, script, footage, offer, CTA, duration, target audience, format, or creative direction may be treated as new scope and charged separately.',
          'Scope changes are not a basis for refunding work already completed.',
        ],
      },
      {
        heading: '5. Refund Requests',
        body: [
          `If you believe there has been a billing or service issue, contact us at **${EMAIL}**.`,
          'Refund requests are reviewed individually based on:',
          [
            'the work already completed;',
            'the stage of the project;',
            'reserved production capacity;',
            'third-party costs already incurred;',
            'the terms of the applicable agreement; and',
            'the reason for the request.',
          ],
          'Approved refunds, where applicable, will be returned through the original payment method where reasonably possible.',
        ],
      },
      {
        heading: '6. Missed Deadlines',
        body: [
          'If a delay is caused by WAGMI, we will work with you to adjust the production schedule and resolve the issue.',
          'If a deadline is missed because of client delays, missing assets, late approvals, platform issues, or events outside our control, that delay does not automatically qualify for a refund.',
        ],
      },
      {
        heading: '7. Chargebacks and Payment Disputes',
        body: [
          'If you believe a payment was incorrect, please contact us before opening a chargeback or payment dispute.',
          'We may provide contracts, invoices, communications, approvals, delivery records, and other relevant documentation to payment processors or financial institutions when responding to a dispute.',
        ],
      },
      {
        heading: '8. How to Cancel',
        body: [
          'To cancel a recurring service or request a review of a payment issue, email:',
          `**${EMAIL}**`,
          'Please include your name, company name, and the service you want to cancel.',
        ],
      },
      {
        heading: '9. Contact',
        body: [ADDRESS, `**Email:** ${EMAIL}`],
      },
    ],
  },
]
