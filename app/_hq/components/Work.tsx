'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, cardMotion, Mark, section, SectionHead } from './ui'

// VSL samples (YouTube IDs), shown in a slider
const VSLS = ['R0kNKu-I0IM', '8fIWZ6C0bEo', 'VKievNGvRYo', 'SA-3oKS99Ag', '6MCMYCFzA9Q', 'HMzyTo-Q7UI']

// Paid creative first, then VSLs, organic last. Paid and organic samples are still to come.
const TABS = [
  {
    id: 'paid',
    label: 'Paid creatives',
    items: [
      ['Core creative + hook variations', '[Insert approved paid creative sample]'],
      ['A new angle on the same offer', '[Insert approved paid creative sample]'],
    ],
  },
  {
    id: 'vsl',
    label: 'VSLs',
    items: [],
  },
  {
    id: 'organic',
    label: 'Organic content',
    items: [
      ['Brandon Clark', 'Retirement education · Video editing'],
      ['Timeless Protection', 'Insurance education · Planning and publishing'],
      ['Jonathan Catliff', 'AI education · Content and community setup'],
    ],
  },
]

// A YouTube video that shows only its thumbnail until clicked, so six embeds don't load up front
function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video overflow-hidden bg-[#0c1814]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" aria-label={`Play ${title}`} onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full cursor-pointer">
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 800px) 85vw, 440px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <span className="absolute inset-0 bg-[#0c1814]/25 transition-colors group-hover:bg-[#0c1814]/5" />
          <span
            style={{ '--glass-dark': 0.12, '--glow': 1, '--gx': 22, '--gy': 12 } as React.CSSProperties}
            className="hq-glass absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
          >
            <Mark className="ml-0.5 block h-8 w-8 drop-shadow-[0_2px_8px_#0c181499]" />
          </span>
        </button>
      )}
    </div>
  )
}

function VslSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    const card = track?.querySelector('article')
    if (!track || !card) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: reduce ? 'auto' : 'smooth' })
  }
  const arrow =
    'grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[#f4f1d62e] bg-[#13221a] text-[18px] text-[#f4f1d6] transition-[border-color,background-color,transform,translate,scale,rotate] duration-300 hover:-translate-y-0.5 hover:border-[#f4f1d670] hover:bg-[#1b3023]'

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="VSL samples"
        tabIndex={0}
        className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:thin] motion-reduce:scroll-auto"
      >
        {VSLS.map((id, i) => (
          <article
            key={id}
            data-anim="reveal"
            className="w-[calc((100%-40px)/2.4)] shrink-0 snap-start overflow-hidden rounded-[18px] border border-[#f4f1d619] bg-[#13221a] max-[1000px]:w-[calc((100%-20px)/1.6)] max-[800px]:w-[86%]"
          >
            <LiteYouTube id={id} title={`VSL sample ${i + 1}`} />
            <div className="flex items-center justify-between px-5 py-4 text-[14px]">
              <span className="font-bold">VSL sample {String(i + 1).padStart(2, '0')}</span>
              <span className="text-[#9eafa0]">From the problem to your offer</span>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-3">
        <button type="button" aria-label="Previous VSL" onClick={() => scrollBy(-1)} className={arrow}><ArrowLeft /></button>
        <button type="button" aria-label="Next VSL" onClick={() => scrollBy(1)} className={arrow}><ArrowRight /></button>
      </div>
    </div>
  )
}

export default function Work() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelsRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  // Stagger the newly shown cards in on tab change (the initial reveal is handled by Animations)
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        `#panel-${TABS[active].id} article`,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', clearProps: 'transform' },
      )
    },
    { dependencies: [active], scope: panelsRef },
  )

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = TABS.length
    const next =
      e.key === 'ArrowRight' ? (i + 1) % n
      : e.key === 'ArrowLeft' ? (i + n - 1) % n
      : e.key === 'Home' ? 0
      : e.key === 'End' ? n - 1
      : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="work" className={section}>
      <SectionHead eyebrow="Selected work" title="What we deliver." sub="See the kind of work behind the offer." />

      <div data-anim="reveal" role="tablist" aria-label="Work categories" className="mb-6 flex flex-wrap gap-[10px]">
        {TABS.map((t, i) => {
          const on = i === active
          return (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[i] = el }}
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`cursor-pointer rounded-[30px] border border-[#f4f1d62a] px-[18px] py-[10px] text-[14px] transition-colors duration-300 ${
                on ? 'bg-[#f4f1d6] text-[#0c1814]' : 'bg-transparent text-[#b8c5b3] hover:border-[#f4f1d660] hover:text-[#f4f1d6]'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div ref={panelsRef}>
        {TABS.map((t, i) => (
          t.id === 'vsl' ? (
            <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={i !== active}>
              <VslSlider />
            </div>
          ) : (
            <div
              key={t.id}
              id={`panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${t.id}`}
              hidden={i !== active}
              // 1–4 cards share one full-width row (5+ wrap, 4 per row); 4 cards become 2×2 on tablets
              style={
                {
                  '--cols': Math.min(t.items.length, 4),
                  '--cols-md': t.items.length >= 4 ? 2 : t.items.length,
                } as React.CSSProperties
              }
              className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-5 max-[1000px]:grid-cols-[repeat(var(--cols-md),minmax(0,1fr))] max-[800px]:grid-cols-1"
            >
              {t.items.map(([title, body]) => (
                <article
                  key={title}
                  data-anim="reveal"
                  className={`${cardMotion} overflow-hidden rounded-[18px] border border-[#f4f1d619] bg-[#13221a] hover:border-[#f4f1d645]`}
                >
                  <div className="min-h-[125px] p-5">
                    <h3 className="mb-[7px] mt-0 text-[17px] font-bold leading-[1.25] tracking-[-.025em]">{title}</h3>
                    <p className="m-0 text-[14px] leading-[1.65] text-[#9eafa0]">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          )
        ))}
      </div>
    </section>
  )
}
