'use client'

/**
 * Animated navbar mark matching the site favicon:
 * Registration crosshair + architectural S monolith with the vermilion block
 * traveling cleanly back and forth along the S path.
 */
export function NavMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-[20px] w-[20px] shrink-0 md:h-[22px] md:w-[22px]"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" fill="var(--ink)" />
      <g
        fill="none"
        stroke="var(--paper)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="square"
      >
        <path d="M3 8 V3 H8" />
        <path d="M24 3 H29 V8" />
        <path d="M29 24 V29 H24" />
        <path d="M8 29 H3 V24" />
      </g>
      <g fill="var(--paper)">
        <rect x="8" y="7" width="16" height="4" />
        <rect x="8" y="11" width="4" height="3" />
        <rect x="8" y="14" width="16" height="4" />
        <rect x="20" y="18" width="4" height="3" />
        <rect x="8" y="21" width="16" height="4" />
      </g>
      <rect x="8" y="21" width="4" height="4" fill="var(--accent)" className="s-datum-travel" />
    </svg>
  )
}
