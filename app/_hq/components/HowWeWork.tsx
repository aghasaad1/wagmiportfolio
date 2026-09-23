import { InquiryLink } from './Inquiry'
import { Eyebrow, SectionHead, btnGhost, h2, h3, section, summary } from './ui'

const WHY = [
  ['We bring the ideas.', 'Topics, angles and scripts built around what you sell. You don’t start each week with a blank document.'],
  ['We handle the moving parts.', 'Your editor and project manager coordinate the organic work. You focus on your business.'],
  ['We use what we learn.', 'Audience responses and campaign results help decide what to make next.'],
]

const STEPS = [
  ['01', 'Start with your offer.', 'We review what you sell, who buys it and where content is getting stuck. Then we set the plan.'],
  ['02', 'Record. We take it from there.', 'Organic clients record from prepared scripts. For ads, we work with your assets and the concepts we agree on.'],
  ['03', 'Publish, test, improve.', 'We publish organic content. Your media buyer tests the ads. The results guide the next batch.'],
]

export function WhyUs() {
  return (
    <section className={section}>
      <SectionHead eyebrow="Why work with us" title="You shouldn’t have to do all the thinking." />
      <div className="grid grid-cols-3 gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-5">
        {WHY.map(([title, body]) => (
          <article key={title} className="border-t border-[#f4f1d629] pt-3">
            <h3 className={`${h3} my-[23px] text-[23px]`}>{title}</h3>
            <p className="my-4 text-[16px] text-[#a9b7a7]">{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" className={section}>
      <SectionHead eyebrow="How we work together" title="Know what happens next." />
      <div className="grid grid-cols-3 gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-6">
        {STEPS.map(([num, title, body]) => (
          <article key={num}>
            <span className="block border-b border-[#f4f1d621] pb-[15px] text-[14px] text-[#7e957e]">{num}</span>
            <h3 className={`${h3} mb-[10px] mt-5 text-[24px]`}>{title}</h3>
            <p className="my-[15px] text-[15px] text-[#a9b6a7]">{body}</p>
          </article>
        ))}
      </div>
      <div className="mt-[30px] rounded-xl bg-[#17271d] px-[22px] py-[17px] text-[14px] text-[#b8c5b4]">
        Organic packages: <strong>60 minutes of recording a week.</strong> Short-form edits within 12–24 hours after
        prepared recording.
      </div>
    </section>
  )
}

export function FocusedProjects() {
  return (
    <details className="group border-y border-[#f4f1d620] py-[22px]">
      <summary className={`${summary} max-[800px]:flex-wrap max-[800px]:gap-2`}>
        Need a specific project? <span className="text-[14px] text-[#a9b7a7]">Explore focused services</span>
      </summary>
      <p className="my-[14px] text-[14px] text-[#a9b7a7]">Tell us what you need help with. We’ll discuss the scope on a call.</p>
      <p className="mb-[14px] mt-[22px] text-[14px] text-[#9eafa0]">[Insert finalized project services]</p>
      <InquiryLink topic="A focused project" className={btnGhost()}>
        Discuss a project ↗
      </InquiryLink>
    </details>
  )
}

export function Careers() {
  return (
    <section
      id="careers"
      className={`${section} flex items-center justify-between gap-[30px] max-[800px]:flex-col max-[800px]:items-start`}
    >
      <div>
        <Eyebrow>Careers</Eyebrow>
        <h2 className={h2}>Work with WAGMI.</h2>
        <p className="my-4 text-[#b8c5b3]">Content strategy. Video editing. Creative production.</p>
        <p className="my-4 text-[#b8c5b3]">Tell us what you do and share your work.</p>
      </div>
      <InquiryLink topic="Careers" className={`${btnGhost()} shrink-0`}>
        Introduce yourself ↗
      </InquiryLink>
    </section>
  )
}
