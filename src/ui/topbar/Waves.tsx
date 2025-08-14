import React from "react";

/**
 * Animated waves. The `intensity` prop scales vertical motion:
 *   ~0.35 (calm) … 1.20 (choppy).
 */
export default function Waves({ intensity = 0.7 }: { intensity?: number }) {
  return (
    <div className="waves" style={{ ["--amp" as any]: intensity.toString() }} aria-hidden>
      <svg className="w w1" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 C150,80 300,40 450,60 C600,80 750,40 900,60 C1050,80 1120,50 1200,60 L1200,120 L0,120 Z" />
      </svg>
      <svg className="w w2" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,64 C160,84 320,44 480,64 C640,84 800,44 960,64 C1080,76 1140,60 1200,68 L1200,120 L0,120 Z" />
      </svg>
      <svg className="w w3" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,68 C180,88 340,48 520,68 C700,88 860,48 1040,68 C1120,76 1160,64 1200,70 L1200,120 L0,120 Z" />
      </svg>

      <style>{`
        .waves {
          position: absolute;
          inset: auto 0 0 0;
          height: 86px;
          z-index: 2; /* below peninsula, above sky */
          overflow: hidden;
          --amp: .8;
        }
        .w { position: absolute; left: 0; bottom: 0; width: 200%; height: 100%; transform: scaleY(var(--amp)); }
        .w path { fill: rgba(10,40,70,.65); }
        .w1 { animation: move 18s linear infinite; opacity: .55; }
        .w2 { animation: move 26s linear infinite reverse; opacity: .40; }
        .w3 { animation: move 36s linear infinite; opacity: .30; }

        @keyframes move {
          from { transform: translateX(0)  scaleY(var(--amp)); }
          to   { transform: translateX(-50%) scaleY(var(--amp)); }
        }
      `}</style>
    </div>
  );
}