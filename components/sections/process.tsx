'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { process } from '@/content/studio'
import { prefersReducedMotion, ScrollTrigger } from '@/lib/motion'
import { Reveal } from '@/components/ui/reveal'

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(0)

  const handleProgress = useCallback((progress: number) => {
    const index = Math.min(process.length - 1, Math.floor(progress * process.length))
    setActive(index)
    if (railRef.current) {
      railRef.current.style.transform = `scaleY(${Math.max(0.04, progress)})`
    }
  }, [])

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (prefersReducedMotion()) {
      handleProgress(1)
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 72%',
      end: 'bottom 65%',
      scrub: 0.5,
      onUpdate: (self) => handleProgress(self.progress),
    })

    return () => trigger.kill()
  }, [handleProgress])

  return (
    <section id="process" className="shell scroll-mt-24 pt-24 md:pt-36">
      <Reveal className="mb-10 md:mb-16">
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <span className="mono text-[0.6rem] text-ink/45">04 — Process</span>
          <span className="mono text-[0.6rem] text-ink/45">
            Phase {String(active + 1).padStart(2, '0')} / 05
          </span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,4.25rem)]">
          Five moves, in order, every time.
        </h2>
      </Reveal>

      <div ref={containerRef} className="relative mt-12 pl-6 md:mt-16 md:pl-16">
        {/* rail */}
        <span
          className="absolute left-0 top-0 hidden h-full w-px bg-rule md:block"
          aria-hidden="true"
        />
        <span
          ref={railRef}
          className="absolute left-0 top-0 hidden h-full w-px origin-top bg-accent md:block"
          style={{ transform: 'scaleY(0.04)' }}
          aria-hidden="true"
        />

        <div className="flex flex-col">
          {process.map((phase, i) => {
            const isActive = i <= active
            return (
              <div
                key={phase.index}
                className="group relative border-b border-rule py-7 md:py-9"
                style={{ paddingLeft: `clamp(0px, ${i * 5.5}vw, 92px)` }}
              >
                <span
                  className="absolute -left-[1.55rem] top-9 hidden h-[7px] w-[7px] -translate-x-1/2 transition-colors duration-500 md:block"
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'var(--paper)',
                    boxShadow: isActive ? '0 0 0 1px var(--accent)' : '0 0 0 1px var(--rule-strong)',
                  }}
                  aria-hidden="true"
                />

                <div className="grid-12 items-baseline gap-y-3">
                  <span
                    className={`mono col-span-3 text-[0.62rem] transition-colors duration-500 lg:col-span-1 ${
                      isActive ? 'text-accent' : 'text-ink/30'
                    }`}
                  >
                    {phase.index}
                  </span>

                  <h3
                    className={`display col-span-9 text-[clamp(1.6rem,3.4vw,2.75rem)] transition-colors duration-700 lg:col-span-4 ${
                      isActive ? 'text-ink' : 'text-ink/35'
                    }`}
                  >
                    {phase.title}
                  </h3>

                  <p className="col-span-12 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink/65 lg:col-span-5 lg:col-start-8">
                    {phase.description}
                  </p>

                  <span className="mono col-span-12 text-[0.55rem] leading-relaxed text-ink/40 lg:col-span-2 lg:col-start-11">
                    {phase.output}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
