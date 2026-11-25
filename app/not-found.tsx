import Link from 'next/link'
import { RevealLines } from '@/components/ui/reveal'

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center px-[var(--gutter)] pt-[72px] md:pt-[84px]">
      <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative flex items-baseline justify-between border-b border-rule pb-4">
        <span className="mono text-[0.6rem] text-ink/45">Error 404</span>
        <span className="mono text-[0.6rem] text-ink/45">Plate not in the archive</span>
      </div>

      <RevealLines
        lines={['Nothing', 'measured', 'here.']}
        className="display relative mt-12 text-[clamp(3rem,13vw,11rem)]"
      />

      <div className="relative mt-10 flex flex-wrap items-center gap-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 border border-ink/25 px-7 py-5 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
        >
          <span className="mono text-[0.68rem]">Back to SLATE BUILD</span>
          <span
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
        <Link href="/#work" className="tap mono link-underline text-[0.62rem] text-ink/70">
          See the work
        </Link>
      </div>
    </main>
  )
}
