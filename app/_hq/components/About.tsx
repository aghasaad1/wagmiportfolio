import { Eyebrow, Highlight } from './ui'

// Words light up one by one as the statement scrolls through the viewport (see Animations: data-scrub);
// words starting with * get the accent highlighter sweep.
const STATEMENT = [
  ['You', 'know', 'your', '*offer.'],
  ['We', 'know', 'how', 'to', 'turn', 'it', 'into', '*content', 'and', '*creative.'],
]

export default function About() {
  return (
    <section id="about" className="relative py-[110px] text-center max-[800px]:py-[72px]">
      {/* Soft warm glow behind the statement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[min(900px,100vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,#f3e38a14,#3f7a5018_45%,transparent_72%)]"
      />
      <Eyebrow anim="reveal" className="mb-7">WAGMI HQ LLC</Eyebrow>
      <h2
        data-scrub
        className="mx-auto max-w-[1040px] text-[clamp(36px,5.4vw,68px)] font-extrabold leading-[1.12] tracking-[-.05em] max-[800px]:text-[clamp(32px,9vw,40px)]"
      >
        {STATEMENT.map((line, i) => (
          <span key={i} className="block">
            {line.map((word, j) => {
              const highlight = word.startsWith('*')
              const text = highlight ? word.slice(1) : word
              return (
                <span key={j}>
                  {highlight ? (
                    <Highlight data-word data-highlight>{text}</Highlight>
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
          <span className="absolute inset-0 animate-ping rounded-full bg-[#f3e38a] opacity-50 motion-reduce:animate-none" />
          <span className="relative h-2 w-2 rounded-full bg-[#f3e38a]" />
        </span>
        From the first idea to the final creative.
      </p>

      <p data-anim="reveal" className="mx-auto mb-0 mt-9 max-w-[710px] text-[16px] leading-[1.75] text-[#b8c5b3]">
        Led by Agha Saad, WAGMI HQ LLC provides content strategy, video production and creative execution for
        businesses with proven offers. We build organic content, paid creative and VSLs around what you already sell.
      </p>
    </section>
  )
}
