import { InquiryLink } from './Inquiry'
import { Eyebrow, Mark, SectionHead, btn, h3, section } from './ui'

const WHY = [
  ['We bring the ideas.', 'Topics, angles and scripts built around what you sell. You don’t start each week with a blank document.'],
  ['We handle the moving parts.', 'Your editor and project manager coordinate the organic work. You focus on your business.'],
  ['We use what we learn.', 'Audience responses and campaign results help decide what to make next.'],
]

const STEPS = [
  ['01', 'Plan', 'Start with your offer.', 'We review what you sell, who buys it and where content is getting stuck. Then we set the plan.'],
  ['02', 'Produce', 'Record. We take it from there.', 'Organic clients record from prepared scripts. For ads, we work with your assets and the concepts we agree on.'],
  ['03', 'Improve', 'Publish, test, improve.', 'We publish organic content. Your media buyer tests the ads. The results guide the next batch.'],
]

export function WhyUs() {
  return (
    <section className={section}>
      <SectionHead eyebrow="Why work with us" title="You shouldn’t have to do all the thinking." />
      <div className="grid grid-cols-3 gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-5">
        {WHY.map(([title, body]) => (
          <article key={title} className="pt-3 relative">
            <span data-anim="line" aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#f4f1d629]" />
            <div data-anim="reveal">
              <h3 className={`${h3} my-[23px] text-[23px]`}>{title}</h3>
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

      {/* Same facts as the prototype's recording note, shown as two stats */}
      <div data-anim="reveal" className="mt-14 grid grid-cols-2 gap-4 max-[800px]:mt-10 max-[800px]:grid-cols-1">
        <div className="rounded-2xl border border-[#f4f1d61c] bg-[#17271d] px-6 py-5">
          <div className="text-[34px] font-extrabold leading-none tracking-[-.04em]">60 min</div>
          <p className="mb-0 mt-2 text-[14px] text-[#b8c5b4]">of recording a week on organic packages.</p>
        </div>
        <div className="rounded-2xl border border-[#f4f1d61c] bg-[#17271d] px-6 py-5">
          <div className="text-[34px] font-extrabold leading-none tracking-[-.04em]">12–24 h</div>
          <p className="mb-0 mt-2 text-[14px] text-[#b8c5b4]">for short-form edits after prepared recording.</p>
        </div>
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
      <Mark className="pointer-events-none absolute -right-10 top-1/2 h-[300px] w-[300px] -translate-y-1/2 -rotate-12 opacity-[.05] max-[800px]:-right-16 max-[800px]:h-[220px] max-[800px]:w-[220px]" />

      <div className="relative grid grid-cols-[1fr_auto] items-center gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-7">
        <div>
          <Eyebrow className="mb-4">Focused projects</Eyebrow>
          <h3 id="focused-title" className={`${h3} m-0 text-[clamp(26px,3vw,36px)] tracking-[-.04em]`}>
            Need a specific project?
          </h3>
          <p className="mb-0 mt-3 max-w-[520px] text-[16px] text-[#b8c5b3]">
            Tell us what you need help with. We’ll discuss the scope on a call.
          </p>
          <p className="mb-0 mt-5 inline-block rounded-lg border border-dashed border-[#f4f1d633] px-3 py-[6px] text-[13px] text-[#9eafa0]">
            [Insert finalized project services]
          </p>
        </div>
        <InquiryLink topic="A focused project" className={`${btn()} justify-self-end max-[800px]:justify-self-start`}>
          Discuss a project <span>↗</span>
        </InquiryLink>
      </div>
    </aside>
  )
}
