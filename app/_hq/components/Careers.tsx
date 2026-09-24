'use client'

import { createContext, useCallback, useContext, useRef } from 'react'
import gsap from 'gsap'
import { Eyebrow, btn, h2, lockPageScroll } from './ui'
import { useSendForm } from './useSendForm'

const ROLES = ['Content strategy', 'Video editing', 'Creative production', 'Something else'] as const

const CareersContext = createContext<() => void>(() => {})

// Opens the careers modal from anywhere (nav, mobile menu, footer)
export const useOpenCareers = () => useContext(CareersContext)

const field = 'flex flex-col gap-[7px]'
const label = 'text-[14px] text-[#bdc8b8]'
const input =
  'w-full rounded-[10px] border border-[#f4f1d628] bg-[#15241b] p-3 text-[16px] text-[#f4f1d6] outline-none transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#f4f1d645] focus:border-[#c1cbb1] focus:bg-[#182a1f] focus:shadow-[0_0_0_4px_#c1cbb114]'

export function CareersProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { state, error, send, reset } = useSendForm('careers')

  const open = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    reset()
    dialog.showModal()
    lockPageScroll(true)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(dialog, { autoAlpha: 0, y: 28, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', clearProps: 'transform' })
      gsap.fromTo(
        dialog.querySelectorAll('[data-stagger]'),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, delay: 0.12, ease: 'power3.out', clearProps: 'transform' },
      )
    }
  }, [reset])

  const close = () => dialogRef.current?.close()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    send(e.currentTarget)
  }

  return (
    <CareersContext.Provider value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="careers-title"
        onClose={() => lockPageScroll(false)}
        onClick={(e) => e.target === e.currentTarget && close()}
        // Liquid Glass sheet, tinted dark enough that the form stays easy to read
        style={{ '--glass-dark': 0.86 } as React.CSSProperties}
        className="hq-glass m-auto max-h-[calc(100dvh-32px)] w-[min(640px,calc(100%-32px))] overflow-hidden rounded-[24px] p-0 text-[#f4f1d6] backdrop:bg-[#0c181499] backdrop:backdrop-blur-[6px]"
      >
        <div className="relative max-h-[calc(100dvh-32px)] overflow-y-auto overscroll-contain p-9 max-[800px]:p-6">
          <button
            type="button"
            onClick={close}
            aria-label="Close careers"
            className="absolute right-5 top-5 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[#f4f1d629] bg-transparent text-[18px] text-[#a9b7a7] transition-[color,border-color,transform] duration-300 hover:rotate-90 hover:border-[#f4f1d670] hover:text-[#f4f1d6]"
          >
            ×
          </button>

          <div data-stagger>
            <Eyebrow className="mb-[14px]">Careers</Eyebrow>
            <h2 id="careers-title" className={h2}>Work with WAGMI.</h2>
          </div>
          <p data-stagger className="mb-0 mt-4 text-[#b8c5b3]">Content strategy. Video editing. Creative production.</p>
          <p data-stagger className="mb-7 mt-1 text-[#b8c5b3]">Tell us what you do and share your work.</p>

          <form onSubmit={onSubmit} onInput={() => state === 'sent' && reset()} className="grid grid-cols-2 gap-[17px] max-[800px]:grid-cols-1">
            <div data-stagger className={field}>
              <label htmlFor="c-name" className={label}>Name</label>
              <input id="c-name" name="name" autoComplete="name" required className={input} />
            </div>
            <div data-stagger className={field}>
              <label htmlFor="c-email" className={label}>Email</label>
              <input id="c-email" name="email" type="email" autoComplete="email" required className={input} />
            </div>
            <div data-stagger className={`${field} col-span-full`}>
              <label htmlFor="c-role" className={label}>What do you do?</label>
              <select id="c-role" name="role" className={input}>
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div data-stagger className={`${field} col-span-full`}>
              <label htmlFor="c-portfolio" className={label}>Link to your work</label>
              <input id="c-portfolio" name="portfolio" placeholder="Portfolio, Drive folder, YouTube…" required className={input} />
            </div>
            <div data-stagger className={`${field} col-span-full`}>
              <label htmlFor="c-about" className={label}>Tell us about yourself</label>
              <textarea id="c-about" name="message" required className={`${input} min-h-[90px] resize-y`} />
            </div>
            <button
              data-stagger
              type="submit"
              disabled={state === 'sending'}
              className={`${btn()} col-span-full cursor-pointer disabled:cursor-wait disabled:opacity-60`}
            >
              {state === 'sending' ? 'Sending…' : 'Send application'} <span>↗</span>
            </button>
            <p role="status" className={`col-span-full m-0 text-[14px] ${state === 'error' ? 'text-[#e8a99a]' : 'text-[#c5d0ba]'}`}>
              {state === 'sent' && 'Thanks — your application has been sent. We’ll be in touch if there’s a fit.'}
              {state === 'error' && error}
            </p>
          </form>
        </div>
      </dialog>
    </CareersContext.Provider>
  )
}
