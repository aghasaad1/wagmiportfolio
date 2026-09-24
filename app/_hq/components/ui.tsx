// Size classes are kept apart from the look so callers can swap them without
// two conflicting utilities (Tailwind picks by stylesheet order, not class order).
const btnSizeDefault = 'gap-[22px] rounded-[12px] px-5 py-[13px] text-[14px]'

// Lift on hover, press on click, and the ↗ arrow (the <span>) nudges toward its direction
const btnMotion =
  'transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 [&>span]:inline-block [&>span]:transition-transform [&>span]:duration-300 hover:[&>span]:translate-x-[3px] hover:[&>span]:-translate-y-[3px]'

export const btn = (size = btnSizeDefault) =>
  `inline-flex items-center justify-center border font-bold border-[#f4f1d6] bg-[#f4f1d6] text-[#0c1814] hover:bg-[#fffbe3] hover:shadow-[0_10px_28px_-12px_#f4f1d680] ${btnMotion} ${size}`
export const btnGhost = (size = btnSizeDefault) =>
  `inline-flex items-center justify-center border font-bold border-[#f4f1d635] bg-transparent text-[#f4f1d6] hover:border-[#f4f1d680] hover:bg-[#f4f1d60d] ${btnMotion} ${size}`

// Cards lift slightly and their border brightens on hover
export const cardMotion =
  'transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_45px_-24px_#000] motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export const h2 = 'm-0 text-[clamp(29px,3.5vw,43px)] font-bold leading-[1.15] tracking-[-.045em]'
export const h3 = 'font-bold leading-[1.25] tracking-[-.025em]'

export const section = 'scroll-mt-5 border-b border-[#f4f1d613] py-[82px] max-[800px]:py-[57px]'

// <summary> with the +/− marker; the parent <details> needs the `group` class
export const summary =
  "flex cursor-pointer list-none items-center justify-between gap-[25px] [&::-webkit-details-marker]:hidden after:text-[23px] after:font-normal after:text-[#95a68d] after:content-['+'] group-open:after:content-['−']"

type Anim = 'intro' | 'reveal'

export function Eyebrow({ className = 'mb-[23px]', anim, children }: { className?: string; anim?: Anim; children: React.ReactNode }) {
  return (
    <div data-anim={anim} className={`text-[14px] font-bold uppercase tracking-[.16em] text-[#aab6aa] ${className}`}>
      {children}
    </div>
  )
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
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

export function Mark({ className }: { className: string }) {
  return <span aria-hidden="true" className={`hq-mark ${className}`} />
}

// Stops the page behind an open modal from scrolling
export function lockPageScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
