'use client'

import { Fragment, useEffect, useRef } from 'react'
import { POLICIES, type Policy } from './policies'
import { lockPageScroll } from './ui'

// Renders {{...}} owner-to-confirm fields highlighted so they're easy to find before launch
function Text({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\{\{.*?\}\})/).map((part, i) =>
        part.startsWith('{{') ? (
          <mark
            key={i}
            title="To confirm before launch"
            className="rounded-[4px] border border-dashed border-[#e3c24a80] bg-[#e3c24a1a] px-1 text-[#f0dc8c]"
          >
            {part.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

export default function PolicyDialog({
  dialogRef,
  active,
  onSelect,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>
  active: Policy['id']
  onSelect: (id: Policy['id']) => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const policy = POLICIES.find((p) => p.id === active) ?? POLICIES[0]

  // Start each policy from the top
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [active])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="policy-title"
      onClose={() => lockPageScroll(false)}
      onClick={(e) => e.target === e.currentTarget && close()}
      // Liquid Glass sheet, tinted dark enough for long-form reading
      style={{ '--glass-dark': 0.88 } as React.CSSProperties}
      className="hq-glass m-auto h-[min(86dvh,860px)] w-[min(820px,calc(100%-32px))] overflow-hidden rounded-[24px] p-0 text-[#f4f1d6] backdrop:bg-[#0c181499] backdrop:backdrop-blur-[6px]"
    >
      <div className="flex h-full flex-col">
        {/* Header: tabs + close */}
        <div className="flex items-center justify-between gap-4 border-b border-[#f4f1d61c] px-7 py-4 max-[800px]:px-5">
          <div role="tablist" aria-label="Policies" className="flex gap-1 rounded-full border border-[#f4f1d61f] p-1">
            {POLICIES.map((p) => {
              const on = p.id === active
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => onSelect(p.id)}
                  className={`cursor-pointer rounded-full px-4 py-[7px] text-[13px] font-bold transition-colors duration-300 max-[420px]:px-3 ${
                    on ? 'bg-[#f4f1d6] text-[#0c1814]' : 'bg-transparent text-[#a9b7a7] hover:text-[#f4f1d6]'
                  }`}
                >
                  {p.tab}
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close policies"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-[#f4f1d629] bg-transparent text-[18px] text-[#a9b7a7] transition-[color,border-color,transform] duration-300 hover:rotate-90 hover:border-[#f4f1d670] hover:text-[#f4f1d6]"
          >
            ×
          </button>
        </div>

        {/* Scrolling policy body */}
        <div ref={bodyRef} role="tabpanel" className="flex-1 overflow-y-auto overscroll-contain px-9 pb-12 pt-8 max-[800px]:px-5">
          <p className="m-0 text-[12px] font-bold uppercase tracking-[.16em] text-[#8fa18f]">WAGMI HQ LLC</p>
          <h2 id="policy-title" className="mb-2 mt-3 text-[clamp(28px,4vw,38px)] font-extrabold leading-[1.1] tracking-[-.04em]">
            {policy.title}
          </h2>
          <p className="m-0 text-[13px] text-[#8fa18f]">Last updated {policy.updated}</p>
          <p className="mb-0 mt-6 max-w-[640px] text-[16px] leading-[1.7] text-[#c9d2c2]">{policy.intro}</p>

          {policy.sections.map((section) => (
            <section key={section.heading} className="mt-9 border-t border-[#f4f1d614] pt-7">
              <h3 className="m-0 text-[17px] font-bold tracking-[-.02em]">{section.heading}</h3>
              {section.body.map((item, i) =>
                typeof item === 'string' ? (
                  <p key={i} className="mb-0 mt-3 max-w-[660px] text-[15px] leading-[1.75] text-[#aebaa9]">
                    <Text>{item}</Text>
                  </p>
                ) : (
                  <ul key={i} className="mb-0 mt-3 max-w-[660px] list-none space-y-2 p-0">
                    {item.map((li) => (
                      <li key={li} className="relative pl-5 text-[15px] leading-[1.7] text-[#aebaa9]">
                        <span aria-hidden="true" className="absolute left-0 top-[.7em] h-[5px] w-[5px] rounded-full bg-[#f4f1d680]" />
                        <Text>{li}</Text>
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
      </div>
    </dialog>
  )
}
