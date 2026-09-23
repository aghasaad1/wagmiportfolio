/**
 * Which site design is live.
 *
 *  'hq'     — WAGMI HQ LLC single-page site (app/_hq), ported from /chatgpt.
 *  'legacy' — the previous multi-page WAGMI site (app/_legacy + app/components,
 *             plus /careers, /services, /work, /meet-the-team).
 *
 * Flip this one value to switch. Nothing from either design is deleted.
 * While 'hq' is active, proxy.ts redirects the legacy sub-pages to '/'.
 */
export const ACTIVE_DESIGN: 'hq' | 'legacy' = 'hq'
