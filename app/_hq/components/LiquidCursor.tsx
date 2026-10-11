'use client'

import { useEffect, useRef } from 'react'

// The usual arrow and hand shapes on a 24px grid, with their hotspots (the point that clicks)
const SHAPES = {
  arrow: { d: 'M4 2.5v16.2l4.3-4.1 2.9 6.6 2.9-1.3-2.8-6.4h6z', x: 4, y: 3 },
  hand: { d: 'M6 3.5a2 2 0 0 1 4 0v5.7a2 2 0 0 1 4 .3v.5a2 2 0 0 1 4 .5v1a2 2 0 0 1 4 0V15a7 7 0 0 1-7 7h-2.5c-2.4 0-4-.8-5.4-2.2L2.3 16.6a1.9 1.9 0 0 1 2.7-2.7L6 15z', x: 8, y: 2 },
}
type Shape = keyof typeof SHAPES

const CLICKABLE = "a[href], button:not(:disabled), summary, label, select, [role='button'], [role='tab'], [role='slider'], .cursor-pointer"
const TEXT = "input:not([type='checkbox'], [type='radio'], [type='submit'], [type='button']), textarea"

/*
 * A Liquid Glass mouse cursor: the usual arrow (or hand over anything clickable), made of frosted
 * glass that blurs whatever is under it, with a bright rim and a thin dark edge so it reads on light
 * and dark areas alike. It replaces the native cursor (html.hq-glass-cursor in hq.css) only for a
 * mouse. It steps aside, back to the coloured CSS cursors in hq.css, over text fields, over
 * elements that hide the cursor (an idle video), inside modals (which sit in the browser's top
 * layer, above anything on the page) and over embedded players.
 */
export default function LiquidCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const root = document.documentElement
    const parts = Object.fromEntries([...el.querySelectorAll<HTMLElement>('[data-shape]')].map((p) => [p.dataset.shape, p])) as Record<Shape, HTMLElement>

    let target: Element | null = null
    let inside = false
    let shown: Shape | null = null
    let frame = 0

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      inside = true
      target = e.target as Element
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }
    // Leaving the window, or entering an iframe (whose cursor is its own), hides it
    const out = (e: MouseEvent) => {
      if (!e.relatedTarget) inside = false
    }

    // Checked every frame rather than on movement, so it also follows changes under a still mouse
    // (a video's controls hiding, a modal opening)
    const tick = () => {
      const glass = inside && target && !document.querySelector('dialog:modal') && !target.closest(`${TEXT}, .cursor-none, iframe`)
      const next: Shape | null = glass ? (target!.closest(CLICKABLE) ? 'hand' : 'arrow') : null
      if (next !== shown) {
        shown = next
        root.classList.toggle('hq-glass-cursor', next !== null)
        for (const [name, part] of Object.entries(parts)) part.style.display = name === next ? 'block' : 'none'
      }
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('mouseout', out)
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(frame)
      root.classList.remove('hq-glass-cursor')
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[2147483647]">
      {(Object.keys(SHAPES) as Shape[]).map((name) => {
        const { d, x, y } = SHAPES[name]
        return (
          <div key={name} data-shape={name} className="absolute hidden h-6 w-6 origin-top-left scale-[1.15]" style={{ left: -x * 1.15, top: -y * 1.15 }}>
            {/* The glass: blurs and brightens what's behind it, cut to the cursor's shape */}
            <div className="absolute inset-0 bg-[#f4f1d626] backdrop-blur-[3px] backdrop-brightness-[1.15] backdrop-saturate-[1.8]" style={{ clipPath: `path('${d}')` }} />
            <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id={`hq-cursor-rim-${name}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".95" />
                  <stop offset=".5" stopColor="#fff" stopOpacity=".25" />
                  <stop offset="1" stopColor="#f3e38a" stopOpacity=".8" />
                </linearGradient>
              </defs>
              <path d={d} fill="none" stroke="#0c1814" strokeOpacity=".6" strokeWidth="2.6" strokeLinejoin="round" />
              <path d={d} fill="none" stroke={`url(#hq-cursor-rim-${name})`} strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
