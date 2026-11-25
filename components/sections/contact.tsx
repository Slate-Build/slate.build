import { availability } from '@/content/studio'
import { Reveal, RevealLines } from '@/components/ui/reveal'

export function Contact() {
  return (
    <section id="contact" className="ink-section mt-24 scroll-mt-24 md:mt-36">
      <div className="shell py-20 md:py-32">
        <Reveal className="mb-10 md:mb-14">
          <div className="flex items-baseline justify-between border-b border-rule-invert pb-4">
            <span className="mono text-[0.6rem] text-paper/45">05 — Contact</span>
            <span className="mono text-[0.6rem] text-paper/45">{availability.detail}</span>
          </div>
        </Reveal>

        <RevealLines
          lines={['Have something', 'in mind?']}
          className="display text-[clamp(2.75rem,10vw,9rem)]"
          lineClassName="pb-[0.04em]"
        />

        <div className="mt-12 grid-12 items-start gap-y-10 md:mt-16">
          <Reveal className="col-span-12 lg:col-span-6" y={26}>
            <p className="max-w-[44ch] text-[1.02rem] leading-relaxed text-paper/70">
              Tell us what you are trying to change, and what it needs to achieve. We reply to every
              enquiry ourselves, and we will say plainly if we are not the right fit for it.
            </p>

            <a
              href="mailto:hello@slate.studio?subject=Project%20enquiry"
              className="group mt-10 inline-flex items-center gap-4 border border-paper/35 px-7 py-5 transition-colors duration-500 hover:border-accent hover:bg-accent"
            >
              <span className="mono text-[0.68rem] text-paper transition-colors duration-500 group-hover:text-ink">
                Start a project
              </span>
              <span
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" y={26}>
            <dl className="flex flex-col gap-5">
              <div className="border-t border-rule-invert pt-4">
                <dt className="mono text-[0.55rem] text-paper/40">Enquiries</dt>
                <dd className="mt-2 flex items-center gap-2 text-[0.98rem]">
                  <span className="inline-block h-[7px] w-[7px] bg-accent" aria-hidden="true" />
                  {availability.status}
                </dd>
              </div>
              <div className="border-t border-rule-invert pt-4">
                <dt className="mono text-[0.55rem] text-paper/40">Email</dt>
                <dd className="mt-2">
                  <a
                    href="mailto:hello@slate.studio"
                    className="tap link-underline text-[0.98rem] text-paper"
                  >
                    hello@slate.studio
                  </a>
                </dd>
              </div>
              <div className="border-t border-rule-invert pt-4">
                <dt className="mono text-[0.55rem] text-paper/40">Focus</dt>
                <dd className="mt-2 text-[0.98rem] leading-relaxed text-paper/75">
                  Digital products, websites, design systems and creative technology.
                </dd>
              </div>
              <div className="border-t border-rule-invert pt-4">
                <dt className="mono text-[0.55rem] text-paper/40">Engagement</dt>
                <dd className="mt-2 text-[0.98rem] leading-relaxed text-paper/75">
                  Project-based and long-term. Scope agreed in writing before work begins.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
