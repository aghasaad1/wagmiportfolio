'use client'

import { useId, useState } from 'react'
import { Eyebrow, h2, section } from './ui'

const FAQS = [
  ['Who is this for?', 'Coaches, agency owners, and expertise-led businesses with an existing offer and a content bottleneck.'],
  ['How much do I need to record?', 'Organic packages require 60 minutes per week, with scripts prepared beforehand. Paid-creative requirements depend on your assets and the concepts.'],
  ['What if I don’t have winning ads?', 'We start with creative to test, then use the performance data you share to guide the next batch.'],
  ['Is ads management included?', 'Paid-creative production and media buying are separate. Meta ads management can be discussed as an additional service.'],
  ['How fast will I receive content?', 'Short-form edits arrive within 12–24 hours after recording, once scripting and preparation are complete. Other formats follow the agreed schedule.'],
  ['Will this bring me clients?', 'That is the goal behind the strategy. Outcomes also depend on your offer, market, distribution and sales process. We use available performance data to improve the content.'],
]

// Height animates both ways via the grid-rows 0fr → 1fr trick (native <details> can't animate closing).
function FaqItem({ question, answer }: { question: string; answer: string }) {
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
          <p
            className={`m-0 max-w-[580px] pb-5 text-[15px] text-[#a9b7a7] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
              open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {answer}
          </p>
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
