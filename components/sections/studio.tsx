import { capabilities, studioPrinciples } from '@/content/studio'
import { Reveal, RevealLines } from '@/components/ui/reveal'

export function Studio() {
  return (
    <section id="studio" className="shell scroll-mt-24 pt-24 md:pt-36">
      <Reveal className="mb-10 md:mb-16">
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <span className="mono text-[0.6rem] text-ink/45">03 — Studio</span>
          <span className="mono text-[0.6rem] text-ink/45">How we work</span>
        </div>
      </Reveal>

      <div className="grid-12 gap-y-12">
        <Reveal className="col-span-12 lg:col-span-7">
          <RevealLines
            lines={[
              'Design and',
              'engineering are',
              'the same job.',
            ]}
            className="display text-[clamp(2.25rem,5.6vw,5rem)]"
            lineClassName="pb-[0.06em]"
          />
          <p className="mt-8 max-w-[46ch] text-[1.02rem] leading-relaxed text-ink/75">
            SLATE BUILD is an independent digital design and technology practice. We build digital
            experiences, websites, software products and the technology underneath them. The
            work is deliberately small in scale and deliberately high in standard: fewer projects,
            each carried by the people who designed it.
          </p>
          <p className="mt-5 max-w-[46ch] text-[1.02rem] leading-relaxed text-ink/75">
            We are not a template shop and we are not a production line. What we bring is
            judgement — the ability to decide what a thing should be before it exists, and the
            engineering to make that decision survive contact with a browser.
          </p>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" y={30}>
          <ul className="flex flex-col">
            {studioPrinciples.map((principle) => (
              <li key={principle.index} className="border-t border-rule py-5 last:border-b">
                <div className="flex items-baseline gap-4">
                  <span className="mono text-[0.58rem] text-accent">{principle.index}</span>
                  <h3 className="text-[1.02rem] font-semibold tracking-[-0.01em]">
                    {principle.title}
                  </h3>
                </div>
                <p className="mt-2 pl-[1.85rem] text-[0.92rem] leading-relaxed text-ink/65">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-16 md:mt-24" y={24}>
        <div className="border-t border-rule pt-6">
          <span className="mono text-[0.6rem] text-ink/45">In-house capabilities</span>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="mono border-l border-rule pl-3 text-[0.6rem] leading-relaxed text-ink/60"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
