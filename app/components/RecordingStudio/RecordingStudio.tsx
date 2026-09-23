'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SCRIPT_TEXT = `HOOK  00:00
"Most founders don't have a content problem.
They have a sixty-minute problem."

BEAT 1  00:06
Everyone tells you to post daily. Nobody tells
you where thirty videos a month come from.

BEAT 2  00:19
So we stopped asking for thirty days.
We ask for one hour.

BEAT 3  00:28
One session. Every angle, every take.
Then we cut it into a month.

CTA  00:41
"You've already got the hour.
We'll handle the other twenty-nine days."`

export default function RecordingStudio() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const headingLine1Ref = useRef<HTMLSpanElement>(null)
  const headingLine2Ref = useRef<HTMLSpanElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)

  const cameraImgRef = useRef<HTMLDivElement>(null)
  const leftVideoRef = useRef<HTMLDivElement>(null)

  const rightVideoRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const scriptTextRef = useRef<HTMLPreElement>(null)

  useGSAP(
    () => {
      // Scene 1 is the resting state: the section is pinned and centred, so
      // it is already fully in view on arrival. Only the outgoing layers of
      // the swap start hidden — a scroll-triggered entrance here would race
      // the pin, whose trigger sits at the same scroll position.
      gsap.set([cameraImgRef.current, rightVideoRef.current], { autoAlpha: 1, scale: 1 })
      gsap.set(leftVideoRef.current, { autoAlpha: 0, scale: 0.9 })
      gsap.set(paperRef.current, { autoAlpha: 0, scale: 0.9 })

      // ── Pin: once the stage is fully in view, further scroll drives the
      // swap — left: camera → video, right: video → script paper — instead
      // of moving the page. Headings/copy swap alongside it. ─────────────
      // Read the copy from the constant, never from the DOM — the effect
      // can run twice (StrictMode), and the first pass blanks the node.
      const script = scriptTextRef.current
      const fullText = SCRIPT_TEXT
      if (script) script.textContent = ''
      const typer = { chars: 0 }

      // Two copy states. Scrubbing runs both ways, so the swap has to be
      // written as a reversible set — not a one-shot .call().
      const COPY = {
        session: {
          eyebrow: 'Inside the session',
          line1: 'One session.',
          line2: 'A month of content.',
          body:
            'Sixty minutes in front of the lens is the only time we ask for. Every angle, every take, every asset — captured once, then cut into a full month of content.',
        },
        script: {
          eyebrow: 'Before the camera rolls',
          line1: 'Every word,',
          line2: 'planned first.',
          body:
            'Nothing gets said on camera that wasn’t written first. Every hook, beat, and CTA is scripted before the lens ever turns on.',
        },
      }
      const applyCopy = (c: (typeof COPY)['session']) => {
        if (eyebrowRef.current) eyebrowRef.current.textContent = c.eyebrow
        if (headingLine1Ref.current) headingLine1Ref.current.textContent = c.line1
        if (headingLine2Ref.current) headingLine2Ref.current.textContent = c.line2
        if (bodyRef.current) bodyRef.current.textContent = c.body
      }

      const swapTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=125%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })

      swapTl
        // copy swaps out, then back in with new wording
        .to([headingLine1Ref.current, headingLine2Ref.current, bodyRef.current], {
          opacity: 0,
          y: -16,
          duration: 0.35,
        }, 0)
        // Swap the words at the midpoint of the fade, in whichever
        // direction the scrub is travelling.
        .add(() => {
          applyCopy(swapTl.scrollTrigger?.direction === -1 ? COPY.session : COPY.script)
        }, 0.35)
        .to([headingLine1Ref.current, headingLine2Ref.current, bodyRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.4,
        }, 0.4)

        // left slot: camera → video
        .to(cameraImgRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.5 }, 0.15)
        .to(leftVideoRef.current, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.35)

        // right slot: video → script paper
        .to(rightVideoRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.5 }, 0.15)
        .to(paperRef.current, { autoAlpha: 1, scale: 1, duration: 0.6 }, 0.45)

        // Script types itself out. Tween a proxy value rather than the
        // element — a tween with no animatable properties has nothing to
        // interpolate, so its onUpdate never runs.
        .to(
          typer,
          {
            chars: fullText.length,
            duration: 1.6,
            ease: 'none',
            onUpdate: () => {
              if (script) script.textContent = fullText.slice(0, Math.round(typer.chars))
            },
          },
          0.7
        )
    },
    { scope: wrapperRef }
  )

  return (
    <div ref={wrapperRef} style={{ position: 'relative', background: 'var(--hero-bg)' }}>
      {/* ── Scene 1 — pinned while camera/video swap to video/script ── */}
      <div ref={pinRef} style={{ position: 'relative' }}>
        <section
          className="rs-stage"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1680px',
            margin: '0 auto',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 7vw, 96px) var(--pad)',
          }}
        >
          <div className="rs-copy">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--hero-gold)', opacity: 0.55 }} />
              <span
                ref={eyebrowRef}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--t2)',
                }}
              >
                Inside the session
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-anton), sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(28px, 5vw, 64px)',
                lineHeight: 1.04,
                letterSpacing: '0.005em',
                textTransform: 'uppercase',
                color: 'var(--hero-cream)',
                margin: 0,
              }}
            >
              <span ref={headingLine1Ref} style={{ display: 'block' }}>
                One session.
              </span>
              <span ref={headingLine2Ref} style={{ display: 'block', color: 'var(--hero-gold)' }}>
                A month of content.
              </span>
            </h2>
            <p
              ref={bodyRef}
              style={{
                margin: 'clamp(12px, 1.6vw, 18px) auto 0',
                maxWidth: '560px',
                fontSize: 'clamp(12px, 1.3vw, 15px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'var(--t3)',
              }}
            >
              Sixty minutes in front of the lens is the only time we ask for. Every
              angle, every take, every asset — captured once, then cut into a full
              month of content.
            </p>
          </div>

          <div className="rs-row">
            {/* Left slot — camera.png swaps to a video */}
            <div className="rs-slot rs-slot-left">
              <div ref={cameraImgRef} className="rs-camera-img">
                <Image src="/camera.png" alt="" width={720} height={720} priority />
              </div>

              <div ref={leftVideoRef} className="rs-media" style={{ opacity: 0 }}>
                <div className="rs-frame">
                  <video autoPlay loop muted playsInline className="rs-video">
                    <source src="/heroVideo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            {/* Right slot — video swaps to the script paper */}
            <div className="rs-slot rs-slot-right">
              <div ref={rightVideoRef} className="rs-media">
                <div className="rs-frame">
                  <video autoPlay loop muted playsInline className="rs-video">
                    <source src="/heroVideo.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div ref={paperRef} className="rs-paper" style={{ opacity: 0, visibility: 'hidden' }}>
                <span className="rs-paper-eyebrow">Script</span>
                <h3 className="rs-paper-heading">Scripted.</h3>
                <pre ref={scriptTextRef} className="rs-paper-script">
                  {SCRIPT_TEXT}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .rs-copy {
          position: relative;
          z-index: 2;
          text-align: center;
          margin: 0 auto clamp(32px, 5vw, 56px);
          max-width: 720px;
        }
        .rs-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(24px, 4vw, 56px);
        }
        .rs-slot {
          position: relative;
          flex: 1 1 auto;
          min-width: 0;
          max-width: 760px;
          aspect-ratio: 16 / 9;
        }
        .rs-camera-img {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Fill the slot box rather than sitting letterboxed inside it —
           the PNG is square, the slot is 16/9, so height is the limit. */
        .rs-camera-img img {
          width: auto !important;
          height: 118% !important;
          max-width: none;
          object-fit: contain;
        }
        .rs-media {
          position: absolute;
          inset: 0;
          perspective: 1400px;
        }
        .rs-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 18px;
          overflow: hidden;
          transform-style: preserve-3d;
          box-shadow: 0 0 0 1px rgba(244,241,214,0.08), 0 30px 80px rgba(0,0,0,0.55);
        }
        .rs-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rs-paper {
          position: absolute;
          inset: 0;
          background: var(--hero-cream, #f4f1d6);
          border-radius: 10px;
          padding: clamp(20px, 1.9vw, 30px) clamp(26px, 2.4vw, 40px);
          aspect-ratio: 16 / 9;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 30px 80px rgba(0,0,0,0.45);
          display: flex;
          flex-direction: column;
        }
        .rs-paper-eyebrow {
          font-size: clamp(10px, 0.85vw, 12px);
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(20,20,20,0.45);
        }
        .rs-paper-heading {
          font-family: var(--font-anton), sans-serif;
          font-weight: 400;
          font-size: clamp(20px, 1.9vw, 30px);
          line-height: 1.1;
          text-transform: uppercase;
          color: #16160f;
          margin: 4px 0 12px;
        }
        .rs-paper-script {
          flex: 1 1 auto;
          margin: 0;
          overflow: hidden;
          white-space: pre-wrap;
          font-family: var(--font-mono, monospace);
          /* Sized so the full 17-line script clears the panel's inner
             height at every width — it is clipped, not scrolled. */
          font-size: clamp(8.5px, 0.66vw, 11px);
          line-height: 1.45;
          color: rgba(20,20,20,0.8);
        }

        @media (max-aspect-ratio: 105/100) {
          .rs-row { flex-direction: column; }
          .rs-slot { max-width: 100%; width: 100%; aspect-ratio: 16 / 9; }
        }
      `}</style>
    </div>
  )
}
