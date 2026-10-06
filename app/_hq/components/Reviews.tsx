'use client'

import { useState } from 'react'
import { SectionHead, section } from './ui'

type Review = { quote: string; name: string; meta: string; project: string; detail?: string }

const REVIEWS: Review[] = [
  {
    quote: 'Great human and great worker. They get to know the brand and represent it well. Very responsive when it comes to revisions, and editing work is on point. Great addition to any business trying to make a name for themselves.',
    name: 'Michael DeCecco',
    meta: 'Timeless Protection · We Protect Veterans · Insurance Education',
    project: 'Content operations & video production',
    detail: 'Ongoing support across Michael’s content operation, including editing, revisions, brand consistency, organic content, ad creatives, and multi-brand production.',
  },
  {
    quote: 'Great freelancer. Hiring on a regular basis from here on out.',
    name: 'Daniel',
    meta: 'VSL Editor for Alternative Health Services',
    project: 'VSL editing',
    detail: 'VSL editing and post-production for an alternative health offer.',
  },
  {
    quote: 'Agha Saad helped us get our content agency going before we brought the team in-house. He crushed it. Hit every deadline and truly understands short-form content so we got great results for clients. He was very communicative and you can tell he cares, not only about his business, but ours as well. Would definitely recommend to anyone looking for editing help',
    name: 'Hatim Khan',
    meta: 'Strawberi Media · Real Estate Content Agency',
    project: 'Short-form video editing',
    detail: 'Supported Strawberi Media’s short-form content production while the agency scaled client delivery before bringing its editing team in-house.',
  },
  {
    quote: 'Saad and AK are a solid team. They will work extremely hard for you and make sure anything you request is done. Even though at times I needed to provide creative guidance, they still implemented their own ideas and were able to put into existence my thoughts. I highly recommend them and I don’t say that lightly.',
    name: 'Brandon Clark',
    meta: 'Retirement Education · YouTube',
    project: 'Long-form YouTube editing',
    detail: 'Ongoing weekly production of 10–20 minute educational videos, with fast revisions and consistent delivery.',
  },
  {
    quote: 'It was always great to work with Agha. I guarantee he’s attentive to details, very proactive, resourceful, versatile, and also fun to work with. Highly recommended.',
    name: 'Allan Badilla Gamboa',
    meta: 'YouTube Entertainment Content',
    project: 'Research, scripting and video editing',
    detail: 'Produced YouTube content around current rap stories, combining research, scripting and editing into engaging, story-driven videos.',
  },
  {
    quote: 'Agha is an incredibly skilled editor, known for his reliability and expertise in handling tasks. He worked with our team for a considerable time, demonstrating his strong capabilities. Agha would be a valuable addition to any team.',
    name: 'Kamryn Peterson',
    meta: 'Paid Social · Facebook & TikTok Ads',
    project: 'Performance ad editing',
    detail: 'Created 15 to 40 second paid social creatives, repurposed existing footage into new ad variations, and worked closely with the marketing team on retention focused edits for Facebook and TikTok campaigns.',
  },
  {
    quote: 'Really good video editor. Communication is excellent, he replies really quickly and gets everything super fast. Recommended.',
    name: 'Timothy',
    meta: 'Video Editing',
    project: 'Ongoing video production',
    detail: 'Supported Timothy with video editing and fast turnaround, with a focus on clear communication and responsive revisions.',
  },
  {
    quote: 'Great freelancer to do business with. I have nothing but praises for Agha. I would work with him and his team again.',
    name: 'Candida Gone',
    meta: 'Health & Wellness Content',
    project: 'Content marketing support',
    detail: 'Supported CandidaGone with content marketing and creative execution for its health and wellness brand.',
  },
  {
    quote: 'Agha delivered exactly as promised. He turned around the VSL in 24 hours, followed the brief closely, and the final edit looked clean, modern, and ready to run on Meta. Communication was smooth and he was easy to work with. I’d hire him again for more ad creatives.',
    name: 'Mighty Moose Nutrition',
    meta: 'Nutrition & Wellness',
    project: 'VSL editing for Meta ads',
    detail: 'Produced a clean, modern VSL from the provided brief with a 24-hour turnaround, ready for paid social use.',
  },
  {
    quote: 'Absolutely BRILLIANT! AGHA’S WORK IS NOTHING SHORT OF SPECTACULAR! A true “genie in a bottle, miracle worker, and creative genius!” I am beyond thrilled to have found such a “talented, kind, and dedicated” professional. His “passion, precision, and expertise” shine through in every project, and he consistently goes “above and beyond” to deliver excellence. If you’re looking for someone who not only meets expectations but “exceeds them in every way”, Agha is the one! “A million thanks!”',
    name: 'Dylan Moore',
    meta: 'Rising Fierce',
    project: 'Complete video sample for cold traffic ad',
  },
]

// Trustpilot-style green star tiles
function Stars() {
  return (
    <span className="flex gap-[2px]" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className="grid h-[19px] w-[19px] place-items-center bg-[#3f9a5c] text-[12px] leading-none text-white">
          ★
        </span>
      ))}
    </span>
  )
}

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

// Long quotes are clamped to a few lines with a "Read more" toggle, so every card stays compact
const LONG = 230

function ReviewCard({ r }: { r: Review }) {
  const [open, setOpen] = useState(false)
  const long = r.quote.length > LONG
  return (
    <figure
      data-anim="reveal"
      className="m-0 rounded-[14px] bg-[#f6f3df] p-5 text-[#14231b] shadow-[0_22px_45px_-24px_#000,0_0_0_1px_#ffffff14] transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1b3023] text-[13px] font-bold text-[#f4f1d6]">
          {initials(r.name)}
        </span>
        <div className="min-w-0">
          <Stars />
          <figcaption className="mt-[5px] truncate text-[13px] leading-tight">
            <b>{r.name}</b> <span className="text-[#5d6b60]">· {r.meta}</span>
          </figcaption>
        </div>
      </div>
      <blockquote className={`m-0 mt-3 text-[15px] leading-[1.6] text-[#1f2e25] ${long && !open ? 'line-clamp-5' : ''}`}>“{r.quote}”</blockquote>
      {long && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-1 cursor-pointer bg-transparent p-0 text-[13px] font-bold text-[#2f6e44] underline-offset-2 hover:underline"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
      <p className="mb-0 mt-3 text-[12px] font-bold uppercase tracking-[.08em] text-[#6f7d70]">{r.project}</p>
    </figure>
  )
}

// Hand-balanced so the three columns end at about the same height: two columns of three clamped
// (long) reviews, and one column of the four short ones.
const COLUMNS = [
  ['Michael DeCecco', 'Hatim Khan', 'Brandon Clark'],
  ['Daniel', 'Allan Badilla Gamboa', 'Timothy', 'Candida Gone'],
  ['Kamryn Peterson', 'Mighty Moose Nutrition', 'Dylan Moore'],
].map((names) => names.map((n) => REVIEWS.find((r) => r.name === n)!))

// Each column drifts at its own speed as the section scrolls by (Animations: data-parallax, desktop
// only); on phones the cards stack in one column and fade up one by one.
const DRIFT = [30, -40, 50]

export default function Reviews() {
  return (
    <section id="reviews" className={`${section} overflow-hidden`}>
      <SectionHead eyebrow="Client reviews" title="What clients say about working with us." sub="Real feedback from the people and brands we’ve worked with." />

      <div className="grid grid-cols-3 items-start gap-5 py-6 max-[1000px]:gap-4 max-[800px]:grid-cols-1 max-[800px]:py-0">
        {COLUMNS.map((col, i) => (
          <div key={i} data-parallax={DRIFT[i]} className="flex flex-col gap-5 max-[1000px]:gap-4">
            {col.map((r) => (
              <ReviewCard key={r.name} r={r} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
