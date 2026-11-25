import Link from 'next/link'
import { availability } from '@/content/studio'

const LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Process', href: '/#process' },
  { label: 'Contact', href: '/#contact' },
]

export function Footer() {
  return (
    <footer className="shell pb-10 pt-14 md:pt-20">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <p className="display text-[clamp(3rem,9vw,6rem)] leading-[0.82]">
            <span className="block">SLATE</span>
            <span className="block text-accent">BUILD</span>
          </p>
          <p className="mono mt-6 max-w-[32ch] text-[0.58rem] leading-relaxed text-ink/45">
            Independent digital design & technology practice.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3 md:col-start-7">
          <span className="mono text-[0.55rem] text-ink/35">Index</span>
          <ul className="mt-4 flex flex-col gap-2">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="tap link-underline text-[0.95rem] text-ink/75 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-3 md:col-start-10">
          <span className="mono text-[0.55rem] text-ink/35">Enquiries</span>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <a
                href="mailto:hello@slate.studio"
                className="tap link-underline text-[0.95rem] text-ink/75 transition-colors hover:text-ink"
              >
                hello@slate.studio
              </a>
            </li>
            <li className="mono flex items-center gap-2 text-[0.58rem] text-ink/45">
              <span className="inline-block h-[7px] w-[7px] bg-accent" aria-hidden="true" />
              {availability.status}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-6 md:mt-20 md:flex-row md:items-baseline md:justify-between">
        <p className="mono text-[0.55rem] text-ink/35">
          © {new Date().getFullYear()} SLATE BUILD — concept site. Contact details are placeholders.
        </p>
        <p className="mono text-[0.55rem] text-ink/35">
          Built with Next.js, Tailwind & GSAP · Set in Archivo & Martian Mono
        </p>
      </div>
    </footer>
  )
}
