'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Mark, section, SectionHead } from './ui'
import { useDragScroll } from './useDragScroll'
import { COPIES, useLoopCarousel } from './useLoopCarousel'
import { claimPlayback, pausePlayback, releasePlayback } from './playback'
import VideoPlayer from './VideoPlayer'

/*
 * Work samples. A card shows only a poster until clicked, then loads that one video.
 *   file    = our own compressed MP4, public/hq/work/<id>.mp4 (poster <id>.jpg), played in our own
 *             player (VideoPlayer). Used for paid creatives, long-form and short-form.
 *   youtube = YouTube video ID (VSLs).
 *   drive   = Google Drive file ID, shared as "Anyone with the link" (none at the moment). Our player
 *             streams the file straight from Drive, falling back to Drive's own player if refused.
 *   wide = 16:9 (long-form, VSLs)   tall = 9:16 (short-form, paid creatives)
 */
type Source = 'file' | 'youtube' | 'drive'
type Shape = 'wide' | 'tall'
// `titles` names each video (same order as `videos`); without it cards read "<caption> 01", "02"…
type Collection = { id: string; label: string; source: Source; shape: Shape; caption: string; videos: string[]; titles?: string[] }

const PAID: Collection = {
  id: 'paid',
  label: 'Paid creatives',
  source: 'file',
  shape: 'tall',
  caption: 'Paid creative',
  // Drive originals: 1gzbUh9vAlIRWdwpTmzjXlF0xpxn2f9BY, 1eJUxgdDrSRAut1zM1oZa4JIJxpPb0g-u,
  // 1-E4UfqTopK6Bcn556jfnJfUI_KWEKVty, 19oHeEodmtOK8Gs1qTQR24s1Lz8gSi0AS
  videos: ['paid-01', 'paid-02', 'paid-03', 'paid-04'],
}

const VSLS: Collection = {
  id: 'vsl',
  label: 'VSLs',
  source: 'youtube',
  shape: 'wide',
  caption: 'VSL sample',
  videos: ['R0kNKu-I0IM', '8fIWZ6C0bEo', 'VKievNGvRYo', 'SA-3oKS99Ag', '6MCMYCFzA9Q', 'HMzyTo-Q7UI'],
  titles: ['Leo Benichou', 'Leo Benichou', 'Sidney', 'Dmetrey Repin', 'Leo Benichou', 'Jack Hughes'],
}

const LONG_FORM: Collection = {
  id: 'long',
  label: 'Long form',
  source: 'file',
  shape: 'wide',
  caption: 'Long-form video',
  // Compressed to 720p/30fps so each file stays under GitHub's 100 MB limit. Drive originals:
  // 1oF7EwL3FycMMCcwWTAdUgBTNTNtFO9uh, 18sjijckt-28yExlZRfJGKc-XazY6N81-,
  // 1mY-kNGIb1_eQ6aDPGyvziMXozM-bLSqx, 1DujX7DzGfSKEyUAJNY2ecbXMPufouVPQ
  videos: ['long-01', 'long-02', 'long-03', 'long-04'],
}

const SHORT_FORM: Collection = {
  id: 'short',
  label: 'Short form',
  source: 'file',
  shape: 'tall',
  caption: 'Short-form video',
  // Drive originals: 1yqATDk8vx3ChCL4yxTUei3PUq17DXUtH, 1aTkk8bQOntSZKXXWhxIcuIHj72dOnrHc,
  // 12s-G_2xQfCud80jEDxytot4YyZuuMnGa, 1EfNNP7xJ9d5_-hyxYPZillER8hS2WBc0
  videos: ['short-01', 'short-02', 'short-03', 'short-04'],
}

// Paid creative first, then VSLs, organic last (with its own long-form / short-form switch)
const TABS = [
  { id: 'paid', label: 'Paid creatives', collections: [PAID] },
  { id: 'vsl', label: 'VSLs', collections: [VSLS] },
  { id: 'organic', label: 'Organic content', collections: [LONG_FORM, SHORT_FORM] },
]

const thumbnail = (source: Source, id: string, shape: Shape) =>
  source === 'file'
    ? `/hq/work/${id}.jpg`
    : source === 'youtube'
      ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      : `https://lh3.googleusercontent.com/d/${id}=w${shape === 'tall' ? 600 : 1000}`

const embed = (source: Source, id: string) =>
  source === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`
    : `https://drive.google.com/file/d/${id}/preview`

// The video file itself: our own MP4, or Drive's direct download URL (it serves video/mp4 with byte
// ranges, so a <video> element can stream and seek it without Drive's player around it)
const stream = (source: Source, id: string) =>
  source === 'file' ? `/hq/work/${id}.mp4` : `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`

// A YouTube embed that takes part in one-video-at-a-time (see playback.ts): it reports when it starts
// playing through YouTube's iframe messages, and is paused with a pauseVideo command
function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const send = (msg: object) => frame.contentWindow?.postMessage(JSON.stringify(msg), '*')
    const pause = () => send({ event: 'command', func: 'pauseVideo', args: [] })
    // Ask the player to post its state changes back to us
    const listen = () => send({ event: 'listening', id, channel: 'widget' })
    let state: number | undefined
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow || typeof e.data !== 'string') return
      let data
      try {
        data = JSON.parse(e.data)
      } catch {
        return
      }
      const next = data.event === 'onStateChange' ? data.info : data.info?.playerState
      if (typeof next !== 'number' || next === state) return
      state = next
      if (state === 1) claimPlayback(pause) // 1 = playing
    }
    window.addEventListener('message', onMessage)
    frame.addEventListener('load', listen)
    return () => {
      window.removeEventListener('message', onMessage)
      frame.removeEventListener('load', listen)
      releasePlayback(pause)
    }
  }, [id])

  return (
    <iframe
      ref={frameRef}
      src={`${embed('youtube', id)}&origin=${encodeURIComponent(window.location.origin)}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 h-full w-full border-0"
    />
  )
}

// Shows only the thumbnail until opened, so a page of embeds doesn't load up front. Once opened the
// player stays mounted, so a video paused by another one starting resumes where it left off.
function LiteVideo({ source, id, shape, title, open, onPlay }: { source: Source; id: string; shape: Shape; title: string; open: boolean; onPlay: () => void }) {
  // If Drive refuses the direct stream (e.g. its download quota), fall back to its embedded player
  const [fallback, setFallback] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-[#0c1814] ${shape === 'tall' ? 'aspect-[9/16]' : 'aspect-video'}`}>
      {open && source === 'youtube' ? (
        <YouTubeEmbed id={id} title={title} />
      ) : open && !fallback ? (
        <VideoPlayer src={stream(source, id)} poster={thumbnail(source, id, shape)} title={title} onError={() => source === 'drive' && setFallback(true)} />
      ) : open ? (
        <iframe
          src={embed(source, id)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" aria-label={`Play ${title}`} onClick={onPlay} className="group absolute inset-0 h-full w-full cursor-pointer">
          <Image
            src={thumbnail(source, id, shape)}
            alt=""
            fill
            sizes={shape === 'tall' ? '(max-width: 800px) 62vw, (max-width: 1000px) 40vw, 300px' : '(max-width: 800px) 84vw, (max-width: 1000px) 64vw, 480px'}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <span className="absolute inset-0 bg-[#0c1814]/25 transition-colors group-hover:bg-[#0c1814]/5" />
          <span
            style={{ '--glass-dark': 0.12, '--glow': 1, '--gx': 22, '--gy': 12 } as React.CSSProperties}
            className="hq-glass absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[scale] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
          >
            <Mark className="ml-0.5 block h-8 w-8 drop-shadow-[0_2px_8px_#0c181499]" />
          </span>
        </button>
      )}
    </div>
  )
}

// Card widths per shape. Desktop: wide shows ~2.4 cards, tall shows 4 (scroll for more)
const cardWidth: Record<Shape, string> = {
  wide: 'w-[calc((100%-40px)/2.4)]',
  tall: 'w-[calc((100%-60px)/4)]',
}
// Mobile and tablet: one card centred with its neighbours peeking (cqw = the visible width). Set on
// the track, which also uses it for the padding that lets every card reach the middle.
const loopWidth: Record<Shape, string> = {
  wide: 'max-[1000px]:[--w:64cqw] max-[800px]:[--w:84cqw]',
  tall: 'max-[1000px]:[--w:40cqw] max-[800px]:[--w:62cqw]',
}

function VideoSlider({ c }: { c: Collection }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [overflows, setOverflows] = useState(true)
  useDragScroll(trackRef)
  // Mobile and tablet: an endless row with one video centred (see useLoopCarousel)
  const n = c.videos.length
  const { centred, looping, goTo } = useLoopCarousel(trackRef, n)

  // Indexes (across all copies) of the videos opened so far. They stay open, paused, when another
  // video starts, so each resumes where it left off.
  const [opened, setOpened] = useState<ReadonlySet<number>>(() => new Set())
  // Mobile and tablet: swiping to another video pauses the one playing
  const centredVideo = centred % n
  useEffect(() => {
    if (looping) pausePlayback()
  }, [centredVideo, looping])
  // On mobile and tablet a tap on a side card brings it to the middle; a tap on the centred one plays it
  const play = (i: number) => (looping && i !== centred ? goTo(i) : setOpened((s) => new Set(s).add(i)))

  // Only show the arrows when there's something to scroll to
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const check = () => setOverflows(track.scrollWidth > track.clientWidth + 4)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  const scrollBy = (dir: 1 | -1) => {
    if (looping) return goTo(centred + dir)
    const track = trackRef.current
    const card = track?.querySelector('article')
    if (!track || !card) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: reduce ? 'auto' : 'smooth' })
  }
  const arrow =
    'grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[#f4f1d62e] bg-[#13221a] text-[18px] text-[#f4f1d6] transition-[border-color,background-color,translate] duration-300 hover:-translate-y-0.5 hover:border-[#f4f1d670] hover:bg-[#1b3023]'

  return (
    <div className="max-[1000px]:-mx-8 max-[1000px]:@container max-[800px]:-mx-5">
      <div
        ref={trackRef}
        role="region"
        aria-label={`${c.label} samples`}
        tabIndex={0}
        // Mobile and tablet: side padding so every card can reach the middle
        className={`${loopWidth[c.shape]} relative -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-4 motion-reduce:scroll-auto max-[1000px]:mx-0 max-[1000px]:gap-3 max-[1000px]:pb-2 max-[1000px]:[padding-inline:calc(50cqw-var(--w)/2)]`}
      >
        {COPIES.flatMap((copy) =>
          c.videos.map((id, i) => {
            const k = copy * n + i
            // The first and last copies only exist for the endless scroll, so they're hidden on desktop
            // and from assistive tech
            const clone = copy !== 1
            // Side cards shrink and dim (opacity is !important: the reveal animation leaves an inline opacity)
            const title = c.titles?.[i] ?? `${c.caption} ${String(i + 1).padStart(2, '0')}`
            return (
              <article
                key={`${copy}-${id}`}
                data-loop-item
                data-anim={clone ? undefined : 'reveal'}
                aria-hidden={clone || undefined}
                className={`${cardWidth[c.shape]} max-[1000px]:w-[var(--w)] shrink-0 snap-start overflow-hidden rounded-[18px] border border-[#f4f1d619] bg-[#13221a] max-[1000px]:snap-center max-[1000px]:transition-[scale,opacity] max-[1000px]:duration-500 max-[1000px]:ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                  clone ? 'hidden max-[1000px]:block' : ''
                } ${k === centred ? '' : 'max-[1000px]:scale-[.9] max-[1000px]:opacity-50!'}`}
              >
                <LiteVideo source={c.source} id={id} shape={c.shape} title={title} open={opened.has(k)} onPlay={() => play(k)} />
                {/* Only named collections (the VSLs) get a caption; the rest show just the video */}
                {c.titles && <div className="px-5 py-4 text-[14px] font-bold max-[800px]:px-4 max-[800px]:py-3">{title}</div>}
              </article>
            )
          }),
        )}
      </div>
      {overflows && (
        <div className="mt-3 flex justify-end gap-3 max-[1000px]:justify-center">
          <button type="button" aria-label={`Previous ${c.caption.toLowerCase()}`} onClick={() => scrollBy(-1)} className={arrow}>
            <ArrowLeft />
          </button>
          <button type="button" aria-label={`Next ${c.caption.toLowerCase()}`} onClick={() => scrollBy(1)} className={arrow}>
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

const tabClass = (on: boolean) =>
  `cursor-pointer rounded-[30px] border border-[#f4f1d62a] px-[18px] py-[10px] text-[14px] transition-colors duration-300 ${
    on ? 'bg-[#f4f1d6] text-[#0c1814]' : 'bg-transparent text-[#b8c5b3] hover:border-[#f4f1d660] hover:text-[#f4f1d6]'
  }`

// Arrow keys / Home / End move between tabs, per the WAI-ARIA tabs pattern
const keyTarget = (key: string, i: number, n: number) =>
  key === 'ArrowRight' ? (i + 1) % n : key === 'ArrowLeft' ? (i + n - 1) % n : key === 'Home' ? 0 : key === 'End' ? n - 1 : null

// A tab with more than one collection (Organic) gets a smaller switch between them
function Collections({ tabId, collections }: { tabId: string; collections: Collection[] }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  // Switching format pauses whatever is playing
  const select = (i: number) => {
    pausePlayback()
    setActive(i)
  }

  useGSAP(
    () => {
      if (first.current) {
        first.current = false
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(`#sub-${collections[active].id} article`, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', clearProps: 'transform' })
    },
    { dependencies: [active], scope: panelRef },
  )

  if (collections.length === 1) return <VideoSlider c={collections[0]} />

  return (
    <div ref={panelRef}>
      <div role="tablist" aria-label={`${tabId} formats`} className="mb-5 inline-flex gap-1 rounded-full border border-[#f4f1d61f] p-1">
        {collections.map((c, i) => {
          const on = i === active
          return (
            <button
              key={c.id}
              ref={(el) => { refs.current[i] = el }}
              id={`subtab-${c.id}`}
              role="tab"
              aria-selected={on}
              aria-controls={`sub-${c.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                const next = keyTarget(e.key, i, collections.length)
                if (next === null) return
                e.preventDefault()
                select(next)
                refs.current[next]?.focus()
              }}
              className={`cursor-pointer rounded-full px-4 py-[7px] text-[13px] font-bold transition-colors duration-300 ${
                on ? 'bg-[#f3e38a] text-[#0c1814]' : 'bg-transparent text-[#a9b7a7] hover:text-[#f4f1d6]'
              }`}
            >
              {c.label}
            </button>
          )
        })}
      </div>
      {collections.map((c, i) => (
        <div key={c.id} id={`sub-${c.id}`} role="tabpanel" aria-labelledby={`subtab-${c.id}`} hidden={i !== active}>
          <VideoSlider c={c} />
        </div>
      ))}
    </div>
  )
}

export default function Work() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelsRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  // Switching tab pauses whatever is playing
  const select = (i: number) => {
    pausePlayback()
    setActive(i)
  }

  // Stagger the newly shown cards in on tab change (the initial reveal is handled by Animations)
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        `#panel-${TABS[active].id} article`,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', clearProps: 'transform' },
      )
    },
    { dependencies: [active], scope: panelsRef },
  )

  return (
    <section id="work" className={section}>
      <SectionHead eyebrow="Selected work" title="What we deliver." sub="See the kind of work behind the offer." />

      <div data-anim="reveal" role="tablist" aria-label="Work categories" className="mb-6 flex flex-wrap gap-[10px]">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { tabRefs.current[i] = el }}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              const next = keyTarget(e.key, i, TABS.length)
              if (next === null) return
              e.preventDefault()
              select(next)
              tabRefs.current[next]?.focus()
            }}
            className={tabClass(i === active)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div ref={panelsRef}>
        {TABS.map((t, i) => (
          <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={i !== active}>
            <Collections tabId={t.label} collections={t.collections} />
          </div>
        ))}
      </div>
    </section>
  )
}
