'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { CASE_STUDIES, type CaseStudy } from './caseStudies'
import { useInquiry } from './Inquiry'
import { ArrowUpRight, btn, lockPageScroll, Rich, scrollModalToTop, Stars } from './ui'

function Avatar({ c, className }: { c: CaseStudy; className: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-[#f4f1d629] bg-[#1a2b20] font-bold tracking-[-.04em] ${className}`}>
      {c.photo ? <Image src={c.photo} alt="" fill sizes="96px" className="object-cover" /> : c.initials}
    </span>
  )
}

// Case-study sheet, matching the policies dialog (Liquid Glass, tinted dark for reading)
function CaseStudyDialog({ dialogRef, study }: { dialogRef: React.RefObject<HTMLDialogElement | null>; study: CaseStudy }) {
  const { setTopic } = useInquiry()
  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="case-title"
      onClose={() => lockPageScroll(false)}
      onClick={(e) => e.target === e.currentTarget && close()}
      style={{ '--glass-dark': 0.88 } as React.CSSProperties}
      className="hq-glass m-auto h-[min(86dvh,860px)] w-[min(820px,calc(100%-32px))] overflow-hidden rounded-[24px] p-0 text-[#f4f1d6] backdrop:bg-[#0c181499] backdrop:backdrop-blur-[6px]"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-[#f4f1d61c] px-7 py-4 max-[800px]:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar c={study} className="h-10 w-10 text-[14px]" />
            <p className="m-0 truncate text-[12px] font-bold uppercase tracking-[.16em] text-[#8fa18f]">Case study</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close case study"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-[#f4f1d629] bg-transparent text-[18px] text-[#a9b7a7] transition-[color,border-color,transform,translate,scale,rotate] duration-300 hover:rotate-90 hover:border-[#f4f1d670] hover:text-[#f4f1d6]"
          >
            ×
          </button>
        </div>

        <div data-modal-scroll className="flex-1 overflow-y-auto overscroll-contain px-9 pb-12 pt-8 max-[800px]:px-5">
          <h2 id="case-title" className="m-0 text-[clamp(26px,3.6vw,34px)] font-extrabold leading-[1.1] tracking-[-.04em]">
            {study.title}
          </h2>
          <p className="mb-0 mt-3 text-[13px] leading-[1.6] text-[#9eafa0]">{study.services}</p>
          <p className="mb-0 mt-7 max-w-[640px] text-[22px] font-bold leading-[1.3] tracking-[-.03em] text-[#f3e38a] max-[800px]:text-[20px]">
            {study.headline}
          </p>
          <p className="mb-0 mt-4 max-w-[660px] text-[16px] leading-[1.7] text-[#c9d2c2]">{study.intro}</p>

          {study.sections.map((section) => (
            <section key={section.heading} className="mt-9 border-t border-[#f4f1d614] pt-7">
              <h3 className="m-0 text-[17px] font-bold tracking-[-.02em]">{section.heading}</h3>
              {section.body.map((item, i) =>
                typeof item === 'string' ? (
                  <p key={i} className="mb-0 mt-3 max-w-[660px] text-[15px] leading-[1.75] text-[#aebaa9]">
                    <Rich text={item} />
                  </p>
                ) : (
                  <ul key={i} className="mb-0 mt-3 max-w-[660px] list-none space-y-2 p-0">
                    {item.map((li) => (
                      <li key={li} className="relative pl-5 text-[15px] leading-[1.7] text-[#aebaa9]">
                        <span aria-hidden="true" className="absolute left-0 top-[.7em] h-[5px] w-[5px] rounded-full bg-[#f3e38a]" />
                        <Rich text={li} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}

          {study.quote && (
            <section className="mt-9 border-t border-[#f4f1d614] pt-7">
              <h3 className="m-0 text-[17px] font-bold tracking-[-.02em]">{study.quote.heading}</h3>
              <figure className="m-0 mt-4 rounded-[18px] border border-[#f4f1d61f] bg-[#f4f1d608] p-6 max-[800px]:p-5">
                <Stars label="5.0 / 5" />
                <blockquote className="m-0 mt-3 text-[16px] leading-[1.7] text-[#dfe3d0]">“{study.quote.text}”</blockquote>
                <figcaption className="mt-4 text-[14px] font-bold">— {study.quote.author}</figcaption>
              </figure>
            </section>
          )}

          {study.links && (
            <section className="mt-9 border-t border-[#f4f1d614] pt-7">
              <h3 className="m-0 text-[17px] font-bold tracking-[-.02em]">{study.links.heading}</h3>
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                {study.links.items.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-[#f4f1d62e] bg-[#f4f1d608] px-4 py-2 text-[14px] font-bold text-[#f4f1d6] transition-[border-color,background-color] duration-300 hover:border-[#f4f1d670] hover:bg-[#f4f1d612]"
                    >
                      {l.label}
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"><ArrowUpRight /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <a
            href="#inquiry"
            onClick={() => {
              setTopic('Help me choose')
              close()
            }}
            className={`${btn()} mt-10`}
          >
            Discuss your project <span><ArrowUpRight /></span>
          </a>
        </div>
      </div>
    </dialog>
  )
}

export default function Clients() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState(CASE_STUDIES[0])

  const open = (study: CaseStudy) => {
    setActive(study)
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    scrollModalToTop(dialog)
    lockPageScroll(true)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(dialog, { autoAlpha: 0, y: 24, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform' })
    }
  }

  return (
    <section aria-labelledby="clients-title" className="pb-14 pt-16 max-[800px]:py-[45px]">
      <h2 data-anim="reveal" id="clients-title" className="mb-8 mt-0 text-center text-[24px] font-bold leading-[1.15] tracking-[-.045em]">
        A few of the people we’ve worked with.
      </h2>
      <ul className="m-0 flex list-none flex-wrap justify-center gap-x-[52px] gap-y-8 p-0 max-[800px]:flex-nowrap max-[800px]:justify-start max-[800px]:gap-[26px] max-[800px]:overflow-x-auto max-[800px]:pb-[14px]">
        {CASE_STUDIES.map((c) => (
          <li key={c.id} data-anim="reveal" className="max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:flex-1">
            <button
              type="button"
              onClick={() => open(c)}
              aria-label={`Read the ${c.name} case study`}
              className="group flex w-full cursor-pointer flex-col items-center gap-[10px] bg-transparent text-center text-[#f4f1d6]"
            >
              <Avatar
                c={c}
                className="h-[86px] w-[86px] text-[26px] transition-[transform,translate,scale,rotate,border-color,background-color,box-shadow] duration-300 ease-out group-hover:scale-105 group-hover:border-[#f3e38a90] group-hover:bg-[#213528] group-hover:shadow-[0_0_30px_-8px_#f3e38a60] motion-reduce:transition-none max-[800px]:h-[72px] max-[800px]:w-[72px]"
              />
              <strong className="text-[15px]">{c.name}</strong>
              <small className="text-[14px] text-[#9eafa0]">{c.role}</small>
              <span className="text-[12px] font-bold text-[#c9d2a6] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-[800px]:opacity-100">
                Read case study <ArrowUpRight />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <CaseStudyDialog dialogRef={dialogRef} study={active} />
    </section>
  )
}
