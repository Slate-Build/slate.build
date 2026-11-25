'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/motion'

/**
 * Precision cursor: a hairline crosshair that follows the pointer and
 * widens over interactive elements. Native cursors are kept as the
 * fallback — the custom one only takes over once the component mounts.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    document.documentElement.classList.add('cursor-hidden')

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' })

    let labelText = ''

    const onMove = (event: MouseEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
      cursor.style.opacity = '1'
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const interactive = target?.closest('a, button, [data-cursor]') as HTMLElement | null
      if (interactive) {
        const custom = interactive.getAttribute('data-cursor')
        labelText = custom ?? ''
        cursor.classList.add('is-active')
        if (labelRef.current) labelRef.current.textContent = labelText
      }
    }

    const onOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('a, button, [data-cursor]')) {
        cursor.classList.remove('is-active')
        if (labelRef.current) labelRef.current.textContent = ''
      }
    }

    const onLeave = () => {
      cursor.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('cursor-hidden')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 mix-blend-difference"
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <span className="block h-[18px] w-[18px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/70" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/70" />
        </span>
        <span
          ref={labelRef}
          className="mono absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[0.5rem] text-white/80"
        />
      </div>
    </div>
  )
}
