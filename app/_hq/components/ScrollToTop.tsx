'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from './ui'

/** Appears once the visitor has scrolled this far (px). */
const AFTER = 24

/**
 * The page's scroll indicator: a floating glass button, bottom right, that fills with the
 * accent from the bottom up as the visitor scrolls down and drains as they scroll back up.
 * The arrow switches to the dark on-accent colour across the filled part, so the fill reads
 * as a level rising through the button. One click returns to the top.
 *
 * Progress is written to a CSS variable (--p, 0–1) once per animation frame rather than to
 * React state, so scrolling never re-renders the component.
 */
export default function ScrollToTop() {
  const [shown, setShown] = useState(false)
  const btn = useRef<HTMLButtonElement | null>(null)
  const progress = useRef(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      btn.current?.style.setProperty('--p', progress.current.toFixed(4))
      setShown(max > 0 && window.scrollY > AFTER)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const toTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    window.scrollTo({ top: 0, behavior })
    history.pushState(null, '', '#top')
  }

  // The button is only mounted once scrolled, so seed --p as soon as the node exists
  // to avoid a frame at zero fill.
  const attach = (el: HTMLButtonElement | null) => {
    btn.current = el
    el?.style.setProperty('--p', progress.current.toFixed(4))
  }

  return (
    <button
      ref={attach}
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      // Hidden from the tab order and from assistive tech until it's actually on screen;
      // the footer keeps its own always-available "Back to top" link.
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      style={{ '--gx': 24, '--gy': 10 } as React.CSSProperties}
      className={`hq-glass group fixed bottom-6 right-6 z-20 grid h-12 w-12 place-items-center overflow-hidden rounded-full text-[16px] text-[#f4f1d6] transition-[opacity,translate,scale] duration-400 ease-out hover:scale-110 hover:[--glow:1] motion-reduce:transition-none max-[800px]:bottom-4 max-[800px]:right-4 ${
        shown ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-95 opacity-0'
      }`}
    >
      {/* The accent level rising with scroll progress. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[#f3e38a]"
        style={{ transform: 'translateY(calc((1 - var(--p, 0)) * 100%))' }}
      />
      <span className="relative col-start-1 row-start-1 inline-block transition-transform duration-300 group-hover:-translate-y-[3px] motion-reduce:transition-none">
        <ArrowUp />
      </span>
      {/* The same arrow in the dark on-accent colour, clipped to the filled part. */}
      <span
        aria-hidden="true"
        className="relative col-start-1 row-start-1 grid place-items-center text-[#0c1814] transition-transform duration-300 group-hover:-translate-y-[3px] motion-reduce:transition-none"
        style={{ clipPath: 'inset(calc((1 - var(--p, 0)) * 100%) 0 0 0)' }}
      >
        <ArrowUp />
      </span>
    </button>
  )
}
