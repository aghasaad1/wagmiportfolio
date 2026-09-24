'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EASE = 'power3.out'
// Transforms are cleared afterwards so Tailwind hover transforms keep working.
const shown = { autoAlpha: 1, y: 0, ease: EASE, clearProps: 'transform' }

/*
 * All HQ page motion, driven by data attributes:
 *   data-anim="nav"    slides down on load
 *   data-anim="intro"  hero elements, staggered on load
 *   data-anim="reveal" fades up when scrolled into view (batched, so siblings stagger)
 *   data-anim="line"   divider that draws in from the left
 *   data-float         gentle idle pulse
 *   data-scrub         statement lit word by word with scroll
 *   data-timeline      process timeline (fill + nodes lit with scroll)
 *   data-blob          ambient light behind the glass package cards (slow drift)
 * hq.css hides the animated elements until GSAP reveals them.
 */
export default function Animations() {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap
        .timeline({ defaults: { duration: 0.9 } })
        .fromTo('[data-anim="nav"]', { autoAlpha: 0, y: -16 }, shown)
        .fromTo('[data-anim="intro"]', { autoAlpha: 0, y: 26 }, { ...shown, stagger: 0.09 }, '-=0.6')

      ScrollTrigger.batch('[data-anim="reveal"]', {
        // "top 90%", capped at the max scroll so elements at the very end of the page still fire
        start: (self: ScrollTrigger) => {
          const top = (self.trigger as HTMLElement).getBoundingClientRect().top + window.scrollY
          return Math.min(top - window.innerHeight * 0.9, ScrollTrigger.maxScroll(window) - 1)
        },
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { autoAlpha: 0, y: 28 }, { ...shown, duration: 0.8, stagger: 0.1, overwrite: true }),
      })

      gsap.utils.toArray<HTMLElement>('[data-anim="line"]').forEach((el) =>
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.1, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } },
        ),
      )

      // Statement lit word by word as it scrolls through, then the highlighter sweeps behind the key word
      gsap.utils.toArray<HTMLElement>('[data-scrub]').forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 42%', scrub: 0.6 } })
        tl.fromTo(el.querySelectorAll('[data-word]'), { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: 'none' })
        const hl = el.querySelector('[data-highlight]')
        if (hl) {
          tl.fromTo(hl.querySelector('[data-highlight-bg]'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '>-0.1')
            .fromTo(hl, { color: '#f4f1d6' }, { color: '#0c1814', duration: 0.3 }, '<0.15')
        }
      })

      gsap.to('[data-float]', { scale: 1.07, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })

      // Trigger points are measured once; re-measure whenever the page height changes
      // (web font swap, images, opening FAQs) so they stay reachable.
      let lastHeight = document.body.scrollHeight
      let timer: ReturnType<typeof setTimeout> | undefined
      const ro = new ResizeObserver(() => {
        if (document.body.scrollHeight === lastHeight) return
        lastHeight = document.body.scrollHeight
        clearTimeout(timer)
        timer = setTimeout(() => ScrollTrigger.refresh(), 150)
      })
      ro.observe(document.body)
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      return () => {
        ro.disconnect()
        clearTimeout(timer)
      }
    })

    // Process timeline: the line fills with scroll and each numbered stop lights up as it's reached.
    // Desktop fills one horizontal track; phones fill a vertical connector between each pair of stops.
    // Re-runs automatically when the layout crosses the 800px breakpoint.
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', phone: '(max-width: 800px)' }, (ctx) => {
      const { motion, phone } = ctx.conditions as { motion: boolean; phone: boolean }
      if (!motion) return
      const dim = { backgroundColor: '#13221a', color: '#a9b7a7', borderColor: '#f4f1d633', scale: 0.92 }
      const lit = { backgroundColor: '#f4f1d6', color: '#0c1814', borderColor: '#f4f1d6', scale: 1, duration: 0.14 }
      gsap.utils.toArray<HTMLElement>('[data-timeline]').forEach((el) => {
        const nodes = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('[data-timeline-node]'))
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 60%', scrub: 0.6 } })
        const step = 1 / (nodes.length - 1)
        nodes.forEach((node, i) => {
          tl.fromTo(node, dim, lit, i * step)
          const seg = phone && i < nodes.length - 1 && node.parentElement?.querySelector('[data-timeline-seg]')
          if (seg) tl.fromTo(seg, { scaleY: 0 }, { scaleY: 1, duration: step, ease: 'none' }, i * step)
        })
        if (!phone) tl.fromTo(el.querySelector('[data-timeline-fill]'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0)
      })
    })

    // Ambient light behind the glass package cards drifts slowly (desktop only; still on phones),
    // and only runs while the section is on screen.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 801px)', () => {
      const blobs = gsap.utils.toArray<HTMLElement>('[data-blob]')
      if (!blobs.length) return
      const tweens = blobs.map((b, i) =>
        gsap.to(b, {
          xPercent: gsap.utils.random(-30, 30),
          yPercent: gsap.utils.random(-25, 25),
          scale: gsap.utils.random(0.85, 1.2),
          duration: gsap.utils.random(9, 14),
          delay: -i * 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      )
      ScrollTrigger.create({
        trigger: blobs[0].parentElement,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
      })
    })
  })

  // Ease in the contents of any <details> (FAQ, mobile menu) as it opens.
  // `toggle` doesn't bubble, so listen in the capture phase.
  useEffect(() => {
    const onToggle = (e: Event) => {
      const el = e.target as HTMLDetailsElement
      if (!el.open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        el.querySelectorAll(':scope > :not(summary)'),
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: EASE, clearProps: 'transform' },
      )
    }
    document.addEventListener('toggle', onToggle, true)
    return () => document.removeEventListener('toggle', onToggle, true)
  }, [])

  return null
}
