'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/*
 * Liquid Glass support (styles live in hq.css → .hq-glass).
 * GlassDefs renders the SVG refraction filter once and, on Chromium (the only engine that supports
 * SVG filters inside backdrop-filter), turns it on via html.hq-refract. Other browsers keep the
 * frosted version, which still looks right.
 */
export function GlassDefs() {
  useEffect(() => {
    const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands
    if (brands?.some((b) => b.brand === 'Chromium')) document.documentElement.classList.add('hq-refract')
  }, [])

  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <filter id="hq-refract" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        {/* Low-frequency noise, softened, used to bend what's behind the glass */}
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={2} seed={7} result="noise" />
        <feGaussianBlur in="noise" stdDeviation={2} result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale={26} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

// Moves the glass's specular highlight toward the cursor while hovering (desktop pointers only).
export function useGlassHighlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const toX = gsap.quickTo(el, '--gx', { duration: 0.5, ease: 'power3.out' })
    const toY = gsap.quickTo(el, '--gy', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      toX(e.clientX - r.left)
      toY(e.clientY - r.top)
    }
    const enter = () => gsap.to(el, { '--glow': 1, duration: 0.4 })
    const leave = () => gsap.to(el, { '--glow': 0, duration: 0.6 })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return ref
}

// An element with the glass cursor highlight — lets server components (e.g. Packages) use it
export function GlassArticle({
  className,
  style,
  children,
  ...rest
}: { className: string; style?: React.CSSProperties; children: React.ReactNode; 'data-anim'?: string }) {
  const ref = useGlassHighlight<HTMLElement>()
  return (
    <article ref={ref} className={className} style={style} {...rest}>
      {children}
    </article>
  )
}
