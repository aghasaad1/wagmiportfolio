'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mark } from './ui'

// "Introduction Agha Saad" (youtube.com/watch?v=e4okzv6PPoU), self-hosted so no YouTube player UI shows
const VIDEO_SRC = '/hq/intro.mp4'
const POSTER_SRC = '/hq/intro-poster.jpg' // the video's YouTube thumbnail

// Shows a thumbnail with the WAGMI mark as the play button; the video only downloads once clicked.
export default function Vsl() {
  const [playing, setPlaying] = useState(false)

  return (
    <div data-anim="intro" className="relative mx-auto w-[min(100cqw,880px,calc((100cqh_-_60px)*16/9))] self-start overflow-hidden max-[800px]:w-[min(100cqw,calc((100cqh_-_47px)*16/9))] rounded-[25px] border border-[#f4f1d625] bg-[#14261e]">
      <div className="relative aspect-video">
        {playing ? (
          <video
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            controls
            playsInline
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />
        ) : (
          <button
            aria-label="Play video: See how the system works"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image src={POSTER_SRC} alt="" fill sizes="(max-width: 880px) 100vw, 880px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" priority />
            <span className="absolute inset-0 bg-[#0c1814]/20 transition-colors group-hover:bg-[#0c1814]/5" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_4px_18px_#0c1814] transition-transform duration-300 group-hover:scale-110">
              <span data-float className="block">
                <Mark className="block h-24 w-24 max-[800px]:h-14 max-[800px]:w-14" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex justify-between gap-5 border-t border-[#ffffff0d] px-[23px] py-[17px] text-[14px] max-[800px]:px-[15px] max-[800px]:py-3 max-[800px]:text-[12px]">
        <span>See how the system works</span>
      </div>
    </div>
  )
}
