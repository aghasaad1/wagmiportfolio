'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SectionHead, cardMotion, section } from './ui'

const TABS = [
  {
    id: 'organic',
    label: 'Organic content',
    items: [
      ['Brandon Clark', 'Retirement education · Video editing'],
      ['Timeless Protection', 'Insurance education · Planning and publishing'],
      ['Jonathan Catliff', 'AI education · Content and community setup'],
    ],
  },
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
    items: [['From the problem to your offer', '[Insert approved VSL excerpt]']],
  },
]

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
        ))}
      </div>
    </section>
  )
}
