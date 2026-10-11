'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { RiFullscreenExitLine, RiFullscreenLine, RiPauseFill, RiPlayFill, RiVolumeDownFill, RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri'
import { claimPlayback, releasePlayback } from './playback'

const clock = (s: number) => {
  if (!Number.isFinite(s)) return '0:00'
  const t = Math.floor(s)
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const sec = String(t % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`
}

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

const control =
  'grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-transparent text-[18px] text-[#f4f1d6] transition-[background-color,scale] duration-200 hover:bg-[#f4f1d61f] active:scale-90'

/*
 * The site's own player for our MP4s (and Drive streams): play/pause, a seek bar showing what's
 * buffered, time, mute and fullscreen, in the site's colours. The controls fade out while playing
 * and come back on pointer movement or a tap (on touch, the first tap only shows them).
 * Volume: a small glass slider that pops up above the speaker button on hover (touch screens keep just mute; iPhone
 * doesn't let pages set the volume).
 * Keyboard, with the player focused: Space/K play-pause, ←/→ seek 5s, ↑/↓ volume, M mute, F fullscreen.
 * Fullscreen shows the whole frame with black bars; iPhone, which can't fullscreen an element,
 * uses its native player for that.
 */
export default function VideoPlayer({ src, poster, title, onError }: { src: string; poster: string; title: string; onError?: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<FullscreenVideo>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const volRef = useRef<HTMLDivElement>(null)
  const idleTimer = useRef(0)
  const lastPointer = useRef('mouse')

  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [adjusting, setAdjusting] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [waiting, setWaiting] = useState(true)
  const [full, setFull] = useState(false)
  const [idle, setIdle] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)

  const wake = useCallback(() => {
    setIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => setIdle(true), 2500)
  }, [])

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === boxRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      clearTimeout(idleTimer.current)
    }
  }, [])

  // Starting this video pauses any other on the page (see playback.ts)
  const pauseSelf = useCallback(() => {
    videoRef.current?.pause()
  }, [])
  useEffect(() => () => releasePlayback(pauseSelf), [pauseSelf])

  const hidden = idle && !paused && !scrubbing

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) void v.play()
    else v.pause()
  }
  const seek = (t: number) => {
    const v = videoRef.current
    if (!v || !duration) return
    v.currentTime = Math.min(duration, Math.max(0, t))
    setCurrent(v.currentTime)
  }
  const mute = () => {
    const v = videoRef.current
    if (!v) return
    // Unmuting at zero volume would stay silent, so bring it back to half
    if (v.muted && v.volume === 0) v.volume = 0.5
    v.muted = !v.muted
  }
  const setLevel = (x: number) => {
    const v = videoRef.current
    if (!v) return
    v.volume = Math.min(1, Math.max(0, x))
    v.muted = v.volume === 0
  }
  // Volume from a pointer's height on the vertical slider (top = full)
  const levelAt = (clientY: number) => {
    const r = volRef.current?.getBoundingClientRect()
    return r ? (r.bottom - clientY) / r.height : 1
  }
  const level = muted ? 0 : volume
  const fullscreen = () => {
    const box = boxRef.current
    if (document.fullscreenElement) void document.exitFullscreen()
    else if (box?.requestFullscreen) void box.requestFullscreen()
    else videoRef.current?.webkitEnterFullscreen?.()
  }

  const timeAt = (clientX: number) => {
    const r = barRef.current?.getBoundingClientRect()
    return r ? Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * duration : 0
  }

  const played = duration ? (current / duration) * 100 : 0
  const loaded = duration ? (buffered / duration) * 100 : 0

  return (
    <div
      ref={boxRef}
      // Dragging on the player shouldn't scroll the slider it sits in (see useDragScroll)
      data-no-drag
      tabIndex={0}
      role="group"
      aria-label={title}
      onPointerDown={(e) => {
        lastPointer.current = e.pointerType
        wake()
      }}
      onPointerMove={(e) => e.pointerType === 'mouse' && wake()}
      onKeyDown={(e) => {
        const onButton = (e.target as HTMLElement).closest('button')
        if ((e.key === ' ' || e.key === 'k') && !onButton) toggle()
        else if (e.key === 'ArrowRight') seek(current + 5)
        else if (e.key === 'ArrowLeft') seek(current - 5)
        else if (e.key === 'ArrowUp') setLevel(level + 0.1)
        else if (e.key === 'ArrowDown') setLevel(level - 0.1)
        else if (e.key === 'm') mute()
        else if (e.key === 'f') fullscreen()
        else return
        e.preventDefault()
        wake()
      }}
      className={`absolute inset-0 overflow-hidden bg-black outline-none ${hidden ? 'cursor-none' : ''}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        autoPlay
        playsInline
        preload="metadata"
        onClick={() => {
          // On touch, a tap while the controls are hidden just brings them back
          if (lastPointer.current !== 'mouse' && hidden) return
          toggle()
        }}
        onPlay={() => {
          claimPlayback(pauseSelf)
          setPaused(false)
          wake()
        }}
        onPause={() => setPaused(true)}
        onEnded={() => setPaused(true)}
        onTimeUpdate={(e) => !scrubbing && setCurrent(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onProgress={(e) => {
          const b = e.currentTarget.buffered
          if (b.length) setBuffered(b.end(b.length - 1))
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted)
          setVolume(e.currentTarget.volume)
        }}
        onError={onError}
        className={`absolute inset-0 h-full w-full ${full ? 'object-contain' : 'object-cover'}`}
      />

      {/* Centre: a spinner while loading, the play disc while paused */}
      {waiting && !paused && (
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-[3px] border-[#f4f1d633] border-t-[#f3e38a]" />
      )}
      {paused && (
        <button
          type="button"
          aria-label="Play"
          onClick={toggle}
          style={{ '--glass-dark': 0.12, '--glow': 1, '--gx': 22, '--gy': 12 } as React.CSSProperties}
          className="hq-glass absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-[26px] text-[#f4f1d6] transition-[scale] duration-300 hover:scale-110"
        >
          <RiPlayFill className="ml-0.5" />
        </button>
      )}

      {/* Bottom bar */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c1814e6] via-[#0c181480] to-transparent px-3 pb-2 pt-10 transition-opacity duration-300 ${
          hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div
          ref={barRef}
          role="slider"
          tabIndex={-1}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          aria-valuetext={`${clock(current)} of ${clock(duration)}`}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            setScrubbing(true)
            seek(timeAt(e.clientX))
          }}
          onPointerMove={(e) => scrubbing && seek(timeAt(e.clientX))}
          onPointerUp={() => setScrubbing(false)}
          onPointerCancel={() => setScrubbing(false)}
          className="group/bar relative flex h-5 cursor-pointer touch-none items-center"
        >
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#f4f1d633] transition-[height] duration-200 group-hover/bar:h-1.5">
            <div className="absolute inset-y-0 left-0 bg-[#f4f1d659]" style={{ width: `${loaded}%` }} />
            <div className="absolute inset-y-0 left-0 bg-[#f3e38a]" style={{ width: `${played}%` }} />
          </div>
          <span
            aria-hidden="true"
            className={`absolute h-3 w-3 -translate-x-1/2 rounded-full bg-[#f3e38a] shadow-[0_0_10px_#f3e38a80] transition-[scale] duration-200 ${
              scrubbing ? 'scale-125' : 'scale-0 group-hover/bar:scale-100'
            }`}
            style={{ left: `${played}%` }}
          />
        </div>

        <div className="flex items-center gap-1">
          <button type="button" aria-label={paused ? 'Play' : 'Pause'} onClick={toggle} className={control}>
            {paused ? <RiPlayFill /> : <RiPauseFill />}
          </button>
          <span className="ml-1 text-[12px] font-bold tabular-nums text-[#d9dcc4]">
            {clock(current)} <span className="text-[#9eafa0]">/ {clock(duration)}</span>
          </span>
          <span className="flex-1" />
          {/* Speaker button; hovering or focusing it opens a small glass volume slider above it */}
          <div className="group/vol relative flex items-center">
            <button type="button" aria-label={muted ? 'Unmute' : 'Mute'} onClick={mute} className={control}>
              {level === 0 ? <RiVolumeMuteFill /> : level < 0.5 ? <RiVolumeDownFill /> : <RiVolumeUpFill />}
            </button>
            {/* pb-2 bridges the gap to the button so the pop-up stays open on the way up */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 pb-2 transition-[opacity,translate] duration-200 ease-out group-focus-within/vol:pointer-events-auto group-focus-within/vol:translate-y-0 group-focus-within/vol:opacity-100 group-hover/vol:pointer-events-auto group-hover/vol:translate-y-0 group-hover/vol:opacity-100 [@media(hover:none)]:hidden ${
                adjusting ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'
              }`}
            >
              <div style={{ '--glass-dark': 0.55 } as React.CSSProperties} className="hq-glass rounded-full px-[10px] py-3">
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Volume"
                  aria-orientation="vertical"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(level * 100)}
                  onKeyDown={(e) => {
                    const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 0.1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -0.1 : 0
                    if (!step) return
                    e.preventDefault()
                    e.stopPropagation()
                    setLevel(level + step)
                  }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    setAdjusting(true)
                    setLevel(levelAt(e.clientY))
                  }}
                  onPointerMove={(e) => adjusting && setLevel(levelAt(e.clientY))}
                  onPointerUp={() => setAdjusting(false)}
                  onPointerCancel={() => setAdjusting(false)}
                  className="flex h-[84px] w-4 cursor-pointer touch-none justify-center outline-none"
                >
                  <div ref={volRef} className="relative h-full w-1 rounded-full bg-[#f4f1d633]">
                    <div className="absolute inset-x-0 bottom-0 rounded-full bg-[#f3e38a]" style={{ height: `${level * 100}%` }} />
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#f3e38a] shadow-[0_0_10px_#f3e38a80]"
                      style={{ bottom: `${level * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" aria-label={full ? 'Exit fullscreen' : 'Fullscreen'} onClick={fullscreen} className={control}>
            {full ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
          </button>
        </div>
      </div>
    </div>
  )
}
