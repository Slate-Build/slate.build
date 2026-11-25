'use client'

/**
 * Tiny signal bus between the site loader and the page.
 *
 * The loader lives in the root layout, so it survives client-side navigation
 * and must not replay. The page uses `onLoaderComplete` to hold its entrance
 * animation until the curtain has actually revealed it.
 */

type Listener = () => void

const listeners = new Set<Listener>()

let present = false
let completed = false

/** Called by the loader on mount (layout effect, before page effects run). */
export function markLoaderPresent(): void {
  present = true
}

/** Called by the loader when the curtain has finished travelling. */
export function markLoaderComplete(): void {
  completed = true
  listeners.forEach((listener) => listener())
  listeners.clear()
}

/** True when a loader is mounted in the tree. */
export function hasLoader(): boolean {
  return present
}

/** True once the loader has completed during this page session. */
export function isLoaderComplete(): boolean {
  return completed
}

/**
 * Runs the callback once the loader is done. If the loader already finished,
 * the callback runs immediately. Returns an unsubscribe function.
 */
export function onLoaderComplete(callback: () => void): () => void {
  if (completed) {
    callback()
    return () => {}
  }
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}
