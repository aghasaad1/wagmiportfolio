import { Eyebrow } from './ui'

const CLIENTS = [
  { initials: 'BC', name: 'Brandon Clark', role: 'Video editing' },
  { initials: 'TP', name: 'Timeless Protection', role: 'Content operations' },
  { initials: 'JC', name: 'Jonathan Catliff', role: 'Content + community' },
]

export function Clients() {
  return (
    <section aria-labelledby="clients-title" className="pb-14 pt-16 max-[800px]:py-[45px]">
      <h2 data-anim="reveal" id="clients-title" className="mb-8 mt-0 text-center text-[24px] font-bold leading-[1.15] tracking-[-.045em]">
        A few of the people we’ve worked with.
      </h2>
      <div className="flex justify-center gap-[65px] max-[800px]:justify-start max-[800px]:gap-[26px] max-[800px]:overflow-x-auto max-[800px]:pb-[14px]">
        {CLIENTS.map((c) => (
          <div key={c.name} data-anim="reveal" className="group flex max-w-[200px] flex-col items-center gap-[10px] text-center max-[800px]:min-w-[145px] max-[800px]:flex-1">
            <span
              aria-label="Profile photo placeholder"
              className="grid h-[86px] w-[86px] place-items-center rounded-full border border-[#f4f1d629] bg-[#1a2b20] text-[26px] font-bold tracking-[-.04em] transition-[transform,border-color,background-color] duration-300 ease-out group-hover:scale-105 group-hover:border-[#f4f1d660] group-hover:bg-[#213528] motion-reduce:transition-none max-[800px]:h-[72px] max-[800px]:w-[72px]"
            >
              {c.initials}
            </span>
            <strong className="text-[15px]">{c.name}</strong>
            <small className="text-[14px] text-[#9eafa0]">{c.role}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

// Words light up one by one as the statement scrolls through the viewport (see Animations: data-scrub);
// "content" gets a cream highlighter sweep.
const STATEMENT = [
  ['You', 'know', 'your', 'business.'],
  ['We', 'know', 'how', 'to', 'turn', 'it', 'into', '*content.'],
]

export function About() {
  return (
    <section id="about" className="py-[110px] text-center max-[800px]:py-[72px]">
      <Eyebrow anim="reveal" className="mb-7">WAGMI HQ LLC</Eyebrow>
      <h2
        data-scrub
        className="mx-auto max-w-[980px] text-[clamp(36px,5.4vw,68px)] font-extrabold leading-[1.08] tracking-[-.05em] max-[800px]:text-[clamp(32px,9vw,40px)]"
      >
        {STATEMENT.map((line, i) => (
          <span key={i} className="block">
            {line.map((word, j) => {
              const highlight = word.startsWith('*')
              const text = highlight ? word.slice(1) : word
              return (
                <span key={j}>
                  {highlight ? (
                    <span data-word data-highlight className="relative isolate inline-block px-[.12em] text-[#0c1814]">
                      <span
                        data-highlight-bg
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-[.06em] top-[.14em] -z-10 origin-left rounded-[.14em] bg-[#f4f1d6]"
                      />
                      {text}
                    </span>
                  ) : (
                    <span data-word>{text}</span>
                  )}
                  {j < line.length - 1 && ' '}
                </span>
              )
            })}
          </span>
        ))}
      </h2>

      <p
        data-anim="reveal"
        className="mx-auto mb-0 mt-9 inline-flex items-center gap-3 rounded-full border border-[#f4f1d62e] bg-[#f4f1d608] px-5 py-[10px] text-[16px] font-bold text-[#d9dcc4] max-[800px]:mt-7 max-[800px]:text-[14px]"
      >
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#f4f1d6] opacity-50 motion-reduce:animate-none" />
          <span className="relative h-2 w-2 rounded-full bg-[#f4f1d6]" />
        </span>
        From the first idea to the published post.
      </p>

      <p data-anim="reveal" className="mx-auto mb-0 mt-9 max-w-[710px] text-[16px] leading-[1.75] text-[#b8c5b3]">
        Led by Agha Saad, WAGMI HQ LLC provides content strategy, video production and distribution for coaches,
        agency owners and expertise-led businesses. We build organic content and paid creative around the offer you
        already sell.
      </p>
    </section>
  )
}
