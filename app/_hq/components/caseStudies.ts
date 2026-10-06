/*
 * Client case studies, opened from the "A few of the people we've worked with" row.
 * A body item is a paragraph (string) or a bulleted list (string[]); both may use **bold**.
 * `photo` (a path under /public) replaces the initials once the client's picture is supplied.
 * Links without a confirmed URL are left out until one is provided.
 */

export type CaseStudy = {
  id: string
  initials: string
  photo?: string
  /** Name and short label shown in the client row */
  name: string
  role: string
  /** Dialog header */
  title: string
  services: string
  headline: string
  intro: string
  sections: { heading: string; body: (string | string[])[] }[]
  quote?: { heading: string; text: string; author: string }
  links?: { heading: string; items: { label: string; href: string }[] }
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'brandon-clark',
    initials: 'BC',
    name: 'Brandon Clark',
    role: 'Retirement education',
    title: 'Brandon Clark',
    services: 'Content strategy · Long-form & short-form editing · Repurposing · Distribution · Ad creatives',
    headline: 'Making retirement advice easier to watch and understand.',
    intro:
      'Brandon creates educational content about retirement, taxes, income and investing. We helped shape, produce and distribute that content for an audience primarily aged 60+, keeping his explanations clear and the viewer’s attention on his advice.',
    sections: [
      {
        heading: 'Before',
        body: [
          'Brandon had approximately 6,000 YouTube subscribers. Our focus was to help him reach more people with content built around his audience’s retirement questions.',
        ],
      },
      {
        heading: 'What we did',
        body: [
          [
            '**Content strategy:** Helped shape videos around the questions and concerns that mattered to his audience.',
            '**Long-form and short-form editing:** Used clear structure, deliberate pacing and minimal distractions to hold attention without making the explanations harder to follow.',
            '**Repurposing and distribution:** Turned long-form videos into clips and distributed content across YouTube, YouTube Shorts and Instagram.',
            '**Ad creatives:** Produced creative for the Meta campaigns Brandon ran.',
          ],
        ],
      },
      {
        heading: 'After',
        body: [
          'During our work together, Brandon’s channel grew from approximately **6,000 to 23,000 subscribers**. His videos were consistently attracting views, while repurposing extended his content across short-form channels. Alongside organic content, we supplied creatives for his paid campaigns.',
        ],
      },
    ],
    quote: {
      heading: 'In Brandon’s words',
      text: 'Saad and AK are a solid team. They will work extremely hard for you and make sure anything you request is done. Even though at times I needed to provide creative guidance, they still implemented their own ideas and were able to put into existence my thoughts. I highly recommend them and I don’t say that lightly',
      author: 'Brandon Clark',
    },
    links: {
      heading: 'Explore',
      items: [{ label: 'Brandon’s YouTube channel', href: 'https://www.youtube.com/@clarkgroupam' }],
    },
  },
  {
    id: 'timeless-protection',
    initials: 'TP',
    name: 'Timeless Protection',
    role: 'Content operations',
    title: 'Michael DeCecco · Timeless Protection',
    services: 'Content operations · Multi-brand management · Ad creatives · GHL funnels & websites',
    headline: 'One recording a week. 150+ content outputs a month.',
    intro:
      'We manage Michael’s content across multiple brands from scripts and recording support to editing, distribution, ad creatives and the GHL pages behind his offers.',
    sections: [
      {
        heading: 'The challenge',
        body: [
          'Multiple brands, multiple channels, and content needed for both organic publishing and paid campaigns. Our role was to handle the operation and keep production moving.',
        ],
      },
      {
        heading: 'What we handle',
        body: [
          [
            '**Content production:** Long-form and short-form scripting, recording support, video editing and repurposing producing 150+ outputs monthly from one recording session per week.',
            '**Channel management:** Multiple YouTube channels, his main Facebook account, personal-brand Instagram and company Instagram, with content distributed across his brands.',
            '**Ads and funnels:** Ad creatives, testimonial edits for advertising, GHL funnel support and website development in GHL.',
          ],
        ],
      },
      {
        heading: 'Where we are today',
        body: [
          'Approximately 10 months into our ongoing collaboration, we continue to manage Michael’s content operation. A single weekly recording supplies content across his brands, supported by ad creatives and work on the funnels behind his offers.',
        ],
      },
    ],
    quote: {
      heading: 'In Michael’s words',
      text: 'Great human and great worker. They get to know the brand and represent it well. Very responsive when it comes to revisions, and editing work is on point. Great addition to any business trying to make a name for themselves.',
      author: 'Michael DeCecco',
    },
    links: {
      heading: 'Explore Michael’s brands',
      items: [
        { label: 'Timeless Life Insurance — Website', href: 'https://www.timelesslifeinsurance.com/' },
        { label: 'Timeless Protection — YouTube', href: 'https://www.youtube.com/@TimelessProtection' },
        { label: 'We Protect Veterans — YouTube', href: 'https://www.youtube.com/@WeProtectVeterans' },
        { label: 'Team Timeless — Instagram', href: 'https://www.instagram.com/teamtimeless_official/' },
        { label: 'Michael — Instagram', href: 'https://www.instagram.com/michael.wpv/' },
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61563041887119' },
      ],
    },
  },
  {
    id: 'jonathan-catliff',
    initials: 'JC',
    name: 'Jonathan Catliff',
    role: 'Content + community',
    title: 'Jonathan Catliff · Automatable',
    services: 'Content strategy · Long-form YouTube · Retention · Publishing · Skool community',
    headline: 'From 100 YouTube subscribers to 126,000+ and a 362-member paid community.',
    intro:
      'Jonathan teaches AI automation, no-code systems and business automation. We helped build the content engine around that expertise, then connected the audience he was building on YouTube with his paid Automatable community.',
    sections: [
      {
        heading: 'The challenge',
        body: [
          'Jonathan was starting with a very small YouTube audience in a fast-moving AI niche. The goal was not just to publish more videos. He needed content that could build authority, hold attention and eventually support a paid community around his expertise.',
        ],
      },
      {
        heading: 'What we did',
        body: [
          [
            '**Content strategy and scripting:** Developed topics, hooks and scripts around AI automation, no-code systems and the problems his audience was trying to solve.',
            '**Long-form YouTube:** Edited educational videos with stronger structure, retention-focused pacing and clearer delivery without distracting from the information.',
            '**Publishing support:** Helped keep the channel consistent and supported the content planning behind each release.',
            '**Skool community:** Helped position the Automatable community, structure the offer, organize the backend and connect the community with the audience being built through YouTube.',
          ],
        ],
      },
      {
        heading: 'After',
        body: [
          'Over seven months, Jonathan’s YouTube channel grew from approximately 100 subscribers to more than **126,000**. His paid Automatable community also grew to **362 members**.',
          'The bigger shift was connecting the two. YouTube built the audience and authority, while the community gave that audience a clear next step beyond simply watching the content.',
        ],
      },
    ],
  },
  {
    id: 'marketing-against-the-grain',
    initials: 'HL',
    name: 'Hubert Lamela',
    role: 'Marketing Against The Grain',
    title: 'Hubert Lamela · Marketing Against The Grain',
    services: 'Marketing education · Long-form content · Content engine',
    headline: 'Turning complex marketing ideas into structured, scalable content.',
    intro:
      'Marketing Against The Grain needed a repeatable system for publishing educational content around marketing, growth, AI, and business. We supported the content engine through script development, long-form editing, retention-focused pacing, hook optimization, publishing, and channel consistency.',
    sections: [
      {
        heading: 'What we handled',
        body: [
          [
            'Script development',
            'Long-form YouTube editing',
            'Retention-focused pacing',
            'Hook optimization',
            'Publishing and scheduling',
            'Content consistency',
          ],
        ],
      },
      {
        heading: 'Result',
        body: [
          'During the collaboration, the channel scaled from approximately **0 to 89,600+ subscribers**, while building a stronger authority position around marketing, growth, and AI education.',
        ],
      },
    ],
  },
  {
    id: 'ask-the-advocate',
    initials: 'MB',
    name: 'Maureen Brown',
    role: 'Ask The Advocate',
    title: 'Maureen Brown · Ask The Advocate',
    services: 'Content strategy · Community setup · Funnel development · Email marketing',
    headline: 'Building the systems behind the content.',
    intro:
      'Maureen already had strong experience and credibility in special education advocacy. The bigger opportunity was creating the infrastructure around that expertise so content, community, lead generation, and follow-up could work together.',
    sections: [
      {
        heading: 'What we handled',
        body: [
          [
            'Content strategy and authority positioning',
            'Long-form and short-form content direction',
            'Full Skool community setup',
            'Community positioning and backend organization',
            'Full funnel creation',
            'Offer structure and lead flow',
            'Email marketing setup',
            'Newsletter strategy and execution',
            'Nurture planning for client acquisition',
          ],
        ],
      },
      {
        heading: 'Result',
        body: [
          'We helped launch the first phase of her community, structured the offer and backend, completed the funnel, and built the email and newsletter system needed to support ongoing lead nurturing.',
        ],
      },
    ],
  },
  {
    id: 'epic-real-estate',
    initials: 'MT',
    name: 'Matt Theriault',
    role: 'Epic Real Estate',
    title: 'Matt Theriault · Epic Real Estate',
    services: 'Real estate education · Long-form YouTube · Content operations',
    headline: 'Scaling authority through consistent long-form content.',
    intro:
      'Epic Real Estate already had an audience, but needed stronger consistency, more structured content, and a repeatable production system around its YouTube presence.',
    sections: [
      {
        heading: 'What we handled',
        body: [
          [
            'Long-form YouTube editing',
            'Content structuring',
            'Retention-focused pacing',
            'Hook improvements',
            'Publishing and scheduling',
            'Channel consistency',
          ],
        ],
      },
      {
        heading: 'Result',
        body: [
          'During the collaboration, the channel grew from approximately **2,000 to 246,000 subscribers**, while developing a more consistent and scalable content operation around Matt’s real estate education.',
        ],
      },
    ],
  },
]
