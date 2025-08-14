// src/components/topbar/layers/SunMoon.tsx
import React from 'react'
import type { TimeOfDay } from '../utils/types'

/**
 * Sun/Moon icon sized to fit its own SVG viewBox so nothing is clipped.
 * - Day/Sunrise/Noon/Dusk => Sun (soft spinning rays + gentle float)
 * - Night => Moon (craters + stars)
 */
export function SunMoon({ timeOfDay }: { timeOfDay: TimeOfDay }) {
  const isNight = timeOfDay === 'night'
  const isSun   = timeOfDay !== 'night' // day, sunrise, noon, dusk

  // Keep everything inside this box.
  const size = 44         // SVG viewport
  const cx   = size / 2   // center x
  const cy   = size / 2   // center y

  // Core radius and ray lengths chosen so they fit within size.
  const rCore      = 10
  const rayInner   = rCore + 4
  const rayOuter   = rCore + 9  // max radius 19, still inside 44/2=22
  const rayCount   = 10

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" aria-hidden>
      <g className="sm-wrap">
        {isSun ? (
          <>
            {/* Spinning rays */}
            <g className="sm-rays">
              {Array.from({ length: rayCount }).map((_, i) => {
                const a = (i * 360) / rayCount
                const rad = (a * Math.PI) / 180
                const x1 = cx + Math.cos(rad) * rayInner
                const y1 = cy + Math.sin(rad) * rayInner
                const x2 = cx + Math.cos(rad) * rayOuter
                const y2 = cy + Math.sin(rad) * rayOuter
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1}
                    x2={x2} y2={y2}
                    stroke="rgba(255,220,120,0.9)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                )
              })}
            </g>

            {/* Sun core */}
            <defs>
              <radialGradient id="sunGrad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#FFF3A1" />
                <stop offset="70%" stopColor="#FFD36B" />
                <stop offset="100%" stopColor="#FFB84D" />
              </radialGradient>
            </defs>
            <circle cx={cx} cy={cy} r={rCore} fill="url(#sunGrad)" />
          </>
        ) : (
          <>
            {/* Moon core */}
            <defs>
              <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F2F6FF" />
                <stop offset="100%" stopColor="#BEC7D9" />
              </radialGradient>
            </defs>
            <circle cx={cx} cy={cy} r={rCore} fill="url(#moonGrad)" />

            {/* Craters */}
            <circle cx={cx - 4} cy={cy - 2} r={1.6} fill="#AEB7C7" opacity={0.65} />
            <circle cx={cx + 2} cy={cy + 2} r={1.2} fill="#AEB7C7" opacity={0.55} />
            <circle cx={cx + 4} cy={cy - 3} r={1.0} fill="#AEB7C7" opacity={0.45} />

            {/* Stars */}
            <g opacity={0.9}>
              <circle className="sm-star" cx={cx - 12} cy={cy - 10} r={0.9} fill="#EAF2FF" />
              <circle className="sm-star" cx={cx - 6}  cy={cy - 14} r={1.2} fill="#EAF2FF" />
              <circle className="sm-star" cx={cx + 10} cy={cy - 9}  r={0.8} fill="#EAF2FF" />
            </g>
          </>
        )}
      </g>
    </svg>
  )
}