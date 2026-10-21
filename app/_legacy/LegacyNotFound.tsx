import Link from 'next/link'

// The legacy multi-page routes a lost visitor most likely wanted.
const DESTINATIONS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/meet-the-team', label: 'Meet the team' },
  { href: '/careers', label: 'Careers' },
]

// 404 body for the legacy design. LegacyRootLayout already supplies the Navbar
// and Footer around it, so this is the page content only.
export default function LegacyNotFound() {
  return (
    <main
      className="flex min-h-[70vh] flex-col items-center justify-center px-[var(--pad)] py-24 text-center"
      style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
    >
      <p className="mb-4 text-[13px] font-medium uppercase tracking-[.16em] text-[var(--t2)]">
        Error 404
      </p>

      <h1
        className="mb-5 max-w-[700px] text-[clamp(34px,6vw,64px)] font-extrabold leading-[1.08] tracking-[-.03em] text-[var(--t1)]"
        style={{ fontFamily: 'var(--font-bricolage), sans-serif' }}
      >
        This page doesn&rsquo;t <span className="text-[var(--hero-gold)]">exist</span>.
      </h1>

      <p className="mb-9 max-w-[520px] text-[clamp(15px,1.6vw,18px)] leading-[1.65] text-[var(--t2)]">
        The link may be old or mistyped. Pick up from one of the pages below.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-[12px] bg-[var(--hero-gold)] px-6 py-[14px] text-[14px] font-bold text-[var(--black)] transition-[transform,opacity] duration-200 hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        Back to home
      </Link>

      <nav
        aria-label="Site pages"
        className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[14px] text-[var(--t2)]"
      >
        {DESTINATIONS.map((d) => (
          <Link key={d.href} href={d.href} className="transition-colors duration-200 hover:text-[var(--t1)]">
            {d.label}
          </Link>
        ))}
      </nav>
    </main>
  )
}
