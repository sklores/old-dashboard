import React from "react";

/**
 * Organic curved peninsula, anchored to bottom-left.
 * Uses CSS variables for responsive scale so it stays “stuck” to the corner.
 * Lighthouse logo size now auto-optimizes with clamp() for a larger, responsive look.
 */
export default function Peninsula({ innovueLogo }: { innovueLogo: string | null }) {
  return (
    <div className="pen-wrap" aria-hidden>
      <svg className="pen" viewBox="0 0 600 240" preserveAspectRatio="none">
        {/* land shape */}
        <path
          d="M 0 140
             C 90 120, 170 95, 240 110
             C 285 120, 325 135, 360 140
             C 395 145, 450 142, 520 150
             L 520 200 L 0 200 Z"
          fill="#D6C4A7"
        />
        {/* shadow edge */}
        <path
          d="M 0 140
             C 90 120, 170 95, 240 110
             C 285 120, 325 135, 360 140
             C 395 145, 450 142, 520 150"
          fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="4"
        />
      </svg>

      {innovueLogo && (
        <img
          src={innovueLogo}
          alt="Innovue lighthouse"
          className="pen-logo"
          draggable={false}
        />
      )}

      <style>{`
        .pen-wrap {
          position: absolute;
          inset: 0 0 0 0;
          z-index: 3;       /* above waves */
          pointer-events: none;

          /* Overall peninsula scale across breakpoints */
          --pen-scale: 1;

          /* >>> BIGGER, AUTO-SCALING LIGHTHOUSE <<<
             clamp(min, preferred, max)
             - Increase the middle value to make it larger on desktops.
             - Raise/lower min & max to change absolute bounds.
          */
          --logo-size: clamp(96px, 12vw, 180px);
        }
        @media (max-width: 1100px) { .pen-wrap { --pen-scale: .9;  } }
        @media (max-width: 900px)  { .pen-wrap { --pen-scale: .8;  } }
        @media (max-width: 720px)  { .pen-wrap { --pen-scale: .72; } }
        @media (max-width: 600px)  { .pen-wrap { --pen-scale: .65; } }

        .pen {
          position: absolute;
          left: 0; bottom: 22px;         /* anchored */
          width: calc(300px * var(--pen-scale));
          height: calc(100px * var(--pen-scale));
          filter: drop-shadow(0 2px 4px rgba(0,0,0,.16));
        }

        /* Lighthouse placement stays relative to peninsula scaling */
        .pen-logo {
          position: absolute;
          left:  calc(96px * var(--pen-scale));
          bottom: calc(56px * var(--pen-scale));
          width: var(--logo-size);
          height: auto;
          filter: drop-shadow(0 3px 8px rgba(0,0,0,.35));
        }
      `}</style>
    </div>
  );
}