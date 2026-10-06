import { InquiryLink, type Topic } from './Inquiry'
import { GlassArticle } from './Glass'
import { Rich, SectionHead, btn, btnGhost, cardMotion, glassPill, h3, section } from './ui'

type Pkg = {
  tag: string
  name: string
  outcome: string
  fit: string
  plan: [string, string][]
  yourPart: string
  cta: string
  topic: Topic
}

// Copy strings may use **bold** (rendered by Rich)
const PACKAGES: Pkg[] = [
  {
    tag: '01 / Paid creative',
    name: 'The 60X Creative Test',
    outcome: 'Stop running out of ads to test.',
    fit: 'For **DTC brands and agencies running paid social media that** need a steady flow of new creative angles, hooks and concepts to test.',
    plan: [
      ['Plan', 'We study your offer, existing creatives and campaign learnings, then build new angles and hooks around what deserves testing next.'],
      ['Produce', '20 core creatives with three opening hooks each. **60 ad versions every month.**'],
      ['Improve', 'You share campaign results. We use those learnings to shape the next creative batch.'],
      ['Your dedicated team', 'A dedicated video editor and project manager handle your creative production, revisions and delivery.'],
    ],
    yourPart: 'Share your assets and campaign results. You or your media buyer runs the campaigns.',
    cta: 'Explore paid creative',
    topic: 'Paid creative',
  },
  {
    tag: '02 / Organic content',
    name: '100 Pieces of Authority',
    outcome: 'You run your business. Your new content team handles the rest.',
    fit: 'For **coaches, consultants and agency owners** with expertise worth sharing, but no time to plan, produce and manage content every week.',
    plan: [
      ['Plan', 'We turn your expertise, audience questions and offer into topics, hooks and scripts.'],
      ['Produce', 'Four long form videos, weekly shorts, clips, carousels and graphics. **100+ assets every month.**'],
      ['Improve', 'Audience response helps us decide which topics, angles and formats to develop next.'],
      ['Your dedicated team', 'You get a dedicated video editor and project manager managing production, VA, revisions and delivery around your content.'],
    ],
    yourPart: 'Record for around 60 minutes each week. Your new team takes it from there.',
    cta: 'Explore organic content',
    topic: 'Organic content',
  },
  {
    tag: '03 / Organic + paid',
    name: 'The Attention to Acquisition System',
    outcome: 'Get your content and ads working toward the same sale.',
    fit: 'For coaches, agencies and expertise-led businesses already using organic content and paid ads, but managing them as two separate systems.',
    plan: [
      ['Plan', 'One content strategy built around the same audience, offer and sales goal across organic and paid.'],
      ['Produce', '100+ organic assets + 60 paid creative versions every month.'],
      ['Improve', 'Strong organic topics can become paid creatives. Campaign learnings can shape the next organic and paid batch.'],
      ['Your dedicated team', 'A dedicated video editor and project manager coordinate the full production flow so both sides stay connected.'],
    ],
    yourPart: 'Record weekly and share campaign results. Your new team handles the production around it.',
    cta: 'Explore the full system',
    topic: 'Organic + paid',
  },
]

// One step per package on a rising ramp built from the site's own greens (card #13221a →
// #17271d → featured #1b3023), plus a top strip that brightens. Full class strings so Tailwind sees them.
const TIERS = [
  {
    // Glass tint = the site green for this step; card 1 most tinted, card 3 lets the most light through
    glass: { '--glass-rgb': '19 34 26', '--glass-dark': 0.74 },
    card: 'border-[#f4f1d621] hover:border-[#f4f1d645]',
    bar: 'bg-[#f4f1d6]/15',
    tag: 'text-[#9eafa0]',
    button: btnGhost,
  },
  {
    glass: { '--glass-rgb': '23 39 29', '--glass-dark': 0.6 },
    card: 'border-[#f4f1d636] hover:border-[#f4f1d65c]',
    bar: 'bg-[#f4f1d6]/45',
    tag: 'text-[#b0c2aa]',
    button: btnGhost,
  },
  {
    glass: { '--glass-rgb': '27 48 35', '--glass-dark': 0.46 },
    card: 'border-[#9eb99a75] hover:border-[#b9d4b4b0]',
    bar: 'bg-[#f4f1d6]',
    tag: 'text-[#c9d6c2]',
    button: btn,
  },
]

export default function Packages() {
  return (
    <section
      id="packages"
      className={`${section} relative before:pointer-events-none before:absolute before:inset-y-0 before:-inset-x-[30px] before:-z-10 before:bg-[radial-gradient(ellipse_at_50%_260px,#27452c32,transparent_68%)] before:content-[''] max-[800px]:before:-inset-x-[15px]`}
    >
      <SectionHead
        eyebrow="Three ways to work together"
        title="What’s holding your content back?"
        sub="Choose paid creative, organic content, or both."
      />

      <div className="relative grid grid-cols-3 items-stretch gap-4 max-[800px]:grid-cols-1">
        {/* Ambient light for the glass cards to frost; drifts on desktop (Animations: data-blob) */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 max-[800px]:-inset-x-5">
          <span data-blob className="absolute left-[4%] top-[18%] h-[340px] w-[340px] rounded-full bg-[#9eb99a] opacity-[.22] blur-[90px] will-change-transform max-[800px]:h-[240px] max-[800px]:w-[240px]" />
          <span data-blob className="absolute left-[38%] top-[48%] h-[380px] w-[380px] rounded-full bg-[#3f7a50] opacity-[.45] blur-[100px] will-change-transform max-[800px]:left-[18%] max-[800px]:h-[260px] max-[800px]:w-[260px]" />
          <span data-blob className="absolute right-[2%] top-[8%] h-[400px] w-[400px] rounded-full bg-[#f4f1d6] opacity-[.2] blur-[100px] will-change-transform max-[800px]:bottom-[6%] max-[800px]:top-auto max-[800px]:h-[280px] max-[800px]:w-[280px]" />
        </div>
        {PACKAGES.map((p, i) => {
          const tier = TIERS[i]
          return (
            <GlassArticle
              key={p.name}
              data-anim="reveal"
              style={tier.glass as React.CSSProperties}
              className={`${cardMotion} hq-glass hq-glass-frost relative flex flex-col overflow-hidden rounded-[22px] border px-[23px] py-[27px] max-[1000px]:px-[18px] max-[1000px]:py-6 max-[800px]:p-7 ${tier.card}`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${tier.bar}`} />
              <div className={`text-[14px] font-bold uppercase tracking-[.12em] ${tier.tag}`}>{p.tag}</div>
              <h3 className={`${h3} mb-[22px] mt-[17px] min-h-[54px] text-[20px] max-[800px]:mb-5 max-[800px]:min-h-0 max-[800px]:max-w-[260px] max-[800px]:text-[21px]`}>
                {p.name}
              </h3>
              <p className="mb-[19px] mt-0 min-h-[135px] text-[27px] font-bold leading-[1.22] tracking-[-.04em] max-[1000px]:min-h-[145px] max-[1000px]:text-[24px] max-[800px]:min-h-0 max-[800px]:max-w-[460px] max-[800px]:text-[29px]">
                {p.outcome}
              </p>
              <p className="mb-6 mt-0 min-h-[88px] text-[14px] text-[#a9b7a7] max-[1000px]:min-h-[110px] max-[800px]:mb-[18px] max-[800px]:min-h-0">
                <Rich text={p.fit} boldClass="font-bold text-[#e3e6cf]" />
              </p>
              <ul className="m-0 list-none p-0">
                {p.plan.map(([title, body]) => (
                  <li
                    key={title}
                    className="m-0 border-t border-[#f4f1d617] py-4 text-[15px] leading-[1.6] text-[#b7c4b0] max-[1000px]:text-[14px] max-[800px]:text-[16px]"
                  >
                    <strong className="mb-[5px] block text-[15px] text-[#f4f1d6]">{title}</strong>
                    <Rich text={body} />
                  </li>
                ))}
              </ul>
              <p className="mb-[14px] mt-auto border-t border-[#f4f1d617] pt-[19px] text-[14px] text-[#b7c4b0] max-[800px]:mb-[15px] max-[800px]:text-[15px]">
                <b className="text-[#f4f1d6]">Your part:</b> {p.yourPart}
              </p>
              <InquiryLink
                topic={p.topic}
                className={`${tier.button('gap-[22px] rounded-[12px] px-[10px] py-[13px] text-[14px] max-[1000px]:gap-[10px]')} mb-0 mt-[10px] w-full`}
              >
                {p.cta} <span>↗</span>
              </InquiryLink>
            </GlassArticle>
          )
        })}
      </div>

      <div data-anim="reveal" className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[14px] text-[#a7b4a5]">
        Not sure where to start?
        <InquiryLink topic="Help me choose" className={glassPill}>
          Tell us what’s getting in the way <span>↗</span>
        </InquiryLink>
      </div>
    </section>
  )
}
