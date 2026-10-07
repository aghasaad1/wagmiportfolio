'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { REVIEWS, type Review } from './reviewData'
import { ArrowLeft, ArrowRight, SectionHead, Stars, section } from './ui'
import { useDragScroll } from './useDragScroll'

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

// Long quotes are clamped to a few lines with a "Read more" toggle, so every card stays compact
const LONG = 230
const AUTOPLAY_MS = 4500

function ReviewCard({ r, active, onSelect }: { r: Review; active: boolean; onSelect: () => void }) {
  const [open, setOpen] = useState(false)
  const long = r.quote.length > LONG
  return (
    <figure
      data-review
      onClick={active ? undefined : onSelect}
      // Liquid Glass (frost only) over the section's ambient light, tinted dark enough to keep the text readable
      style={{ '--glass-rgb': '19 34 26', '--glass-dark': active ? 0.5 : 0.62 } as React.CSSProperties}
      className={`hq-glass hq-glass-frost relative m-0 flex w-[var(--card)] shrink-0 flex-col snap-center rounded-[20px] p-6 transition-[transform,translate,scale,rotate,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none max-[800px]:p-5 ${
        active ? 'scale-100 opacity-100' : 'scale-[.88] cursor-pointer opacity-55 hover:opacity-80'
      }`}
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f4f1d633] bg-[#f4f1d614] text-[13px] font-bold">
          {initials(r.name)}
        </span>
        <div className="min-w-0">
          <Stars />
          <figcaption className="mt-[5px] truncate text-[13px] leading-tight">
            <b>{r.name}</b> <span className="text-[#a9b7a7]">· {r.meta}</span>
          </figcaption>
        </div>
      </div>
      {/* Every card gets the same five-line quote box; "Read more" scrolls the full quote inside it
          instead of growing the card, so the row stays even */}
      <blockquote
        className={`m-0 mt-4 h-[8.25em] text-[15px] leading-[1.65] text-[#e7eadb] ${
          open ? 'overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]' : 'line-clamp-5'
        }`}
      >
        “{r.quote}”
      </blockquote>
      {/* Fixed-height row, reserved even on short reviews */}
      <div className="mb-4 mt-1 h-5">
        {long && (
          <button
            type="button"
            aria-expanded={open}
            tabIndex={active ? 0 : -1}
            onClick={() => setOpen((o) => !o)}
            className="cursor-pointer bg-transparent p-0 text-[13px] font-bold text-[#f3e38a] underline-offset-2 hover:underline"
          >
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      <p className="mb-0 mt-auto border-t border-[#f4f1d61a] pt-3 text-[12px] font-bold uppercase tracking-[.08em] text-[#9eafa0]">{r.project}</p>
    </figure>
  )
}

/*
 * One row of reviews: the centred card is in focus at full size, its neighbours shrink and dim.
 * Swipe (touch/trackpad), drag (mouse), the arrow buttons, the dots or the keyboard move it. It also
 * advances on its own while on screen, pausing while the visitor hovers, touches or focuses inside
 * it (and never under reduced motion).
 */
export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  useDragScroll(trackRef)

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    const cards = track?.querySelectorAll<HTMLElement>('[data-review]')
    if (!track || !cards?.length) return
    const card = cards[(i + cards.length) % cards.length]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  // The focused card is whichever one sits closest to the middle of the row
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        track.querySelectorAll<HTMLElement>('[data-review]').forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setActive(best)
      })
    }
    // Open on the second card so the row starts with a card on each side
    const second = track.querySelectorAll<HTMLElement>('[data-review]')[1]
    if (second) track.scrollTo({ left: second.offsetLeft - (track.clientWidth - second.offsetWidth) / 2, behavior: 'instant' })
    update()
    track.addEventListener('scroll', update, { passive: true })
    return () => {
      track.removeEventListener('scroll', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Autoplay only while the section is on screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => goTo(active + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [active, paused, visible, goTo])

  // After a touch, give the visitor a moment before autoplay resumes
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pause = () => {
    clearTimeout(resumeTimer.current)
    setPaused(true)
  }
  const resume = (delay = 0) => {
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), delay)
  }

  const arrow =
    'grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[#f4f1d62e] bg-[#13221a] text-[18px] text-[#f4f1d6] transition-[border-color,background-color,transform,translate,scale,rotate] duration-300 hover:-translate-y-0.5 hover:border-[#f4f1d670] hover:bg-[#1b3023]'

  return (
    <section ref={sectionRef} id="reviews" className={section}>
      <SectionHead eyebrow="Client reviews" title="What clients say about working with us." sub="Real feedback from the people and brands we’ve worked with." />

      <div
        // A size container, so card widths come from the section width (cqw) rather than a percentage of
        // the track, whose padding itself depends on the card width
        className="relative -mx-8 @container max-[800px]:-mx-5"
        onPointerEnter={(e) => e.pointerType === 'mouse' && pause()}
        onPointerLeave={(e) => e.pointerType === 'mouse' && resume()}
        onTouchStart={pause}
        onTouchEnd={() => resume(3000)}
        onFocus={pause}
        onBlur={() => resume()}
      >
        {/* Ambient light for the glass cards to frost */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute left-[16%] top-[8%] h-[300px] w-[300px] rounded-full bg-[#3f7a50] opacity-50 blur-[90px] max-[800px]:left-[5%] max-[800px]:h-[220px] max-[800px]:w-[220px]" />
          <span className="absolute left-[42%] top-[28%] h-[260px] w-[260px] rounded-full bg-[#f3e38a] opacity-[.14] blur-[90px] max-[800px]:left-[40%] max-[800px]:h-[200px] max-[800px]:w-[200px]" />
          <span className="absolute right-[14%] top-[4%] h-[300px] w-[300px] rounded-full bg-[#9eb99a] opacity-25 blur-[90px] max-[800px]:hidden" />
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') goTo(active + 1)
            if (e.key === 'ArrowLeft') goTo(active - 1)
          }}
          // --card: three on screen on desktop, two-ish on tablets, one with neighbours peeking on phones.
          // The side padding lets the first and last card reach the centre.
          className="flex cursor-grab snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overscroll-x-contain scroll-smooth py-8 [--card:min(400px,calc((100cqw-104px)/3))] [padding-inline:calc(50cqw-var(--card)/2)] [scrollbar-width:none] max-[1000px]:[--card:min(400px,46cqw)] max-[800px]:gap-3 max-[800px]:py-4 max-[800px]:[--card:76cqw] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.name} r={r} active={i === active} onSelect={() => goTo(i)} />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-5 px-8 max-[800px]:gap-3 max-[800px]:px-5">
          <button type="button" aria-label="Previous review" onClick={() => goTo(active - 1)} className={arrow}>
            <ArrowLeft />
          </button>
          <div className="flex items-center gap-[6px]">
            {REVIEWS.map((r, i) => (
              <button
                key={r.name}
                type="button"
                aria-label={`Show review ${i + 1} of ${REVIEWS.length}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[#f3e38a]' : 'w-2 bg-[#f4f1d640] hover:bg-[#f4f1d680]'}`}
              />
            ))}
          </div>
          <button type="button" aria-label="Next review" onClick={() => goTo(active + 1)} className={arrow}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}
