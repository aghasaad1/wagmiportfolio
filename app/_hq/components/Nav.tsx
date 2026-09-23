'use client'

import { useEffect, useState } from 'react'
import { Mark, btn } from './ui'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#packages', label: 'Packages' },
  { href: '#process', label: 'How it works' },
  { href: '#careers', label: 'Careers' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-4 z-10 mx-auto mt-4 flex min-h-[60px] w-fit max-w-[calc(100%-24px)] items-center justify-start gap-[26px] rounded-[17px] border border-[#f4f1d61b] bg-[#17251ee8] px-[14px] py-[9px] backdrop-blur-[18px] max-[800px]:top-3 max-[800px]:mt-3 max-[800px]:min-h-[56px] max-[800px]:gap-3 max-[800px]:px-3 max-[800px]:py-2 max-[370px]:gap-[11px] max-[370px]:px-[10px]">
      <a
        href="#top"
        aria-label="WAGMI HQ LLC home"
        className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[14px] font-bold tracking-[.01em] max-[800px]:gap-[6px] max-[800px]:text-[12px] max-[370px]:text-[10px]"
      >
        <Mark className="h-8 w-8 shrink-0 max-[800px]:h-[25px] max-[800px]:w-[25px]" />
        <span>WAGMI HQ LLC</span>
      </a>

      <nav aria-label="Main navigation" className="flex items-center gap-[21px] whitespace-nowrap text-[13px] text-[#b8c1b7] max-[800px]:hidden">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>

      <a
        href="#inquiry"
        className={`${btn('gap-3 rounded-[10px] px-[14px] py-[10px] text-[13px]')} shrink-0 whitespace-nowrap max-[800px]:px-[11px] max-[800px]:py-[9px] max-[800px]:text-[12px] max-[370px]:px-2 max-[370px]:text-[11px]`}
      >
        Request a call <span className="max-[800px]:hidden">↗</span>
      </a>

      <details
        className="hidden max-[800px]:block"
        open={menuOpen}
        onToggle={(e) => setMenuOpen(e.currentTarget.open)}
      >
        <summary
          aria-label="Open navigation menu"
          className={`flex cursor-pointer list-none items-center justify-between gap-[9px] text-[13px] max-[370px]:gap-[5px] max-[370px]:text-[12px] [&::-webkit-details-marker]:hidden ${menuOpen ? 'text-[#f4f1d6]' : ''}`}
        >
          Menu <span aria-hidden="true">☰</span>
        </summary>
        <nav
          aria-label="Mobile navigation"
          className="absolute right-0 top-[calc(100%+10px)] flex w-[225px] flex-col rounded-[15px] border border-[#f4f1d629] bg-[#15271ff7] p-[10px] shadow-[0_14px_35px_#0005] backdrop-blur-[18px]"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] p-3 text-[14px] hover:rounded-lg hover:bg-[#f4f1d60a]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </details>
    </header>
  )
}
