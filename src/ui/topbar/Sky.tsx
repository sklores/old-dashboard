import React from "react";

export default function Sky({ isDay, tempF }: { isDay: boolean; tempF: number | null }) {
  return (
    <div className={`sky ${isDay ? "day" : "night"}`} aria-hidden>
      {/* parallax hills */}
      <svg className="hills" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor={isDay ? "#3C78B4" : "#1f2a44"} />
            <stop offset="100%" stopColor={isDay ? "#2B5E92" : "#121a2d"} />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1200" height="200" fill="url(#grad-sky)" />
        <path d="M0,150 C180,110 280,120 420,150 C560,180 680,150 820,150 C980,150 1080,170 1200,160 L1200,200 L0,200Z" fill={isDay ? "#2a557d" : "#0f1730"} opacity="0.35" />
        <path d="M0,160 C200,140 340,160 520,165 C700,170 900,155 1200,170 L1200,200 L0,200Z" fill={isDay ? "#1f476c" : "#0a1227"} opacity="0.50" />
      </svg>

      {/* sun / moon */}
      <div className="astro">
        <div className={`orb ${isDay ? "sun" : "moon"}`} />
        {typeof tempF === "number" && (
          <div className="temp-pill">{tempF}°F</div>
        )}
      </div>

      <style>{`
        .sky {
          position: absolute;
          inset: 0 0 0 0;
          z-index: 1;
        }
        .hills {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
        }
        .astro {
          position: absolute;
          right: 28px; top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 4; /* ensure on top of waves */
          pointer-events: none;
        }
        .orb {
          width: 40px; height: 40px; border-radius: 50%;
          animation: spin 22s linear infinite;
          box-shadow: 0 0 18px rgba(255,255,160,.6), inset 0 0 8px rgba(255,255,255,.9);
        }
        .sun  { background: radial-gradient(circle at 30% 30%, #FFD56B, #F6A93B); }
        .moon { background: radial-gradient(circle at 30% 30%, #bcd0ff, #6f86c7); box-shadow: 0 0 14px rgba(180,190,255,.55), inset 0 0 8px rgba(255,255,255,.7); }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

        .temp-pill {
          font-weight: 800;
          font-size: 14px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(0,0,0,.45);
          border: 1px solid rgba(255,255,255,.18);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 12px rgba(0,0,0,.25);
        }
        @media (max-width: 640px) {
          .orb { width: 34px; height: 34px; }
          .astro { right: 16px; top: 8px; }
        }
      `}</style>
    </div>
  );
}