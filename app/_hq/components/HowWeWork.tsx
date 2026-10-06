import { InquiryLink } from './Inquiry'
import { Eyebrow, Mark, SectionHead, btn, h3, section } from './ui'

const WHY = [
  ['Content stops being another job on your plate', 'You’re no longer starting every week wondering what to post, what to brief, or what needs to be edited next.'],
  ['Your expertise turns into consistent content', 'Your ideas, offer and experience become a steady stream of content built to keep you visible and relevant to the people you want to reach.'],
  ['Your content starts working toward the business', 'Instead of posting just to stay active, your organic content and paid creative are built around the same offer, audience and next step.'],
]

const STEPS = [
  ['01', 'Plan', 'Start with what already sells.', 'We learn your offer, audience, existing creatives, content and what has already worked. Then we decide what deserves to be made next.'],
  ['02', 'Produce', 'Give us the inputs. We take it from there.', 'For paid creative, we work from your offer, assets and campaign learnings. For organic, we turn your expertise and recordings into content. Your dedicated team handles production, revisions and delivery.'],
  ['03', 'Improve', 'Produce. Test. Learn. Build the next batch.', 'Audience response, content performance and campaign results tell us what deserves another angle, what to push further and what to stop producing.'],
]

// One stat per side of the business, so neither organic nor paid reads as the whole company
const STATS = [
  ['60+', 'paid creative variations available through our creative testing system.'],
  ['60 min', 'recording can fuel weeks of organic content.'],
  ['12–24h', 'typical turnaround for prepared short-form creative.'],
]

const PROJECTS = [
  'VSL editing',
  'Paid ad creatives',
  'Long-form YouTube editing',
  'Short-form content batches',
  'AI-assisted ad creative',
  'Content repurposing',
  'Landing page / funnel creative',
  'GHL funnel builds',
]

export function WhyUs() {
  return (
    <section className={section}>
      <SectionHead eyebrow="Why work with us" title="You’re not hiring another average video editor. You’re investing in a content team." />
      <div className="grid grid-cols-3 gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-5">
        {WHY.map(([title, body]) => (
          <article key={title} className="pt-3 relative">
            <span data-anim="line" aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#f4f1d629]" />
            <div data-anim="reveal">
              <h3 className={`${h3} my-[23px] text-[22px]`}>{title}</h3>
              <p className="my-4 text-[16px] text-[#a9b7a7]">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Horizontal timeline on desktop, vertical on phones. Animations (data-timeline) fills the
// connecting line as you scroll and lights each numbered stop when the line reaches it.
export function Process() {
  return (
    <section id="process" className={section}>
      <SectionHead eyebrow="How we work together" title="Know what happens next." />

      <ol data-timeline className="relative m-0 mt-12 grid list-none grid-cols-3 gap-10 p-0 max-[800px]:mt-8 max-[800px]:grid-cols-1 max-[800px]:gap-9">
        {/* Desktop: one track + fill between the first and last node centres */}
        <span aria-hidden="true" className="absolute left-[calc(100%/6)] right-[calc(100%/6)] top-[27px] h-px bg-[#f4f1d626] max-[800px]:hidden">
          <span data-timeline-fill className="absolute inset-0 origin-left bg-[#f4f1d6]" />
        </span>

        {STEPS.map(([num, phase, title, body], i) => (
          <li key={num} className="relative flex flex-col items-center text-center max-[800px]:flex-row max-[800px]:items-start max-[800px]:gap-5 max-[800px]:text-left">
            {/* Phones: a connector from this node down to the next one (its height depends on the text) */}
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="absolute -bottom-9 left-[27px] top-[54px] hidden w-px bg-[#f4f1d626] max-[800px]:block">
                <span data-timeline-seg className="absolute inset-0 origin-top bg-[#f4f1d6]" />
              </span>
            )}
            <span
              data-timeline-node
              className="relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-[#f4f1d6] bg-[#f4f1d6] text-[15px] font-bold text-[#0c1814]"
            >
              {num}
            </span>
            <div data-anim="reveal" className="mt-6 max-w-[320px] max-[800px]:mt-[6px]">
              <span className="inline-block rounded-full border border-[#f4f1d62e] px-3 py-[3px] text-[12px] font-bold uppercase tracking-[.14em] text-[#b0c2aa]">
                {phase}
              </span>
              <h3 className={`${h3} mb-[10px] mt-4 text-[24px] max-[800px]:mt-3 max-[800px]:text-[22px]`}>{title}</h3>
              <p className="my-0 text-[15px] text-[#a9b6a7]">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1 max-[800px]:mt-10">
        {STATS.map(([value, label]) => (
          <div
            key={value}
            data-anim="reveal"
            className="relative overflow-hidden rounded-2xl border border-[#f4f1d61c] bg-[linear-gradient(135deg,#1b3023,#15241b_70%)] px-6 py-5"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#f3e38a,#f3e38a00)]" />
            <div className="text-[34px] font-extrabold leading-none tracking-[-.04em]">{value}</div>
            <p className="mb-0 mt-2 text-[14px] text-[#b8c5b4]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FocusedProjects() {
  return (
    <aside
      data-anim="reveal"
      aria-labelledby="focused-title"
      className="relative my-16 overflow-hidden rounded-[26px] border border-[#f4f1d626] bg-[linear-gradient(120deg,#1b3023,#13221a_60%)] px-11 py-10 max-[800px]:my-12 max-[800px]:px-6 max-[800px]:py-8"
    >
      {/* Oversized faded mark as texture */}
      <Mark className="pointer-events-none absolute right-8 top-1/2 h-[240px] w-[240px] -translate-y-1/2 opacity-[.06] max-[800px]:-right-10 max-[800px]:top-10 max-[800px]:h-[180px] max-[800px]:w-[180px] max-[800px]:translate-y-0" />

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-7">
        <div>
          <Eyebrow className="mb-4">Focused projects</Eyebrow>
          <h3 id="focused-title" className={`${h3} m-0 text-[clamp(26px,3vw,36px)] tracking-[-.04em]`}>
            Need a specific project?
          </h3>
          <p className="mb-0 mt-3 max-w-[520px] text-[16px] text-[#b8c5b3]">
            One-off creative, content and funnel projects without committing to a monthly system.
          </p>
          <p className="mb-0 mt-6 text-[12px] font-bold uppercase tracking-[.14em] text-[#8fa18f]">Available projects</p>
          <ul className="m-0 mt-3 flex max-w-[640px] list-none flex-wrap gap-2 p-0">
            {PROJECTS.map((p) => (
              <li key={p} className="rounded-full border border-[#f4f1d62a] bg-[#f4f1d608] px-3 py-[6px] text-[13px] text-[#d3d9c6]">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <InquiryLink topic="Focused project" className={`${btn()} justify-self-end max-[800px]:justify-self-start`}>
          Discuss a project <span>↗</span>
        </InquiryLink>
      </div>
    </aside>
  )
}
