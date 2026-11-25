import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/content/studio'
import { ProjectVisual } from '@/components/ui/project-visual'
import { Reveal, RevealLines } from '@/components/ui/reveal'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: `${project.title} — Concept study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  if (!project) notFound()

  const next = projects[(index + 1) % projects.length]

  return (
    <main className="pt-[72px] md:pt-[84px]">
      <div className="shell">
        <Reveal className="pt-10 md:pt-16">
          <div className="flex items-baseline justify-between border-b border-rule pb-4">
            <span className="mono text-[0.6rem] text-ink/45">
              {project.index} — {project.category}
            </span>
            <span className="mono text-[0.6rem] text-ink/45">{project.year}</span>
          </div>
        </Reveal>

        <RevealLines
          lines={[project.title]}
          className="display pt-10 text-[clamp(3rem,12vw,10rem)] md:pt-14"
        />

        <Reveal className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-center md:gap-8">
          <span className="mono w-fit border border-accent px-3 py-1.5 text-[0.55rem] text-accent">
            Concept study — self-initiated
          </span>
          <p className="max-w-[52ch] text-[1.05rem] leading-relaxed text-ink/75">
            {project.summary}
          </p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14" y={34}>
          <ProjectVisual
            visual={project.visual}
            title={project.title}
            className="aspect-[16/10] w-full border border-rule md:aspect-[16/9]"
          />
        </Reveal>

        <div className="grid-12 gap-y-12 pt-14 md:pt-20">
          <Reveal className="col-span-12 lg:col-span-7">
            <h2 className="mono mb-4 text-[0.6rem] text-ink/40">The premise</h2>
            <p className="text-[1.05rem] leading-relaxed text-ink/80">{project.study.premise}</p>

            <h2 className="mono mb-4 mt-12 text-[0.6rem] text-ink/40">The approach</h2>
            <p className="text-[1.05rem] leading-relaxed text-ink/80">{project.study.approach}</p>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" y={26}>
            <div className="border-t border-rule pt-5">
              <h2 className="mono mb-4 text-[0.6rem] text-ink/40">What it demonstrates</h2>
              <ul className="flex flex-col gap-3">
                {project.study.demonstrates.map((point) => (
                  <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/75">
                    <span className="mt-2 inline-block h-[5px] w-[5px] shrink-0 bg-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 border-t border-rule pt-5">
              <h2 className="mono mb-3 text-[0.6rem] text-ink/40">Status</h2>
              <p className="text-[0.92rem] leading-relaxed text-ink/60">{project.study.status}</p>
            </div>

            <div className="mt-10 border-t border-rule pt-5">
              <h2 className="mono mb-3 text-[0.6rem] text-ink/40">Disciplines</h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {project.disciplines.map((d) => (
                  <li key={d} className="mono text-[0.55rem] text-ink/50">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-rule py-10 md:mt-24 md:flex-row md:items-center md:justify-between">
          <Link href="/#work" className="tap mono link-underline w-fit text-[0.62rem]">
            ← All work
          </Link>
          <Link href={`/work/${next.slug}`} className="tap group flex items-baseline gap-4">
            <span className="mono text-[0.55rem] text-ink/40">Next study</span>
            <span className="display text-[clamp(1.75rem,4vw,3rem)] transition-colors group-hover:text-accent">
              {next.title}
            </span>
            <span
              className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
