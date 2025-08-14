// src/components/topbar/layers/ScenicStage.tsx
import React from "react";
import type { TimeOfDay, Weather } from "../utils/types";
import { SkyLayer } from "./SkyLayer";
import { Waves } from "./Waves";
import { Lighthouse } from "./Lighthouse";
import { ClientLogo } from "./ClientLogo";
import WeatherFX from "./WeatherFX";

/* -------------------------------------------------
   🔧 TUNING KNOBS — your sizes/positions
   ------------------------------------------------- */
const LOGO_SIZE = 66;

// Rock peninsula size & placement
const ROCK_WIDTH = 100;
const ROCK_HEIGHT = 36;
const ROCK_LEFT = -10;
const ROCK_BOTTOM = -3;

// Lighthouse placement & size
const LH_WIDTH = 120;
const LH_HEIGHT = 120;
const LH_LEFT = 1;
const LH_BOTTOM = 1;

/* -------------------------------------------------
   Rock SVG
   ------------------------------------------------- */
function RockBase({ width = ROCK_WIDTH, height = ROCK_HEIGHT }: { width?: number; height?: number }) {
  const w = width;
  const h = height;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="rockFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4B555D" />
          <stop offset="60%" stopColor="#3B4247" />
          <stop offset="100%" stopColor="#2A2F34" />
        </linearGradient>
        <linearGradient id="rockSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path
        d={[
          `M 0 ${h * 0.55}`,
          `L ${w * 0.06} ${h * 0.40}`,
          `L ${w * 0.16} ${h * 0.32}`,
          `L ${w * 0.28} ${h * 0.28}`,
          `L ${w * 0.42} ${h * 0.34}`,
          `L ${w * 0.58} ${h * 0.30}`,
          `L ${w * 0.72} ${h * 0.36}`,
          `L ${w * 0.86} ${h * 0.42}`,
          `L ${w} ${h * 0.52}`,
          `L ${w} ${h}`,
          `L 0 ${h}`,
          "Z",
        ].join(" ")}
        fill="url(#rockFill)"
      />
      <path
        d={[
          `M 0 ${h * 0.78}`,
          `C ${w * 0.25} ${h * 0.70}, ${w * 0.55} ${h * 0.70}, ${w} ${h * 0.75}`,
          `L ${w} ${h * 0.88}`,
          `C ${w * 0.60} ${h * 0.82}, ${w * 0.28} ${h * 0.82}, 0 ${h * 0.88}`,
          "Z",
        ].join(" ")}
        fill="rgba(0,0,0,0.28)"
      />
      <path
        d={[
          `M ${w * 0.04} ${h * 0.42}`,
          `C ${w * 0.22} ${h * 0.30}, ${w * 0.48} ${h * 0.26}, ${w * 0.70} ${h * 0.32}`,
        ].join(" ")}
        fill="none"
        stroke="url(#rockSheen)"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />
    </svg>
  );
}

type Props = {
  sceneSize: { width: number; height: number };
  timeOfDay: TimeOfDay;
  weather: Weather;          // <- make sure you pass this from TopBar (e.g., "rain")
  salesRatio: number;
  laborScore: number;
  clientLogoUrl?: string;
  isSyncing: boolean;
  beamTrigger: number;
  reducedMotion?: boolean;
};

export function ScenicStage(props: Props) {
  const { sceneSize, timeOfDay, clientLogoUrl, salesRatio, reducedMotion, weather } = props;
  const { width, height } = sceneSize;

  return (
    <div className="tb-stage">
      {/* Back → front */}
      <div className="tb-sky">
        <SkyLayer sceneSize={sceneSize} timeOfDay={timeOfDay} />
      </div>

      {/* Weather between sky and waves */}
      <WeatherFX sceneSize={sceneSize} weather={weather ?? "clear"} />

      <div className="tb-waves">
        <Waves sceneSize={sceneSize} salesRatio={salesRatio} reducedMotion={reducedMotion} />
      </div>

      {/* Rock peninsula (front of waves) */}
      <div
        className="tb-rock"
        style={{ position: "absolute", left: ROCK_LEFT, bottom: ROCK_BOTTOM, width: ROCK_WIDTH, height: ROCK_HEIGHT }}
      >
        <RockBase width={ROCK_WIDTH} height={ROCK_HEIGHT} />
      </div>

      {/* Lighthouse */}
      <div
        className="tb-lighthouse"
        style={{ left: LH_LEFT, bottom: LH_BOTTOM, width: LH_WIDTH, height: LH_HEIGHT, pointerEvents: "none" }}
      >
        <Lighthouse sceneSize={sceneSize} />
      </div>

      {/* Client logo — centered */}
      <div
        className="tb-clientlogo"
        style={{
          top: (height - LOGO_SIZE) / 2 - 8,
          left: (width - LOGO_SIZE) / 2,
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <ClientLogo sceneSize={sceneSize} url={clientLogoUrl} />
      </div>
    </div>
  );
}