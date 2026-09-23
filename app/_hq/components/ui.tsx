// Size classes are kept apart from the look so callers can swap them without
// two conflicting utilities (Tailwind picks by stylesheet order, not class order).
const btnSizeDefault = 'gap-[22px] rounded-[12px] px-5 py-[13px] text-[14px]'

export const btn = (size = btnSizeDefault) =>
  `inline-flex items-center justify-center border font-bold border-[#f4f1d6] bg-[#f4f1d6] text-[#0c1814] ${size}`
export const btnGhost = (size = btnSizeDefault) =>
  `inline-flex items-center justify-center border font-bold border-[#f4f1d635] bg-transparent text-[#f4f1d6] ${size}`

export const h2 = 'm-0 text-[clamp(29px,3.5vw,43px)] font-bold leading-[1.15] tracking-[-.045em]'
export const h3 = 'font-bold leading-[1.25] tracking-[-.025em]'

export const section = 'scroll-mt-5 border-b border-[#f4f1d613] py-[82px] max-[800px]:py-[57px]'

// <summary> with the +/− marker; the parent <details> needs the `group` class
export const summary =
  "flex cursor-pointer list-none items-center justify-between gap-[25px] [&::-webkit-details-marker]:hidden after:text-[23px] after:font-normal after:text-[#95a68d] after:content-['+'] group-open:after:content-['−']"

export function Eyebrow({ className = 'mb-[23px]', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`text-[14px] font-bold uppercase tracking-[.16em] text-[#aab6aa] ${className}`}>{children}</div>
  )
}

export function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-[30px] flex items-end justify-between gap-5 max-[800px]:flex-wrap max-[800px]:items-start">
      <div>
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
