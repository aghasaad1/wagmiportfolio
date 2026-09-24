import { InquiryLink, type Topic } from './Inquiry'
import { GlassArticle } from './Glass'
import { SectionHead, btn, btnGhost, cardMotion, h3, section } from './ui'

type Pkg = {
  tag: string
  name: string
  outcome: string
  fit: string
  plan: [string, string][]
  yourPart: string
  topic: Topic
}

const PACKAGES: Pkg[] = [
  {
    tag: '01 / Paid creative',
    name: 'The 60X Creative Test',
    outcome: 'Stop running out of ads to test.',
    fit: 'For businesses that need more creative for their campaigns.',
    plan: [
      ['Plan', 'Angles and hooks built around your offer.'],
      ['Produce', '20 core creatives. Three opening hooks each. 60 ad versions every month.'],
      ['Improve', 'New versions informed by the campaign results you share.'],
    ],
    yourPart: 'Share your assets and ad results. You or your media buyer runs the campaigns.',
    topic: 'Paid creative',
  },
  {
    tag: '02 / Organic content',
    name: '100 Pieces of Authority',
    outcome: 'You run your business. We handle your content.',
    fit: 'For experts whose content isn’t keeping up with their business.',
    plan: [
      ['Plan', 'Topics and scripts that explain your expertise, answer objections and introduce your offer.'],
      ['Produce', 'Four long-form videos, around three native shorts weekly, plus clips, carousels and graphics. 100+ assets monthly.'],
      ['Publish', 'Captions, scheduling and publishing across up to four platforms. Your editor and project manager handle delivery.'],
    ],
    yourPart: 'Record for 60 minutes each week using prepared scripts.',
    topic: 'Organic content',
  },
  {
    tag: '03 / Organic + paid',
    name: 'The Attention to Acquisition System',
    outcome: 'Get your content and ads working toward the same sale.',
    fit: 'For businesses ready to grow through organic and paid.',
    plan: [
      ['Build your presence', 'The full organic service: 100+ assets, thumbnails and publishing across up to four platforms.'],
      ['Supply your campaigns', '20 core paid creatives with three hooks each. 60 ad versions every month.'],
      ['Learn from both', 'Turn effective organic topics into ads. Use paid results to guide the next content batch, with a monthly review.'],
    ],
    yourPart: 'Record weekly and share ad results. Your editor and project manager coordinate production.',
    topic: 'Both',
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
          <span data-blob className="absolute left-[38%] top-[48%] h-[380px] w-[380px] rounded-full bg-[#3f7a50] opacity-[.45] blur-[100px] will-change-transform max-[800px]:h-[260px] max-[800px]:w-[260px]" />
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
              <p className="mb-6 mt-0 min-h-[50px] text-[14px] text-[#a9b7a7] max-[800px]:mb-[18px] max-[800px]:min-h-0">{p.fit}</p>
              <ul className="m-0 list-none p-0">
                {p.plan.map(([title, body]) => (
                  <li
                    key={title}
                    className="m-0 border-t border-[#f4f1d617] py-4 text-[15px] leading-[1.6] text-[#b7c4b0] max-[1000px]:text-[14px] max-[800px]:text-[16px]"
                  >
                    <strong className="mb-[5px] block text-[15px] text-[#f4f1d6]">{title}</strong>
                    {body}
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
                Discuss this package <span>↗</span>
              </InquiryLink>
            </GlassArticle>
          )
        })}
      </div>

      <div data-anim="reveal" className="mt-[22px] text-center text-[14px] text-[#a7b4a5]">
        Not sure where to start?{' '}
        <a href="#inquiry" className="border-b border-[#6f816b] text-[#f4f1d6] transition-colors duration-200 hover:border-[#f4f1d6]">
          Tell us what’s getting in the way ↗
        </a>
      </div>
    </section>
  )
}
