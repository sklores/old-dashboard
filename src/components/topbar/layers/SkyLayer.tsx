// src/components/topbar/layers/SkyLayer.tsx
import React from "react"
import type { TimeOfDay } from "../utils/types"

type Props = {
  sceneSize: { width: number; height: number }
  timeOfDay: TimeOfDay
}

export function SkyLayer({ sceneSize, timeOfDay }: Props) {
  const { width, height } = sceneSize
  const isDay = timeOfDay === "day"

  return (
    <div
      className="tb-sky"
      style={{
        width,
        height,
        background: isDay
          ? "linear-gradient(#87CEEB, #4A90E2)"   // day sky
          : "linear-gradient(#0b0f15, #1a1f2b)",  // night sky
      }}
    >
      {/* ☀️ Sun (with CSS corona that spins) */}
      {isDay && <div className="tb-sun" />}

      {/* 🌙 Moon */}
      {!isDay && <div className="tb-moon" />}
    </div>
  )
}