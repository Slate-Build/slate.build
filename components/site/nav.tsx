'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { availability } from '@/content/studio'
import { NavMark } from '@/components/site/nav-mark'

const LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Contact', href: '/#contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button')
    focusables?.[0]?.focus()

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          open
            ? 'bg-paper'
            : scrolled
              ? 'bg-paper/92 backdrop-blur-[10px]'
              : 'bg-transparent'
        }`}
      >
        <div className="shell">
          <div
            className={`flex h-[72px] items-center justify-between gap-6 transition-[border-color] duration-500 md:h-[84px] ${
              open ? 'border-b border-rule' : scrolled ? 'border-b border-rule' : 'border-b border-transparent'
            }`}
          >
            <Link
              href="/"
              className="tap group relative flex items-center gap-2.5 md:gap-3"
              aria-label="SLATE BUILD — home"
            >
              <NavMark />
              <span className="flex items-baseline gap-1.5">
                <span className="flex items-baseline gap-[0.14em]">
                  <span className="display text-[1.35rem] leading-[0.84] tracking-[-0.045em] md:text-[1.6rem]">
                    SLATE
                  </span>
                  <span className="display text-[1.35rem] leading-[0.84] tracking-[-0.045em] text-accent md:text-[1.6rem]">
                    BUILD
                  </span>
                </span>
                <span className="mono text-[1rem] leading-none text-ink/45 transition-colors group-hover:text-accent">
                  ®
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="tap mono link-underline text-[0.66rem] text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] bg-accent" />
              </span>
              <span className="mono text-[0.62rem] text-ink/60">{availability.status}</span>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="mono relative z-50 flex h-10 w-10 items-center justify-end text-[0.66rem] text-ink md:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="flex h-[10px] w-6 flex-col justify-between">
                <span
                  className={`block h-px w-full bg-ink transition-transform duration-500 ${
                    open ? 'translate-y-[4.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-px w-full bg-ink transition-transform duration-500 ${
                    open ? '-translate-y-[4.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu ---------------------------------------------------------- */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-[96px] text-paper transition-[clip-path,visibility] duration-700 md:hidden ${
          open ? 'visible [clip-path:inset(0_0_0%_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {LINKS.map((link, i) => (
              <li key={link.label} className="border-b border-rule-invert">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline justify-between py-5"
                >
                  <span
                    className="display text-[13vw] leading-[0.9]"
                    style={{
                      transitionDelay: open ? `${120 + i * 55}ms` : '0ms',
                      transform: open ? 'translateY(0)' : 'translateY(18px)',
                      opacity: open ? 1 : 0,
                      transition:
                        'transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 500ms ease',
                    }}
                  >
                    {link.label}
                  </span>
                  <span className="mono text-[0.6rem] text-paper/45">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="mono flex flex-col gap-3 text-[0.62rem] text-paper/55"
          style={{
            transitionDelay: open ? '320ms' : '0ms',
            opacity: open ? 1 : 0,
            transition: 'opacity 600ms ease',
          }}
        >
          <span className="flex items-center gap-2 text-paper">
            <span className="inline-block h-[7px] w-[7px] bg-accent" />
            {availability.status}
          </span>
          <a
            href="mailto:hello@slate.studio"
            tabIndex={open ? 0 : -1}
            className="tap link-underline w-fit"
          >
            hello@slate.studio
          </a>
        </div>
      </div>
    </>
  )
}
