'use client'

import { useRef, useState } from 'react'

// Placeholders until the approved policies are supplied (see chatgpt/LAUNCH_CHECKLIST.md).
// Shown in a dialog so the site stays a single page.
const POLICIES = [
  {
    title: 'Terms & Conditions',
    kind: 'terms & conditions',
    handoff: 'Approved legal entity details; service scope; payment and renewal terms; delivery and revisions; intellectual property; termination and applicable law.',
  },
  {
    title: 'Privacy Policy',
    kind: 'privacy policy',
    handoff: 'Business contact; inquiry data collected; actual form, email, analytics and payment providers; retention; sharing; privacy requests and applicable rights.',
  },
  {
    title: 'Refund & Cancellation Policy',
    kind: 'refund & cancellation policy',
    handoff: 'Actual cancellation notice period; recurring billing rules; work already completed; refund eligibility; request process and contact address.',
  },
]

const colLink = 'mb-3 block text-[14px] text-[#bac6b5]'
const colHead = 'mb-[19px] mt-0 text-[15px] font-bold leading-[1.25] tracking-[-.025em]'
const colText = 'text-[14px] not-italic leading-[1.7] text-[#a9b7a7]'

export default function Footer() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [policy, setPolicy] = useState(POLICIES[0])

  const openPolicy = (p: (typeof POLICIES)[number]) => {
    setPolicy(p)
    dialogRef.current?.showModal()
  }

  return (
    <footer className="pb-[25px] pt-[65px]">
      <div className="grid grid-cols-[1.3fr_.7fr_1fr_1fr] gap-8 max-[800px]:grid-cols-2 max-[800px]:gap-x-[22px] max-[800px]:gap-y-[30px] max-[420px]:grid-cols-1">
        <div className="max-[800px]:col-span-full">
          <a href="#top" className="flex items-center gap-[10px] text-[14px] font-bold tracking-[.04em] max-[800px]:text-[11px]">WAGMI HQ LLC</a>
          <p className={`${colText} my-[14px] max-w-[260px]`}>
            Content strategy, video production and distribution. Organic content and paid creative built around your
            business.
          </p>
        </div>
        <div>
          <h3 className={colHead}>Explore</h3>
          <a href="#about" className={colLink}>About</a>
          <a href="#work" className={colLink}>Work</a>
          <a href="#packages" className={colLink}>Packages</a>
          <a href="#careers" className={colLink}>Careers</a>
          <a href="#inquiry" className={colLink}>Contact</a>
        </div>
        <div>
          <h3 className={colHead}>Contact</h3>
          <a href="mailto:aghasaad@wagmihq.com" className={colLink}>aghasaad@wagmihq.com</a>
          <p className={`${colText} my-[14px]`}>Mailing address</p>
          <address className={colText}>
            1001 S. Main St. #12995
            <br />
            Kalispell, MT 59901
          </address>
        </div>
        <div>
          <h3 className={colHead}>Policies</h3>
          {POLICIES.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => openPolicy(p)}
              className={`${colLink} cursor-pointer bg-transparent p-0 text-left`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9 flex justify-between gap-5 border-t border-[#f4f1d621] pt-[22px] text-[13px] text-[#a9b7a7] max-[800px]:flex-col">
        <span>© 2026 WAGMI HQ LLC. All rights reserved.</span>
        <a href="#top">Back to top ↑</a>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(750px,calc(100%-32px))] rounded-[20px] border border-[#f4f1d633] bg-[#0c1814] p-0 text-[17px] leading-[1.7] text-[#f4f1d6] backdrop:bg-[#0c1814cc] backdrop:backdrop-blur-sm"
      >
        <div className="p-6">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="cursor-pointer bg-transparent p-0 text-[#f4f1d6] underline"
          >
            ← WAGMI HQ LLC
          </button>
          <h1 className="my-[22px] text-[34px] font-bold leading-[1.2]">{policy.title}</h1>
          <div className="rounded-2xl border border-[#f4f1d633] p-[25px] text-[#bcc8b5]">
            <strong>Policy content to be inserted.</strong>
            <p className="my-[17px]">
              This page is reserved for the approved {policy.kind} of WAGMI HQ LLC. It is not a completed policy.
            </p>
            <p className="my-[17px]">Developer handoff: {policy.handoff}</p>
          </div>
        </div>
      </dialog>
    </footer>
  )
}
