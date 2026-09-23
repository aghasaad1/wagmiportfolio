import { Eyebrow, h2, section, summary } from './ui'

const FAQS = [
  ['Who is this for?', 'Coaches, agency owners, and expertise-led businesses with an existing offer and a content bottleneck.'],
  ['How much do I need to record?', 'Organic packages require 60 minutes per week, with scripts prepared beforehand. Paid-creative requirements depend on your assets and the concepts.'],
  ['What if I don’t have winning ads?', 'We start with creative to test, then use the performance data you share to guide the next batch.'],
  ['Is ads management included?', 'Paid-creative production and media buying are separate. Meta ads management can be discussed as an additional service.'],
  ['How fast will I receive content?', 'Short-form edits arrive within 12–24 hours after recording, once scripting and preparation are complete. Other formats follow the agreed schedule.'],
  ['Will this bring me clients?', 'That is the goal behind the strategy. Outcomes also depend on your offer, market, distribution and sales process. We use available performance data to improve the content.'],
]

export default function Faq() {
  return (
    <section
      className={`${section} grid grid-cols-[1fr_1.5fr] gap-20 border-t border-t-[#f4f1d613] max-[800px]:grid-cols-1 max-[800px]:gap-7`}
    >
      <div>
        <Eyebrow>A few answers</Eyebrow>
        <h2 className={h2}>Before we begin.</h2>
      </div>
      <div>
        {FAQS.map(([q, a]) => (
          <details key={q} className="group border-b border-[#f4f1d61c] py-5">
            <summary className={`${summary} text-[16px] font-bold`}>{q}</summary>
            <p className="my-[15px] max-w-[580px] text-[15px] text-[#a9b7a7]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
