'use client'

import { useCallback, useEffect, useState } from 'react'

// Mobile and tablet; desktop keeps its regular rows
export const LOOP_QUERY = '(max-width: 1000px)'

// The items are rendered three times; the middle copy is the real one
export const COPIES = [0, 1, 2]

/*
 * An endless, centred carousel for a horizontal scroll-snap row whose items (marked data-loop-item)
 * are rendered three times. Whenever the row settles on a card in the first or last copy it jumps,
 * instantly, by one copy's width to the same card in the middle copy. That looks identical, so the
 * row never runs out in either direction. It only runs while LOOP_QUERY matches.
 *
 * Returns `centred`, the index (across all copies) of the item nearest the middle, `looping`, and
 * `goTo(i)`, which smooth-scrolls item i (any copy) to the middle.
 */
export function useLoopCarousel(trackRef: React.RefObject<HTMLElement | null>, count: number) {
  const [centred, setCentred] = useState(count)
  const [looping, setLooping] = useState(false)

  const items = useCallback(() => trackRef.current?.querySelectorAll<HTMLElement>('[data-loop-item]') ?? [], [trackRef])

  const goTo = useCallback(
    (i: number, behavior: ScrollBehavior = 'smooth') => {
      const track = trackRef.current
      const el = items()[i]
      if (!track || !el) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      track.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2, behavior: reduce ? 'instant' : behavior })
    },
    [trackRef, items],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const mq = window.matchMedia(LOOP_QUERY)

    const nearest = () => {
      const mid = track.scrollLeft + track.clientWidth / 2
      let best = count
      let bestDist = Infinity
      items().forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    }

    let frame = 0
    let settle = 0
    // The client the row is on, kept across copies, so a resize or tab switch re-centres the same one
    let current = 0
    const wrap = () => {
      if (!mq.matches) return
      const i = nearest()
      const copy = Math.floor(i / count)
      if (copy !== 1) goTo(i + (copy === 0 ? count : -count), 'instant')
    }
    const onScroll = () => {
      if (!mq.matches) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const i = nearest()
        current = i % count
        setCentred(i)
      })
      clearTimeout(settle)
      settle = window.setTimeout(wrap, 150)
    }
    // Hidden (e.g. an inactive tab) the row has no width; it's centred again once it's shown
    const recentre = () => {
      setLooping(mq.matches)
      if (mq.matches && track.clientWidth) {
        goTo(count + current, 'instant')
        setCentred(count + current)
      }
    }

    recentre()
    const ro = new ResizeObserver(recentre)
    ro.observe(track)
    mq.addEventListener('change', recentre)
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', recentre)
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      clearTimeout(settle)
    }
  }, [trackRef, count, items, goTo])

  return { centred, looping, goTo }
}
