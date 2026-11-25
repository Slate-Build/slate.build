'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * Top-edge scroll progress bar and subtle bottom-right percentage readout.
 * Uses GPU-composited `scaleX` via rAF so scroll updates never trigger
 * per-frame React re-renders; React state only updates on integer % changes.
 */
export function PageProgress() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let rafId = 0

    const update = () => {
      rafId = 0
      const doc = document.documentElement
      const maxScroll = doc.scrollHeight - window.innerHeight
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0

      bar.style.transform = `scaleX(${ratio})`
      bar.style.opacity = ratio > 0 ? '1' : '0'

      const nextPercent = Math.round(ratio * 100)
      setPercent((prev) => (prev === nextPercent ? prev : nextPercent))
    }

    const schedule = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    update()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null
    observer?.observe(document.documentElement)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
    }
  }, [pathname])

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] select-none print:hidden"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{
            opacity: 0,
            transform: 'scaleX(0)',
            willChange: 'transform, opacity',
            boxShadow:
              '0 0 8px color-mix(in srgb, var(--accent) 45%, transparent), 0 1px 4px color-mix(in srgb, var(--accent) 25%, transparent)',
          }}
        />
      </div>

      <span
        className="mono pointer-events-none fixed bottom-4 right-4 z-[60] select-none text-[0.55rem] leading-none tracking-[0.06em] text-accent/75 tabular-nums md:bottom-5 md:right-6 print:hidden"
        aria-hidden="true"
      >
        {String(percent).padStart(2, '0')}%
      </span>
    </>
  )
}
