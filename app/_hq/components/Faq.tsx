'use client'

import { useId, useState } from 'react'
import { Eyebrow, h2, section } from './ui'

// Each answer is a list of paragraphs
const FAQS: [string, string[]][] = [
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

// Height animates both ways via the grid-rows 0fr → 1fr trick (native <details> can't animate closing).
function FaqItem({ question, answer }: { question: string; answer: string[] }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div data-anim="reveal" className="border-b border-[#f4f1d61c]">
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full cursor-pointer items-center justify-between gap-[25px] bg-transparent py-5 text-left text-[16px] font-bold text-[#f4f1d6]"
        >
          <span className="transition-colors duration-300 group-hover:text-white">{question}</span>
          {/* + that morphs into − (the vertical bar folds away) */}
          <span aria-hidden="true" className="relative h-[14px] w-[14px] shrink-0 text-[#95a68d] transition-colors duration-300 group-hover:text-[#f4f1d6]">
            <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-current" />
            <span
              className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                open ? 'rotate-90 scale-y-0' : ''
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div
            className={`max-w-[580px] pb-5 text-[15px] text-[#a9b7a7] transition-[opacity,transform,translate,scale,rotate] duration-500 ease-out motion-reduce:transition-none ${
              open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {answer.map((para) => (
              <p key={para} className="m-0 [&+&]:mt-3">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section
      className={`${section} grid grid-cols-[1fr_1.5fr] gap-20 border-t border-t-[#f4f1d613] max-[800px]:grid-cols-1 max-[800px]:gap-7`}
    >
      <div data-anim="reveal">
        <Eyebrow>A few answers</Eyebrow>
        <h2 className={h2}>Before we begin.</h2>
      </div>
      <div>
        {FAQS.map(([q, a]) => (
          <FaqItem key={q} question={q} answer={a} />
        ))}
      </div>
    </section>
  )
}
