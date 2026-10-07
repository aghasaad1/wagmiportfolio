'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Mark, btn } from './ui'
import { useOpenCareers } from './Careers'
import { useGlassHighlight } from './Glass'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#packages', label: 'Packages' },
  { href: '#process', label: 'How it works' },
]

// Three bars that fold into an X in two steps: the outer bars slide together (the middle one shrinks
// away), then rotate. Closing plays it backwards. Delays are per property, in this order:
// translate, rotate, scale, opacity.
const bar =
  'absolute left-[11px] h-[1.5px] w-[18px] rounded-full bg-current [transition-property:translate,rotate,scale,opacity] duration-[220ms] ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none'
const STEP = '170ms'
const outerDelay = (open: boolean) => ({ transitionDelay: open ? `0ms,${STEP},0ms,0ms` : `${STEP},0ms,0ms,0ms` })
const middleDelay = (open: boolean) => ({ transitionDelay: open ? '0ms' : `0ms,0ms,${STEP},${STEP}` })

// Menu entries fade and drop in one after another once the panel opens
const stagger = (open: boolean, i: number) => ({ transitionDelay: open ? `${90 + i * 45}ms` : '0ms' })
const itemMotion = (open: boolean) =>
  `transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0'}`

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const openCareers = useOpenCareers()
  const glassRef = useGlassHighlight<HTMLElement>()

  // Escape or a tap outside the nav closes the phone menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    const onDown = (e: PointerEvent) => !glassRef.current?.contains(e.target as Node) && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [menuOpen, glassRef])

  const close = () => setMenuOpen(false)
  const item = 'flex min-h-[44px] items-center rounded-lg p-3 text-[15px] transition-colors hover:bg-[#f4f1d60a]'

  return (
    <header
      ref={glassRef}
      data-anim="nav"
      // Darker glass tint than the default so nav text stays legible over light content scrolling beneath
      style={{ '--glass-dark': 0.55 } as React.CSSProperties}
      className="hq-glass sticky top-4 z-10 mx-auto mt-4 flex min-h-[60px] w-fit max-w-[calc(100%-24px)] items-center justify-start gap-[26px] rounded-[17px] px-[14px] py-[9px] max-[800px]:top-3 max-[800px]:mt-3 max-[800px]:min-h-[56px] max-[800px]:w-[calc(100%-24px)] max-[800px]:justify-between max-[800px]:py-2 max-[800px]:pl-3 max-[800px]:pr-2"
    >
      <a
        href="#top"
        aria-label="WAGMI HQ LLC home"
        className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[14px] font-bold tracking-[.01em] max-[800px]:gap-[7px] max-[800px]:text-[13px]"
      >
        <Mark className="h-8 w-8 shrink-0 max-[800px]:h-[26px] max-[800px]:w-[26px]" />
        <span>WAGMI HQ LLC</span>
      </a>

      <nav aria-label="Main navigation" className="flex items-center gap-[21px] whitespace-nowrap text-[13px] text-[#b8c1b7] max-[800px]:hidden">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="transition-colors duration-200 hover:text-[#f4f1d6]">{l.label}</a>
        ))}
        <button type="button" onClick={openCareers} className="cursor-pointer bg-transparent p-0 transition-colors duration-200 hover:text-[#f4f1d6]">
          Careers
        </button>
      </nav>

      <a
        href="#inquiry"
        className={`${btn('gap-3 rounded-[10px] px-[14px] py-[10px] text-[13px]')} shrink-0 whitespace-nowrap max-[800px]:hidden`}
      >
        Request a call <span><ArrowUpRight /></span>
      </a>

      {/* Phones: hamburger only; the links and the call button live in the dropdown */}
      <button
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((o) => !o)}
        className="relative hidden h-10 w-10 shrink-0 cursor-pointer rounded-[10px] bg-transparent text-[#f4f1d6] transition-[background-color,scale] duration-200 hover:bg-[#f4f1d60d] active:scale-90 max-[800px]:block"
      >
        <span aria-hidden="true" style={outerDelay(menuOpen)} className={`${bar} top-[14px] ${menuOpen ? 'translate-y-[5.25px] rotate-45' : ''}`} />
        <span aria-hidden="true" style={middleDelay(menuOpen)} className={`${bar} top-[19.25px] ${menuOpen ? 'scale-x-0 opacity-0' : ''}`} />
        <span aria-hidden="true" style={outerDelay(menuOpen)} className={`${bar} top-[24.5px] ${menuOpen ? '-translate-y-[5.25px] -rotate-45' : ''}`} />
      </button>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        // Solid rather than Liquid Glass: a glass panel nested inside the nav's own backdrop-filter can't
        // blur the page, so page text showed through sharply behind the links
        className={`absolute inset-x-0 top-[calc(100%+10px)] hidden origin-top flex-col rounded-[16px] border border-[#f4f1d624] bg-[linear-gradient(160deg,#1a2e23,#0f1d17_55%)] p-[10px] shadow-[inset_0_1px_0_#ffffff1f,0_24px_50px_-18px_#000] transition-[opacity,transform,translate,scale,rotate,visibility] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none max-[800px]:flex ${
          menuOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-[.98] opacity-0'
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={close} style={stagger(menuOpen, i)} className={`${item} ${itemMotion(menuOpen)}`}>
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              close()
              openCareers()
            }}
            style={stagger(menuOpen, LINKS.length)}
            className={`${item} ${itemMotion(menuOpen)} cursor-pointer bg-transparent text-left`}
          >
            Careers
          </button>
        </nav>
        {/* Wrapper carries the stagger so it doesn't fight the button's own hover transition */}
        <div style={stagger(menuOpen, LINKS.length + 1)} className={`mt-2 ${itemMotion(menuOpen)}`}>
          <a href="#inquiry" onClick={close} className={`${btn()} w-full`}>
            Request a call <span><ArrowUpRight /></span>
          </a>
        </div>
      </div>
    </header>
  )
}
