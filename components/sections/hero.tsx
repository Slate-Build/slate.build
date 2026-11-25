'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { EASE, gsap, prefersReducedMotion } from '@/lib/motion'
import { hasLoader, onLoaderComplete } from '@/lib/loader-bus'

/** Orthographic construction of a stone slab — the hero centrepiece. */
function Slab() {
  return (
    <svg viewBox="0 0 600 620" className="h-full w-full" role="presentation" aria-hidden="true">
      <g stroke="currentColor" fill="none" strokeWidth="1">
        {/* construction geometry */}
        <ellipse cx="300" cy="300" rx="232" ry="152" strokeOpacity="0.14" strokeDasharray="2 6" />
        <line x1="300" y1="40" x2="300" y2="560" strokeOpacity="0.12" strokeDasharray="3 7" />
        <line x1="40" y1="300" x2="560" y2="300" strokeOpacity="0.12" strokeDasharray="3 7" />
      </g>

      <g className="slab-body">
        {/* right face — shadow side */}
        <path
          d="M 480 200 L 300 282 L 300 470 L 480 388 Z"
          fill="var(--ink)"
          fillOpacity="0.17"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* left face */}
        <path
          d="M 120 200 L 300 282 L 300 470 L 120 388 Z"
          fill="var(--ink)"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* top face — lit */}
        <path
          d="M 120 200 L 300 118 L 480 200 L 300 282 Z"
          fill="var(--paper)"
          fillOpacity="0.94"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* front edge */}
        <path d="M 300 282 L 300 470" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* surface texture */}
        <path
          d="M 196 176 L 300 126 L 404 176 L 300 226 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.28"
        />
      </g>

      {/* dimension lines */}
      <g stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6">
        <line x1="120" y1="502" x2="480" y2="502" />
        <line x1="120" y1="494" x2="120" y2="510" />
        <line x1="480" y1="494" x2="480" y2="510" />
        <line x1="522" y1="200" x2="522" y2="388" />
        <line x1="514" y1="200" x2="530" y2="200" />
        <line x1="514" y1="388" x2="530" y2="388" />
      </g>

      {/* accent marker */}
      <g>
        <rect x="294" y="276" width="12" height="12" fill="var(--accent)" />
        <line x1="300" y1="288" x2="300" y2="470" stroke="var(--accent)" strokeWidth="1.4" />
      </g>
    </svg>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const slabRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const [coords, setCoords] = useState({ x: 420, y: 168 })

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set('[data-hero], [data-line-inner]', { opacity: 1, yPercent: 0, xPercent: 0 })
      return
    }

    const ctx = gsap.context(() => {
      /* Hold the entrance state from the first paint, so nothing pops into
         view behind the loader curtain. */
      gsap.set('[data-hero-rule]', { scaleX: 0 })
      gsap.set('[data-line-inner]', { yPercent: 115 })
      gsap.set('[data-hero-fade]', { opacity: 0, y: 18 })
      gsap.set('[data-slab]', { opacity: 0, y: 42, rotateX: 16, scale: 0.94 })
      gsap.set('[data-slab-dim]', { opacity: 0 })
    }, el)

    ctx.add('playIntro', () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.out } })

      tl.fromTo('[data-hero-rule]', { scaleX: 0 }, { scaleX: 1, duration: 1.1, transformOrigin: 'left center' })
        .fromTo(
          '[data-line-inner]',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.35, stagger: 0.075 },
          0.15,
        )
        .fromTo(
          '[data-hero-fade]',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.09 },
          0.55,
        )
        .fromTo(
          '[data-slab]',
          { opacity: 0, y: 42, rotateX: 16, scale: 0.94 },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.6 },
          0.35,
        )
        .fromTo('[data-slab-dim]', { opacity: 0 }, { opacity: 1, duration: 0.9, stagger: 0.1 }, 0.95)

      return tl
    })

    // Subtle parallax: the plate drifts slower than the page.
    const slab = slabRef.current
    if (slab) {
      gsap.to(slab, {
        y: 96,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    }

    /* The entrance waits for the loader curtain to clear the screen. */
    let played = false
    const play = () => {
      if (played) return
      played = true
      ctx.playIntro()
    }

    let unsubscribe = () => {}
    let timer = 0

    if (hasLoader()) {
      unsubscribe = onLoaderComplete(play)
      timer = window.setTimeout(play, 9000)
    } else {
      play()
    }

    return () => {
      window.clearTimeout(timer)
      unsubscribe()
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const slab = slabRef.current
    if (!slab || prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rotateY = gsap.quickTo(slab, 'rotateY', { duration: 0.9, ease: 'power3.out' })
    const rotateX = gsap.quickTo(slab, 'rotateX', { duration: 0.9, ease: 'power3.out' })

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      rotateY(nx * 14)
      rotateX(-ny * 10)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const onPointerMove = (event: React.MouseEvent) => {
    if (readoutRef.current) {
      const x = Math.round((event.clientX / window.innerWidth) * 999)
      const y = Math.round((event.clientY / window.innerHeight) * 999)
      setCoords({ x, y })
    }
  }

  return (
    <section
      ref={root}
      onMouseMove={onPointerMove}
      className="relative min-h-[100svh] overflow-hidden pt-[72px] md:pt-[84px]"
    >
      <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative flex min-h-[calc(100svh-72px)] flex-col md:min-h-[calc(100svh-84px)]">
        {/* meta rail ------------------------------------------------------- */}
        <div className="flex items-center justify-between border-b border-rule py-4" data-hero-fade>
          <span className="mono text-[0.55rem] text-ink/45">Plate 01 — Index</span>
          <span className="mono hidden text-[0.55rem] text-ink/45 sm:block">
            Independent digital design & technology practice
          </span>
          <span className="mono text-[0.55rem] text-ink/45" ref={readoutRef}>
            X {String(coords.x).padStart(4, '0')} / Y {String(coords.y).padStart(4, '0')}
          </span>
        </div>

        {/* headline + centrepiece ------------------------------------------ */}
        <div className="relative flex flex-1 flex-col justify-center py-10 md:py-16">
          <h1 className="display relative z-20 text-[clamp(3rem,13.2vw,12rem)]">
            <span className="block overflow-hidden">
              <span data-line-inner className="block">
                We make
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-line-inner className="block pl-[8vw]">
                digital
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-line-inner className="block">
                matter
                <span className="inline-block translate-y-[-0.08em] text-[0.68em] text-accent">.</span>
              </span>
            </span>
          </h1>

          <div
            data-slab
            className="pointer-events-none relative z-10 mb-8 ml-auto w-[70%] lg:absolute lg:right-[6%] lg:top-1/2 lg:mb-0 lg:ml-0 lg:w-[40%] lg:-translate-y-1/2"
            style={{ perspective: '1200px' }}
          >
            <div ref={slabRef} className="h-auto w-full" style={{ transformStyle: 'preserve-3d' }}>
              <Slab />
            </div>
            <span
              data-slab-dim
              className="mono absolute bottom-[-1.4rem] left-0 text-[0.5rem] text-ink/40 lg:bottom-auto lg:-top-6"
            >
              Fig. 01 — slab study, 1200 × 640
            </span>
          </div>
        </div>

        {/* foot ----------------------------------------------------------- */}
        <div className="relative z-20 grid-12 items-end gap-y-8 border-t border-rule py-8 md:py-10">
          <div className="col-span-12 lg:col-span-5" data-hero-fade>
            <p className="max-w-[46ch] text-[1rem] leading-relaxed text-ink/75 md:text-[1.05rem]">
              Independent digital practice building thoughtful websites, distinctive digital
              experiences, and technology that moves businesses forward.
            </p>
          </div>

          <div className="col-span-12 flex flex-wrap items-center gap-6 lg:col-span-4 lg:col-start-7" data-hero-fade>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3 border border-ink/25 px-6 py-4 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <span className="mono text-[0.62rem]">Start a project</span>
              <span
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
            <Link
              href="#work"
              className="tap mono link-underline text-[0.62rem] text-ink/70 transition-colors hover:text-ink"
            >
              See the work
            </Link>
          </div>

          <div className="col-span-12 flex items-end justify-between lg:col-span-2 lg:col-start-11" data-hero-fade>
            <span className="mono hidden text-[0.55rem] text-ink/40 md:block">Scroll</span>
            <span className="relative block h-14 w-px overflow-hidden bg-rule" aria-hidden="true">
              <span className="scroll-bead absolute inset-x-0 top-0 h-4 bg-accent" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
