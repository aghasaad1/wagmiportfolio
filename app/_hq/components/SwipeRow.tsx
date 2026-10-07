'use client'

import { useRef } from 'react'
import { useDragScroll } from './useDragScroll'

// A horizontal scroll-snap row that touch swipes natively and a mouse can drag. Lets server
// components (e.g. Packages) use the drag behaviour.
export default function SwipeRow({ className, children, ...rest }: { className: string; children: React.ReactNode; 'aria-label'?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useDragScroll(ref)
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  )
}
