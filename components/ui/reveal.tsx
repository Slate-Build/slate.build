'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { EASE, gsap, prefersReducedMotion, ScrollTrigger } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  delay?: number
  y?: number
  duration?: number
  start?: string
  stagger?: number
}

/**
 * Scroll-triggered reveal. Elements start hidden only once JS is confirmed
 * (the `js-ready` class on <html>), so content is never invisible without it.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  y = 26,
  duration = 1.1,
  start = 'top 86%',
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      if (stagger) {
        // The wrapper carries the hidden state from CSS; the staggered
        // children carry the animation, so the wrapper must not stay hidden.
        gsap.set(el, { opacity: 1 })
        gsap.fromTo(
          Array.from(el.children),
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: EASE.out,
            scrollTrigger: { trigger: el, start, once: true },
          },
        )
        return
      }

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, duration, y, start, stagger])

  return (
    <Tag ref={ref as never} className={className} data-reveal>
      {children}
    </Tag>
  )
}

/**
 * Line-by-line mask reveal for oversized headings. Splits text into lines
 * wrapped in overflow-hidden spans so each line rises into place.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll('[data-line-inner]'), { yPercent: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-line-inner]',
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.25,
          delay,
          stagger,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, stagger])

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <span data-line-inner className={`block ${lineClassName ?? ''}`}>
            {line}
          </span>
        </span>
      ))}
    </div>
  )
}

/** Scrubbed progress rail used by the process section. */
export function useScrollProgress(
  trigger: React.RefObject<HTMLElement | null>,
  onUpdate: (progress: number) => void,
) {
  useLayoutEffect(() => {
    const el = trigger.current
    if (!el) return
    if (prefersReducedMotion()) {
      onUpdate(1)
      return
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.6,
      onUpdate: (self) => onUpdate(self.progress),
    })

    return () => st.kill()
  }, [trigger, onUpdate])
}
