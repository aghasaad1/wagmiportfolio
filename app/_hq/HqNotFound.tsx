import Link from 'next/link'
import { ArrowUpRight, Highlight, Mark, btn, btnGhost, Eyebrow } from './components/ui'
import { GlassDefs } from './components/Glass'

// Where a lost visitor most likely meant to go. The HQ site is a single page,
// so these are in-page anchors on '/' rather than routes.
const DESTINATIONS = [
  { href: '/#work', label: 'See the work' },
  { href: '/#packages', label: 'Compare packages' },
  { href: '/#process', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
]

// 404 for the HQ design. No Nav/Footer: a dead end should offer a way back, not
// the whole site chrome. Server component — nothing here needs JS.
export default function HqNotFound() {
  return (
    <>
      <GlassDefs />
      <div aria-hidden="true" className="hq-aurora" />
      <main className="mx-auto flex min-h-svh max-w-290 flex-col items-center justify-center px-8 py-20 text-center max-[800px]:px-5">
        <Link
          href="/"
          aria-label="WAGMI HQ LLC home"
          className="mb-[clamp(28px,6svh,52px)] flex items-center gap-2 whitespace-nowrap text-[14px] font-bold tracking-[.01em]"
        >
          <Mark className="h-8 w-8 shrink-0" />
          <span>WAGMI HQ LLC</span>
        </Link>

        <Eyebrow className="mb-[14px]">Error 404</Eyebrow>

        <h1 className="mx-auto mb-[18px] mt-0 max-w-[720px] text-[clamp(32px,5.3vw,60px)] font-extrabold leading-[1.12] tracking-[-.05em] max-[800px]:text-[clamp(30px,8vw,40px)]">
          This page <Highlight>doesn&rsquo;t exist</Highlight>.
        </h1>

        <p className="mx-auto mb-[clamp(22px,4svh,34px)] mt-0 max-w-[520px] text-[clamp(15px,2.1svh,18px)] leading-[1.65] text-[#b8c1b7] max-[800px]:text-[15px]">
          The link may be old or mistyped. Everything we do lives on one page &mdash; head back
          and you&rsquo;ll find it.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link className={btn()} href="/">
            Back to the site <span><ArrowUpRight /></span>
          </Link>
          <Link className={btnGhost()} href="/#inquiry">
            Request a discovery call <span><ArrowUpRight /></span>
          </Link>
        </div>

        <nav
          aria-label="Popular sections"
          className="mt-[clamp(32px,6svh,54px)] flex flex-wrap items-center justify-center gap-x-[21px] gap-y-3 text-[13px] text-[#b8c1b7]"
        >
          {DESTINATIONS.map((d) => (
            <Link key={d.href} href={d.href} className="transition-colors duration-200 hover:text-[#f4f1d6]">
              {d.label}
            </Link>
          ))}
        </nav>
      </main>
    </>
  )
}
