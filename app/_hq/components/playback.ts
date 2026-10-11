/*
 * Only one video plays at a time across the page. A player claims playback when it starts, which
 * pauses whichever one held it; switching a Work tab pauses the current one. Players stay mounted
 * when paused, so playing one again picks up where it left off.
 */
type Pause = () => void
let current: Pause | null = null

export function claimPlayback(pause: Pause) {
  if (current && current !== pause) current()
  current = pause
}

// Call when a player unmounts
export function releasePlayback(pause: Pause) {
  if (current === pause) current = null
}

export function pausePlayback() {
  current?.()
  current = null
}
