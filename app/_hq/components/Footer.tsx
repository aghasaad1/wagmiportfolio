'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useOpenCareers } from './Careers'
import { Mark, lockPageScroll } from './ui'
import PolicyDialog from './PolicyDialog'
import { POLICIES, type Policy } from './policies'

// Links get an underline that slides in from the left on hover
const colLink =
  "relative mb-3 block w-fit text-[14px] text-[#bac6b5] transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:content-[''] hover:text-[#f4f1d6] hover:after:scale-x-100"
const colHead = 'mb-[19px] mt-0 text-[12px] font-bold uppercase leading-[1.25] tracking-[.16em] text-[#8fa18f]'
const colText = 'text-[14px] not-italic leading-[1.7] text-[#a9b7a7]'

export default function Footer() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [policy, setPolicy] = useState<Policy['id']>('terms')
  const openCareers = useOpenCareers()

  const openPolicy = (id: Policy['id']) => {
    setPolicy(id)
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    lockPageScroll(true)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(dialog, { autoAlpha: 0, y: 24, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform' })
    }
  }

  return (
    <footer className="relative pt-16 max-[800px]:pt-12">
      <div className="grid grid-cols-[1.5fr_.7fr_1fr_1fr] gap-10 max-[800px]:grid-cols-2 max-[800px]:gap-x-[22px] max-[800px]:gap-y-9 max-[420px]:grid-cols-1">
        <div data-anim="reveal" className="max-[800px]:col-span-full">
          <a href="#top" className="flex w-fit items-center gap-[10px] text-[15px] font-bold tracking-[.02em]">
            <Mark className="h-8 w-8" />
            WAGMI HQ LLC
          </a>
          <p className={`${colText} mb-5 mt-4 max-w-[300px]`}>
            Content strategy, video production and distribution. Organic content and paid creative built around your
            business.
          </p>
          <a
            href="mailto:aghasaad@wagmihq.com"
            className="group inline-flex items-center gap-2 rounded-full border border-[#f4f1d62e] bg-[#f4f1d608] px-4 py-2 text-[14px] font-bold text-[#f4f1d6] transition-[border-color,background-color] duration-300 hover:border-[#f4f1d670] hover:bg-[#f4f1d612]"
          >
            aghasaad@wagmihq.com
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]">↗</span>
          </a>
        </div>
        <div data-anim="reveal">
          <h3 className={colHead}>Explore</h3>
          <a href="#about" className={colLink}>About</a>
          <a href="#work" className={colLink}>Work</a>
          <a href="#packages" className={colLink}>Packages</a>
          <button type="button" onClick={openCareers} className={`${colLink} cursor-pointer bg-transparent p-0 text-left`}>
            Careers
          </button>
          <a href="#inquiry" className={colLink}>Contact</a>
        </div>
        <div data-anim="reveal">
          <h3 className={colHead}>Mailing address</h3>
          <address className={colText}>
            WAGMI HQ LLC
            <br />
            1001 S. Main St. #12995
            <br />
            Kalispell, MT 59901
          </address>
        </div>
        <div data-anim="reveal">
          <h3 className={colHead}>Policies</h3>
          {POLICIES.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => openPolicy(p.id)}
              className={`${colLink} cursor-pointer bg-transparent p-0 text-left`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div data-anim="reveal" className="mt-14 flex items-center justify-between gap-5 border-t border-[#f4f1d61c] pt-6 text-[13px] text-[#a9b7a7] max-[800px]:mt-10">
        <span>© 2026 WAGMI HQ LLC. All rights reserved.</span>
        <a
          href="#top"
          aria-label="Back to top"
          style={{ '--gx': 14, '--gy': 6 } as React.CSSProperties}
          className="hq-glass group relative grid h-12 w-12 shrink-0 place-items-center rounded-full text-[16px] text-[#f4f1d6] transition-transform duration-300 hover:scale-110 hover:[--glow:1]"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[3px]">↑</span>
        </a>
      </div>

      {/* Oversized wordmark, cropped at the page edge */}
      <div aria-hidden="true" className="mt-6 overflow-hidden">
        <div
          data-anim="reveal"
          className="translate-y-[18%] select-none text-center text-[clamp(96px,24.5vw,318px)] font-extrabold leading-[.8] tracking-[-.07em] text-transparent [background-clip:text] bg-[linear-gradient(180deg,#f4f1d62e_10%,#f4f1d605_85%)]"
        >
          WAGMI
        </div>
      </div>

      <PolicyDialog dialogRef={dialogRef} active={policy} onSelect={setPolicy} />
    </footer>
  )
}
