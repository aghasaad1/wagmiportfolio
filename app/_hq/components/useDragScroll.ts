'use client'

import { useEffect } from 'react'

/*
 * Lets a mouse drag a horizontal scroll-snap row (touch and trackpads already swipe natively).
 * Snapping is paused while dragging and restored on release, so the row settles on the nearest
 * card. A drag longer than a few pixels swallows the click that follows, so links and buttons
 * inside the cards don't fire by accident.
 */
export function useDragScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let startX = 0
    let startLeft = 0
    let dragging = false
    let moved = false

    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      dragging = true
      moved = false
      startX = e.clientX
      startLeft = el.scrollLeft
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) < 5) return
      if (!moved) {
        moved = true
        el.style.scrollSnapType = 'none'
        el.style.scrollBehavior = 'auto'
        el.style.cursor = 'grabbing'
        el.setPointerCapture(e.pointerId)
      }
      el.scrollLeft = startLeft - dx
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      if (!moved) return
      // Re-enabling snap from the current position makes the browser settle on the nearest card
      const left = el.scrollLeft
      el.style.scrollSnapType = ''
      el.style.cursor = ''
      el.scrollLeft = left
      el.style.scrollBehavior = ''
    }
    const click = (e: MouseEvent) => {
      if (!moved) return
      e.preventDefault()
      e.stopPropagation()
      moved = false
    }
    const dragstart = (e: DragEvent) => e.preventDefault() // stop native image/link dragging

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('click', click, true)
    el.addEventListener('dragstart', dragstart)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.removeEventListener('click', click, true)
      el.removeEventListener('dragstart', dragstart)
    }
  }, [ref])
}
