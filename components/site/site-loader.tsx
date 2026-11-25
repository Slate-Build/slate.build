'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { isLoaderComplete, markLoaderComplete, markLoaderPresent } from '@/lib/loader-bus'

/* ─── editable sequence ─── */
const numberSequence = ['00', '27', '54', '81', '99']

/* ─── position fractions for the five horizontal stops ─── */
const POSITIONS = [0, 0.25, 0.5, 0.75, 1]

/* ─── digits 0-9 rendered inside each viewport ─── */
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/* ─── timing ─── */
const STEP_DURATION = 1.0
const STEP_GAP = 0.15
const LEAD_IN = 0.45
const NUMBER_EXIT_DURATION = 0.35
const CURTAIN_DURATION = 1.0

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

gsap.registerPlugin(useGSAP)

/**
 * Site loader.
 *
 * Stage 1 — the original number animation: 00 → 27 → 54 → 81 → 99, sliding
 * across the viewport on a dark ground with editorial numerals.
 * Stage 2 — the numbers dissolve, the ground becomes a solid sheet of paper,
 * and that sheet travels upward to reveal the page underneath.
 */
export function SiteLoader() {
  /* Skip immediately when returning to `/` via client navigation after initial load. */
  const [skip] = useState(() => isLoaderComplete())

  /* ── number animation refs ── */
  const containerRef = useRef<HTMLDivElement>(null)
  const numberBlockRef = useRef<HTMLDivElement>(null)
  const tensRefs = useRef<(HTMLDivElement | null)[]>([])
  const unitsRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberWrapRef = useRef<HTMLDivElement>(null)

  /* ── stage refs ── */
  const stageRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  /* ── scroll lock bookkeeping ── */
  const lockRef = useRef<{
    prevOverflow: string
    prevPaddingRight: string
    siblings: HTMLElement[]
  } | null>(null)

  /* ────────────────────────────────────────────────────────────────────
     Scroll + interaction lock.
     Restores the exact previous body overflow when the loader finishes or
     unmounts, and compensates for the scrollbar width so locking the page
     never shifts the layout.
     ──────────────────────────────────────────────────────────────────── */
  const lockPage = () => {
    if (lockRef.current || typeof document === 'undefined') return

    const container = containerRef.current
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    /* Everything except the loader itself is inert: no clicks, no focus. */
    const siblings = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el !== container && el instanceof HTMLElement,
    )
    siblings.forEach((el) => el.setAttribute('inert', ''))

    lockRef.current = { prevOverflow, prevPaddingRight, siblings }
  }

  const unlockPage = () => {
    const lock = lockRef.current
    if (!lock) return

    document.body.style.overflow = lock.prevOverflow
    document.body.style.paddingRight = lock.prevPaddingRight
    lock.siblings.forEach((el) => el.removeAttribute('inert'))

    lockRef.current = null
  }

  /* Announce the loader before any page effect can ask for it. */
  useLayoutEffect(() => {
    if (skip) return
    markLoaderPresent()
  }, [skip])

  /* Release the page if the loader ever goes away. */
  useEffect(() => {
    return () => {
      unlockPage()
    }
  }, [])

  /* Failsafe: the page is never allowed to stay blocked, whatever happens to
     the timeline. */
  useEffect(() => {
    if (skip) return
    const failsafe = window.setTimeout(() => {
      const container = containerRef.current
      if (!container || container.style.display === 'none') return
      unlockPage()
      container.style.display = 'none'
      markLoaderComplete()
    }, 12000)

    return () => window.clearTimeout(failsafe)
  }, [])

  /* ────────────────────────────────────────────────────────────────────
     Digit column width.
     The numerals are viewport-relative, so the columns are sized from the
     widest digit measured in the live font instead of a fixed em value.
     `1ch` — the advance of "0" — is the CSS fallback: it fits the opening
     pair exactly by construction, and the measurement only widens the
     columns when another digit turns out to be wider.
     ──────────────────────────────────────────────────────────────────── */
  const measureDigitWidth = () => {
    const block = numberBlockRef.current
    if (!block) return

    const probe = document.createElement('div')
    probe.style.cssText =
      'position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;pointer-events:none;letter-spacing:0;'

    const spans = DIGITS.map((d) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.letterSpacing = '0'
      span.textContent = String(d)
      probe.appendChild(span)
      return span
    })

    block.appendChild(probe)

    let widest = 0
    spans.forEach((span) => {
      const width = span.getBoundingClientRect().width
      if (width > widest) widest = width
    })

    probe.remove()

    if (widest > 0) {
      block.style.setProperty('--digit-w', `${Math.ceil(widest * 1.02)}px`)
    }
  }

  useEffect(() => {
    let cancelled = false

    const measure = () => {
      if (!cancelled) measureDigitWidth()
    }

    /* Measure once the real font is in, so the columns match the numerals
       that are actually painted. */
    if (document.fonts) {
      document.fonts.ready.then(measure).catch(() => undefined)
    } else {
      measure()
    }

    /* The numerals scale with the viewport, so re-measure on resize. */
    const onResize = () => measureDigitWidth()
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
    }
  }, [])

  /* ─── master GSAP timeline ─── */
  useGSAP(
    () => {
      if (skip || !containerRef.current || !numberBlockRef.current) return

      /* ── reduced motion: no loader at all ── */
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        unlockPage()
        const container = containerRef.current
        gsap.set(container, { autoAlpha: 0, display: 'none' })
        markLoaderComplete()
        return
      }

      lockPage()

      const vw = window.innerWidth
      const blockW = numberBlockRef.current.offsetWidth
      const travelEnd = Math.max(0, vw - blockW)

      /* ── initial digit states ── */
      DIGITS.forEach((d) => {
        const tEl = tensRefs.current[d]
        const uEl = unitsRefs.current[d]
        if (tEl) gsap.set(tEl, { xPercent: d === 0 ? 0 : 110, autoAlpha: d === 0 ? 1 : 0 })
        if (uEl) gsap.set(uEl, { xPercent: d === 0 ? 0 : 110, autoAlpha: d === 0 ? 1 : 0 })
      })
      gsap.set(numberBlockRef.current, { x: 0 })
      gsap.set(stageRef.current, { autoAlpha: 1 })
      gsap.set(curtainRef.current, { yPercent: 0, autoAlpha: 1 })

      /* ══ MASTER TIMELINE ══ */
      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })

      /* ══ STAGE 1 — FIVE-STEP NUMBER ANIMATION (preserved) ══ */
      let cursor = LEAD_IN

      for (let i = 1; i < numberSequence.length; i++) {
        const pT = parseInt(numberSequence[i - 1][0], 10)
        const nT = parseInt(numberSequence[i][0], 10)
        const pU = parseInt(numberSequence[i - 1][1], 10)
        const nU = parseInt(numberSequence[i][1], 10)
        const targetX = travelEnd * POSITIONS[i]
        const digitDur = STEP_DURATION * 0.72
        const digitStart = cursor + STEP_DURATION * 0.12

        tl.to(numberBlockRef.current, { x: targetX, duration: STEP_DURATION }, cursor)

        if (nT !== pT) {
          const outEl = tensRefs.current[pT]
          const inEl = tensRefs.current[nT]
          if (outEl && inEl) {
            tl.set(inEl, { xPercent: 110, autoAlpha: 1 }, cursor)
            tl.to(outEl, { xPercent: -110, duration: digitDur }, digitStart)
            tl.to(inEl, { xPercent: 0, duration: digitDur }, digitStart)
          }
        }

        if (nU !== pU) {
          const outEl = unitsRefs.current[pU]
          const inEl = unitsRefs.current[nU]
          if (outEl && inEl) {
            tl.set(inEl, { xPercent: 110, autoAlpha: 1 }, cursor)
            tl.to(outEl, { xPercent: -110, duration: digitDur }, digitStart)
            tl.to(inEl, { xPercent: 0, duration: digitDur }, digitStart)
          }
        }

        cursor += STEP_DURATION + STEP_GAP
      }

      /* ══ STAGE 2 — NUMBERS OUT, SOLID SHEET, CURTAIN UP ══ */
      const exitStart = cursor

      /* Numbers fade away and the dark stage dissolves into the sheet. */
      tl.to(
        numberWrapRef.current,
        { autoAlpha: 0, duration: NUMBER_EXIT_DURATION, ease: 'power4.inOut' },
        exitStart,
      )
      tl.to(
        stageRef.current,
        { autoAlpha: 0, duration: NUMBER_EXIT_DURATION, ease: 'power4.inOut' },
        exitStart,
      )

      /* The sheet travels upwards, revealing the site behind it. */
      const curtainStart = exitStart + NUMBER_EXIT_DURATION
      tl.to(
        curtainRef.current,
        { yPercent: -100, duration: CURTAIN_DURATION, ease: 'power4.inOut' },
        curtainStart,
      )

      /* Hand the page back. */
      tl.call(
        () => {
          unlockPage()
          const container = containerRef.current
          if (container) container.style.display = 'none'
          markLoaderComplete()
        },
        [],
        curtainStart + CURTAIN_DURATION,
      )
    },
    { scope: containerRef, dependencies: [skip] },
  )

  if (skip) return null

  return (
    <div
      ref={containerRef}
      data-site-loader=""
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ willChange: 'opacity' }}
      aria-live="polite"
      aria-label="Loading"
    >
      {/* SHEET — full viewport overlay that travels upward */}
      <div
        ref={curtainRef}
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--paper)', willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* DARK STAGE — holds the numbers during stage 1 */}
      <div
        ref={stageRef}
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
        aria-hidden="true"
      >
        {/* Large number */}
        <div
          ref={numberWrapRef}
          className="absolute left-0 w-full"
          style={{ bottom: 'clamp(12px, 3vh, 40px)' }}
        >
          <div
            ref={numberBlockRef}
            className="inline-flex items-baseline"
            style={{
              fontFamily: 'var(--font-archivo)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              fontSize: 'clamp(300px, 28vw, 550px)',
              lineHeight: 0.85,
              willChange: 'transform',
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{ width: 'var(--digit-w, 1ch)', height: '0.9em' }}
            >
              {DIGITS.map((d) => (
                <div
                  key={`t-${d}`}
                  ref={(el) => {
                    tensRefs.current[d] = el
                  }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    d === 0 ? '' : 'opacity-0'
                  }`}
                  style={{ willChange: 'transform' }}
                >
                  {d}
                </div>
              ))}
            </div>

            <div
              className="relative overflow-hidden"
              style={{ width: 'var(--digit-w, 1ch)', height: '0.9em' }}
            >
              {DIGITS.map((d) => (
                <div
                  key={`u-${d}`}
                  ref={(el) => {
                    unitsRefs.current[d] = el
                  }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    d === 0 ? '' : 'opacity-0'
                  }`}
                  style={{ willChange: 'transform' }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
