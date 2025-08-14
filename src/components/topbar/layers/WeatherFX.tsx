// src/components/topbar/layers/WeatherFX.tsx
import React, { useMemo } from "react";
import type { Weather } from "../utils/types";

type Props = {
  sceneSize: { width: number; height: number };
  weather: Weather; // "clear" | "clouds" | "fog" | "rain" | "storm"
};

export default function WeatherFX({ sceneSize, weather }: Props) {
  const { width, height } = sceneSize;

  if (weather === "clear") return null;

  return (
    <div className="tb-weather" aria-hidden>
      <svg
        className="tb-weather-svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* soft blur for fog & clouds */}
          <filter id="wfx-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          {/* rain drop gradient */}
          <linearGradient id="wfx-rain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>

        {weather === "clouds" && <Clouds w={width} h={height} />}
        {weather === "fog" && <Fog w={width} h={height} />}
        {weather === "rain" && <Rain w={width} h={height} />}
        {weather === "storm" && (
          <>
            <Clouds w={width} h={height} dense />
            <Rain w={width} h={height} fast />
            <Lightning w={width} h={height} />
          </>
        )}
      </svg>
    </div>
  );
}

function Clouds({ w, h, dense = false }: { w: number; h: number; dense?: boolean }) {
  // simple puffy cloud groups drifting left
  const groups = useMemo(
    () =>
      Array.from({ length: dense ? 6 : 3 }).map((_, i) => ({
        y: h * (0.12 + 0.18 * (i % 3)),
        scale: 0.8 + (i % 3) * 0.25,
        dur: 18 + (i % 3) * 6,
        delay: -i * 3,
      })),
    [w, h, dense]
  );

  return (
    <g filter="url(#wfx-blur)" fill="rgba(255,255,255,0.9)">
      {groups.map((g, idx) => (
        <g key={idx} transform={`translate(${w + 120},${g.y}) scale(${g.scale})`}>
          <g className="wfx-cloud">
            <ellipse cx="0" cy="0" rx="32" ry="20" />
            <ellipse cx="24" cy="-6" rx="28" ry="18" />
            <ellipse cx="-26" cy="-4" rx="24" ry="16" />
            <rect x="-40" y="-8" width="88" height="26" rx="13" />
          </g>
          <animateTransform
            attributeName="transform"
            type="translate"
            from={`${w + 120} ${g.y}`}
            to={-160 + " " + g.y}
            dur={`${g.dur}s`}
            begin={`${g.delay}s`}
            repeatCount="indefinite"
          />
        </g>
      ))}
    </g>
  );
}

function Fog({ w, h }: { w: number; h: number }) {
  // layered fog bands sliding slowly
  const bands = [0.58, 0.68, 0.78].map((y, i) => ({
    y: h * y,
    alpha: 0.08 + i * 0.05,
    dur: 28 + i * 10,
    delay: -i * 5,
  }));

  return (
    <g filter="url(#wfx-blur)">
      {bands.map((b, i) => (
        <g key={i} opacity={b.alpha}>
          <rect x={-w} y={b.y} width={w * 3} height={h * 0.18} fill="#ffffff" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from={`0 0`}
            to={`${-w} 0`}
            dur={`${b.dur}s`}
            begin={`${b.delay}s`}
            repeatCount="indefinite"
          />
        </g>
      ))}
    </g>
  );
}

function Rain({ w, h, fast = false }: { w: number; h: number; fast?: boolean }) {
  const count = fast ? 180 : 120;
  const drops = Array.from({ length: count }).map((_, i) => {
    const x = (i * (w / count)) + (i % 7) * 2;
    const yStart = -Math.random() * h;
    const yEnd = h + 40;
    const dur = (fast ? 0.9 : 1.4) + (i % 5) * 0.08;
    const delay = -(i % 60) * 0.05;
    return { x, yStart, yEnd, dur, delay };
  });

  return (
    <g stroke="url(#wfx-rain)" strokeWidth="1.2" strokeLinecap="round" opacity="0.65">
      {drops.map((d, i) => (
        <line key={i} x1={d.x} y1={d.yStart} x2={d.x - 4} y2={d.yStart + 16}>
          <animate
            attributeName="y1"
            from={d.yStart}
            to={d.yEnd}
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            from={d.yStart + 16}
            to={d.yEnd + 16}
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="x1"
            from={d.x}
            to={d.x - 6}
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            from={d.x - 4}
            to={d.x - 10}
            dur={`${d.dur}s`}
            begin={`${d.delay}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </g>
  );
}

function Lightning({ w, h }: { w: number; h: number }) {
  // subtle random flashes at the top-right
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill="white" opacity="0">
        <animate
          attributeName="opacity"
          values="0;0;0.3;0;0;0.2;0"
          dur="4s"
          begin="0s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
  );
}