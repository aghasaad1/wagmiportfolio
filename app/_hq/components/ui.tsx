import { LuArrowDown, LuArrowLeft, LuArrowRight, LuArrowUp, LuArrowUpRight } from 'react-icons/lu'
import { RiStarFill } from 'react-icons/ri'

// Size classes are kept apart from the look so callers can swap them without
// two conflicting utilities (Tailwind picks by stylesheet order, not class order).
const btnSizeDefault = 'gap-[22px] rounded-[12px] px-5 py-[13px] text-[14px]'

// Lift on hover, press on click, and the arrow icon (in the <span>) nudges toward its direction
const btnMotion =
  'transition-[transform,translate,scale,rotate,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 [&>span]:inline-block [&>span]:transition-transform [&>span]:duration-300 hover:[&>span]:translate-x-[3px] hover:[&>span]:-translate-y-[3px]'

export const btn = (size = btnSizeDefault) =>
  `inline-flex items-center justify-center border font-bold border-[#f4f1d6] bg-[#f4f1d6] text-[#0c1814] hover:bg-[#fffbe3] hover:shadow-[0_10px_28px_-12px_#f4f1d680] ${btnMotion} ${size}`
export const btnGhost = (size = btnSizeDefault) =>
  `inline-flex items-center justify-center border font-bold border-[#f4f1d635] bg-transparent text-[#f4f1d6] hover:border-[#f4f1d680] hover:bg-[#f4f1d60d] ${btnMotion} ${size}`

// Cards lift slightly and their border brightens on hover
export const cardMotion =
  'transition-[transform,translate,scale,rotate,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_45px_-24px_#000] motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export const h2 = 'm-0 text-[clamp(29px,3.5vw,43px)] font-bold leading-[1.15] tracking-[-.045em]'
export const h3 = 'font-bold leading-[1.25] tracking-[-.025em]'

export const section = 'scroll-mt-5 border-b border-[#f4f1d613] py-[82px] max-[800px]:py-[57px]'

// <summary> with the +/− marker; the parent <details> needs the `group` class
export const summary =
  "flex cursor-pointer list-none items-center justify-between gap-[25px] [&::-webkit-details-marker]:hidden after:text-[23px] after:font-normal after:text-[#95a68d] after:content-['+'] group-open:after:content-['−']"

// Light-yellow accent used to highlight key words (marker sweep behind dark text)
export const ACCENT = '#f3e38a'

// Small Liquid Glass pill link (e.g. "Not sure where to start?"); pair with a positioned element
export const glassPill =
  'hq-glass relative inline-flex items-center gap-2 rounded-full px-[18px] py-[10px] text-[14px] font-bold text-[#f4f1d6] transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 [&>span]:inline-block [&>span]:transition-transform [&>span]:duration-300 hover:[&>span]:translate-x-[3px] hover:[&>span]:-translate-y-[3px]'

type Anim = 'intro' | 'reveal'

export function Eyebrow({ className = 'mb-[23px]', anim, children }: { className?: string; anim?: Anim; children: React.ReactNode }) {
  return (
    <div data-anim={anim} className={`text-[14px] font-bold uppercase tracking-[.16em] text-[#aab6aa] ${className}`}>
      {children}
    </div>
  )
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-[30px] flex items-end justify-between gap-5 max-[800px]:flex-wrap max-[800px]:items-start">
      <div data-anim="reveal">
        <Eyebrow className="mb-[14px]">{eyebrow}</Eyebrow>
        <h2 className={h2}>{title}</h2>
        {sub && <p className="mb-0 mt-[10px] text-[#9eafa0]">{sub}</p>}
      </div>
    </div>
  )
}

// A word or phrase with the accent marker swept behind it. Animations animates [data-highlight-bg]
// (hero on load, the About statement with scroll); without JS it simply shows highlighted.
export function Highlight({ children, className = '', ...rest }: { children: React.ReactNode; className?: string; 'data-word'?: boolean; 'data-highlight'?: boolean }) {
  return (
    <span {...rest} className={`relative isolate inline-block px-[.12em] text-[#0c1814] ${className}`}>
      <span
        data-highlight-bg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[.06em] top-[.14em] -z-10 origin-left rounded-[.14em] bg-[#f3e38a] shadow-[0_0_40px_-6px_#f3e38a80]"
      />
      {children}
    </span>
  )
}

// Renders **bold** runs inside copy strings (packages, policies, case studies)
export function Rich({ text, boldClass = 'font-bold text-[#f4f1d6]' }: { text: string; boldClass?: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <b key={i} className={boldClass}>{part.slice(2, -2)}</b>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function Mark({ className }: { className: string }) {
  return <span aria-hidden="true" className={`hq-mark ${className}`} />
}

// Every modal opens scrolled to the top. Its scrolling area is marked data-modal-scroll; reset it now
// and again next frame, after React has rendered the new content and showModal's autofocus has run.
export function scrollModalToTop(dialog: HTMLDialogElement) {
  const reset = () => dialog.querySelectorAll<HTMLElement>('[data-modal-scroll]').forEach((el) => (el.scrollTop = 0))
  reset()
  requestAnimationFrame(reset)
}

// Arrow icons as SVG (the ↗ text glyph renders as an emoji on iPhone). Sized to the surrounding text.
const iconClass = 'inline-block h-[1em] w-[1em] shrink-0 align-[-0.125em]'
export const ArrowUpRight = () => <LuArrowUpRight aria-hidden="true" className={iconClass} />
export const ArrowUp = () => <LuArrowUp aria-hidden="true" className={iconClass} />
export const ArrowDown = () => <LuArrowDown aria-hidden="true" className={iconClass} />
export const ArrowLeft = () => <LuArrowLeft aria-hidden="true" className={iconClass} />
export const ArrowRight = () => <LuArrowRight aria-hidden="true" className={iconClass} />

// Five filled stars in the accent yellow, with the score beside them (reviews, case studies)
export function Stars({ label = '5.0' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-[2px] text-[15px] text-[#f3e38a] drop-shadow-[0_0_6px_#f3e38a40]" role="img" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }, (_, i) => (
          <RiStarFill key={i} aria-hidden="true" />
        ))}
      </span>
      <span className="text-[12px] font-bold text-[#d9dcc4]">{label}</span>
    </span>
  )
}

// Stops the page behind an open modal from scrolling
export function lockPageScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
