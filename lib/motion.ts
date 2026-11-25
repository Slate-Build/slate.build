'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // Signals to the inline boot script that the motion runtime is alive, so the
  // no-JS fallback never fires while GSAP is working.
  ;(window as unknown as { __slateMotion?: boolean }).__slateMotion = true
}

export { gsap, ScrollTrigger }

export const EASE = {
  out: 'expo.out',
  inOut: 'power4.inOut',
  soft: 'power2.out',
} as const

export const DURATION = {
  fast: 0.45,
  base: 0.9,
  slow: 1.4,
} as const

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Refresh ScrollTrigger after the page settles (fonts + media loaded). */
export function refreshTriggers(): void {
  if (typeof window === 'undefined') return
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
  window.setTimeout(() => ScrollTrigger.refresh(), 300)
}
