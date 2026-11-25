'use client'

import { useState } from 'react'
import { services } from '@/content/studio'
import { Reveal } from '@/components/ui/reveal'

export function Services() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="services" className="shell scroll-mt-24 pt-24 md:pt-36">
      <Reveal className="mb-10 md:mb-16">
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <span className="mono text-[0.6rem] text-ink/45">02 — Capabilities</span>
          <span className="mono text-[0.6rem] text-ink/45">Five disciplines</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="display max-w-[15ch] text-[clamp(2rem,5vw,4.25rem)]">
          Five capabilities, one team.
        </h2>
      </Reveal>

      <ul onMouseLeave={() => setActive(null)} className="mt-10 md:mt-16">
        {services.map((service, i) => {
          const isActive = active === service.index
          return (
            <Reveal
              key={service.index}
              as="li"
              className="border-b border-rule"
              y={30}
              stagger={0.06}
            >
              <div
                className="group relative py-7 md:py-9"
                onMouseEnter={() => setActive(service.index)}
                onFocus={() => setActive(service.index)}
              >
                {/* sweeping hairline */}
                <span
                  className={`absolute left-0 top-0 h-px bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden="true"
                />

                <div className="grid-12 items-baseline gap-y-3">
                  <span
                    className={`mono col-span-2 text-[0.62rem] transition-colors duration-500 lg:col-span-1 ${
                      isActive ? 'text-accent' : 'text-ink/35'
                    }`}
                  >
                    {service.index}
                  </span>

                  <h3 className="col-span-10 overflow-hidden lg:col-span-6">
                    <span className="relative block">
                      <span className="display block text-[clamp(1.75rem,3.6vw,3.25rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[0.08em] md:group-hover:-translate-y-[0.1em]">
                        {service.title}
                      </span>
                    </span>
                  </h3>

                  <p className="col-span-12 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink/70 lg:col-span-4 lg:col-start-9">
                    {service.description}
                  </p>
                </div>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-5 lg:pl-[8.333%]">
                      {service.deliverables.map((d) => (
                        <li key={d} className="mono text-[0.55rem] text-ink/45">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
