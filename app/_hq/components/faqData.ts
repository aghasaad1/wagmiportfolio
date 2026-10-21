/*
 * FAQ content for the "Before we begin." section.
 * Each entry is [question, paragraphs]. Kept in its own module so the FAQPage
 * JSON-LD (JsonLd.tsx, a server component) can read the same copy — a
 * 'use client' module can't be imported for its data on the server.
 */

export const FAQS: [string, string[]][] = [
  [
    'Who is this for?',
    [
      'WAGMI is built for businesses with a proven offer that need more content and creative without building the entire production team in-house.',
      'That includes performance marketing agencies, DTC brands, and coaches with offers that are already selling.',
    ],
  ],
  [
    'What exactly does WAGMI handle?',
    [
      'Depending on the package, we can handle creative planning, scripts, hooks, video editing, paid ad creatives, VSLs, short-form content, long-form content, repurposing, revisions, and delivery.',
      'Your exact scope is agreed before we start.',
    ],
  ],
  [
    'Do I need to provide the ideas and briefs?',
    [
      'Not for everything.',
      'We start with your offer, audience, existing content, previous creatives, and what has already worked. From there, we help build the angles, hooks, concepts, and production plan.',
      'You still provide the business context. We handle the content and creative execution around it.',
    ],
  ],
  [
    'What if I don’t have winning ads yet?',
    [
      'That’s fine.',
      'We can start by creating different angles, hooks, and concepts to test. Once you have performance data, those results help guide what we produce next.',
    ],
  ],
  [
    'Do you manage the ads too?',
    [
      'Paid creative production and media buying are separate.',
      'Our core role is creating the ads and creative assets. Meta ads management can be discussed separately where needed.',
    ],
  ],
  [
    'How much do I need to record?',
    [
      'For organic content, around 60 minutes of prepared recording per week can be enough depending on the package.',
      'For paid creative, recording requirements depend on the concept, available assets, UGC, product footage, and campaign direction.',
    ],
  ],
  [
    'How fast is the turnaround?',
    [
      'Prepared short-form creative can typically be turned around within 12–24 hours.',
      'Long-form videos, VSLs, larger creative batches, and other formats follow the production schedule agreed for the project.',
    ],
  ],
  [
    'What happens after the first batch?',
    [
      'We look at what the audience and campaigns are telling us.',
      'Strong hooks, topics, angles, and concepts can be developed further. Weak ones can be dropped or changed.',
      'The goal is to make the next batch from what we have learned instead of starting from zero again.',
    ],
  ],
  [
    'Do you guarantee results?',
    [
      'No agency can honestly guarantee views, leads, sales, ROAS, or revenue.',
      'Those results also depend on your offer, market, media buying, landing pages, pricing, sales process, and other factors outside creative production.',
      'What we can control is the quality, consistency, speed, and strategy behind the content and creative we produce.',
    ],
  ],
  [
    'Can I start with a single project?',
    [
      'Yes.',
      'You can start with a focused project such as a VSL, paid ad creative batch, long-form video, short-form batch, funnel creative, or another agreed project before moving into a monthly system.',
    ],
  ],
]
