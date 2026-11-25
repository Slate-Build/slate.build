'use client'

import { useId } from 'react'
import type { Project } from '@/content/studio'

/* Deterministic pseudo-random so server and client render identically. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function contourPath(cx: number, cy: number, r: number, wobble: number, seed: number) {
  const rand = rng(seed)
  const points: [number, number][] = []
  const steps = 28
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2
    const offset = 1 + (rand() - 0.5) * wobble
    points.push([cx + Math.cos(angle) * r * offset, cy + Math.sin(angle) * r * offset * 0.72])
  }
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const cx1 = (x0 + x1) / 2
    const cy1 = (y0 + y1) / 2
    d += ` Q ${x0.toFixed(1)} ${y0.toFixed(1)} ${cx1.toFixed(1)} ${cy1.toFixed(1)}`
  }
  return `${d} Z`
}

function Meridian() {
  const uid = useId().replace(/:/g, '')
  const lat = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="presentation" aria-hidden="true">
      <defs>
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y="0" width="800" height="500" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-clip)`}>
        {lat.map((i) => {
          const y = 90 + i * 45
          const curve = 26 - Math.abs(i - 3.5) * 5
          return (
            <path
              key={i}
              d={`M -20 ${y} C 180 ${y - curve}, 420 ${y + curve}, 820 ${y - curve * 0.4}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={i === 3 ? 1.6 : 0.8}
              strokeOpacity={i === 3 ? 0.85 : 0.4}
              className="visual-line"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          )
        })}
        <path
          d="M 250 -20 C 320 120, 180 300, 330 520"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.45"
          className="visual-line"
        />
        <path
          d="M 560 -20 C 480 140, 640 320, 500 520"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeOpacity="0.45"
          className="visual-line"
        />
        <circle cx="330" cy="248" r="34" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="330" cy="248" r="7" fill="var(--accent)" className="visual-pulse" />
        <line x1="330" y1="0" x2="330" y2="500" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="3 6" />
      </g>
    </svg>
  )
}

function Lattice() {
  const cols = 9
  const rows = 6
  const nodes: [number, number][] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push([80 + c * 80, 60 + r * 76])
    }
  }
  const links: [number, number][] = []
  const rand = rng(21)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1 && rand() > 0.45) links.push([r * cols + c, r * cols + c + 1])
      if (r < rows - 1 && rand() > 0.55) links.push([r * cols + c, (r + 1) * cols + c])
    }
  }
  const accents = new Set([13, 22, 31, 40, 8])
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="presentation" aria-hidden="true">
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.35"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={accents.has(i) ? 5 : 2.2}
          fill={accents.has(i) ? 'var(--accent)' : 'currentColor'}
          fillOpacity={accents.has(i) ? 1 : 0.55}
          className="visual-node"
          style={{ animationDelay: `${(i % 9) * 60}ms` }}
        />
      ))}
    </svg>
  )
}

function Plinth() {
  const slab = (x: number, y: number, w = 220, h = 54) => (
    <g>
      <path d={`M ${x} ${y} L ${x + w} ${y} L ${x + w + 44} ${y + h} L ${x + 44} ${y + h} Z`} fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" />
      <path d={`M ${x + 44} ${y + h} L ${x + w + 44} ${y + h} L ${x + w + 44} ${y + h + 26} L ${x + 44} ${y + h + 26} Z`} fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" />
      <path d={`M ${x + w} ${y} L ${x + w + 44} ${y + h} L ${x + w + 44} ${y + h + 26} L ${x + w} ${y + 26} Z`} fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.45" />
    </g>
  )
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="presentation" aria-hidden="true">
      {slab(120, 150)}
      {slab(120, 236, 220, 54)}
      {slab(300, 322, 220, 54)}
      <line x1="120" y1="418" x2="660" y2="418" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="4 5" />
      <rect x="120" y="150" width="264" height="0.8" fill="var(--accent)" />
      <circle cx="120" cy="418" r="4" fill="var(--accent)" />
      <circle cx="660" cy="418" r="4" fill="currentColor" fillOpacity="0.45" />
    </svg>
  )
}

function Fieldnote() {
  const paths = [0, 1, 2, 3, 4, 5].map((i) =>
    contourPath(400, 250, 58 + i * 36, 0.42, 7 + i * 13),
  )
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="presentation" aria-hidden="true">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 3 ? 1.4 : 0.8}
          strokeOpacity={i === 3 ? 0.85 : 0.4}
        />
      ))}
      <path d="M 400 250 L 452 196" stroke="var(--accent)" strokeWidth="1.2" />
      <circle cx="452" cy="196" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
      <circle cx="400" cy="250" r="3" fill="var(--accent)" />
      <g stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5">
        <line x1="40" y1="40" x2="80" y2="40" />
        <line x1="40" y1="40" x2="40" y2="80" />
        <line x1="760" y1="460" x2="720" y2="460" />
        <line x1="760" y1="460" x2="760" y2="420" />
      </g>
    </svg>
  )
}

const VISUALS: Record<Project['visual'], () => React.ReactElement> = {
  meridian: Meridian,
  lattice: Lattice,
  plinth: Plinth,
  fieldnote: Fieldnote,
}

export function ProjectVisual({
  visual,
  title,
  className = '',
}: {
  visual: Project['visual']
  title: string
  className?: string
}) {
  const Visual = VISUALS[visual]
  return (
    <div className={`group/visual relative overflow-hidden bg-paper-deep text-ink ${className}`}>
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/visual:scale-[1.035]">
        <Visual />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-field opacity-60" />

      {/* registration marks */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-ink/35"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-ink/35"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ink/35"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-ink/35"
        aria-hidden="true"
      />

      <span className="mono pointer-events-none absolute bottom-3 left-4 text-[0.55rem] text-ink/40">
        {title}
      </span>
    </div>
  )
}
