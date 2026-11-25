import Link from 'next/link'
import { projects } from '@/content/studio'
import { ProjectVisual } from '@/components/ui/project-visual'
import { Reveal } from '@/components/ui/reveal'

export function Work() {
  return (
    <section id="work" className="shell scroll-mt-24 pt-24 md:pt-36">
      <Reveal className="mb-10 md:mb-16">
        <div className="flex items-baseline justify-between border-b border-rule pb-4">
          <span className="mono text-[0.6rem] text-ink/45">01 — Selected work</span>
          <span className="mono text-[0.6rem] text-ink/45">Concept studies</span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-0">
        {projects.map((project, i) => {
          const flipped = i % 2 === 1
          return (
            <Reveal key={project.slug} className="border-b border-rule" y={40}>
              <article className="grid-12 items-end gap-y-8 py-10 md:py-16">
                <Link
                  href={`/work/${project.slug}`}
                  className={`col-span-12 block lg:col-span-7 ${
                    flipped ? 'lg:order-2 lg:col-start-6' : 'lg:order-1'
                  }`}
                  aria-label={`${project.title} — open concept study`}
                >
                  <ProjectVisual
                    visual={project.visual}
                    title={project.title}
                    className="aspect-[16/10] w-full border border-rule"
                  />
                </Link>

                <div
                  className={`col-span-12 flex flex-col gap-5 lg:col-span-4 lg:px-8 ${
                    flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-9'
                  }`}
                >
                  <div className="flex items-baseline justify-between border-b border-rule pb-3">
                    <span className="mono text-[0.6rem] text-ink/45">{project.index}</span>
                    <span className="mono text-[0.6rem] text-ink/45">{project.year}</span>
                  </div>

                  <h3 className="display text-[clamp(2.25rem,4.4vw,3.75rem)]">
                    <Link href={`/work/${project.slug}`} className="transition-colors hover:text-accent">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mono text-[0.58rem] text-accent">Concept study — self-initiated</p>

                  <p className="max-w-[40ch] text-[0.95rem] leading-relaxed text-ink/70">
                    {project.summary}
                  </p>

                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.disciplines.map((d) => (
                      <li key={d} className="mono text-[0.55rem] text-ink/40">
                        {d}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/work/${project.slug}`}
                    className="tap mono group/link flex w-fit items-center gap-2 text-[0.62rem] text-ink"
                  >
                    <span className="link-underline">View study</span>
                    <span
                      className="inline-block transition-transform duration-500 group-hover/link:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="pt-8">
        <p className="mono max-w-[52ch] text-[0.6rem] leading-relaxed text-ink/45">
          Every project shown here is a self-initiated concept study produced by SLATE BUILD. No
          client engagements, commissioned work or measured results are represented on this site.
        </p>
      </Reveal>
    </section>
  )
}
