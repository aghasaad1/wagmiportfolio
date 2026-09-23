import { Eyebrow } from './ui'

const CLIENTS = [
  { initials: 'BC', name: 'Brandon Clark', role: 'Video editing' },
  { initials: 'TP', name: 'Timeless Protection', role: 'Content operations' },
  { initials: 'JC', name: 'Jonathan Catliff', role: 'Content + community' },
]

export function Clients() {
  return (
    <section aria-labelledby="clients-title" className="pb-14 pt-16 max-[800px]:py-[45px]">
      <h2 id="clients-title" className="mb-8 mt-0 text-center text-[24px] font-bold leading-[1.15] tracking-[-.045em]">
        A few of the people we’ve worked with.
      </h2>
      <div className="flex justify-center gap-[65px] max-[800px]:justify-start max-[800px]:gap-[26px] max-[800px]:overflow-x-auto max-[800px]:pb-[14px]">
        {CLIENTS.map((c) => (
          <div key={c.name} className="flex max-w-[200px] flex-col items-center gap-[10px] text-center max-[800px]:min-w-[145px] max-[800px]:flex-1">
            <span
              aria-label="Profile photo placeholder"
              className="grid h-[86px] w-[86px] place-items-center rounded-full border border-[#f4f1d629] bg-[#1a2b20] text-[26px] font-bold tracking-[-.04em] max-[800px]:h-[72px] max-[800px]:w-[72px]"
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

export function About() {
  return (
    <section id="about" className="py-[70px] text-center max-[800px]:py-[52px]">
      <Eyebrow className="mb-5">WAGMI HQ LLC</Eyebrow>
      <h2 className="m-auto max-w-[870px] text-[clamp(27px,3.1vw,39px)] font-bold leading-[1.5] tracking-[-.045em] max-[800px]:text-[26px] max-[800px]:leading-[1.45]">
        You know your business.
        <br />
        We know how to turn it into content.
        <br />
        <span className="text-[#a9b7a7]">From the first idea to the published post.</span>
      </h2>
      <p className="mx-auto mb-0 mt-[25px] max-w-[710px] text-[16px] leading-[1.75] text-[#b8c5b3]">
        Led by Agha Saad, WAGMI HQ LLC provides content strategy, video production and distribution for coaches,
        agency owners and expertise-led businesses. We build organic content and paid creative around the offer you
        already sell.
      </p>
    </section>
  )
}
