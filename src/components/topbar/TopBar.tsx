// src/components/topbar/TopBar.tsx
import React from 'react'
import { TopBarFrame } from './TopBarFrame'
import { ScenicStage } from './layers/ScenicStage'
import type { TimeOfDay, Weather } from './utils/types'

export type TopBarProps = {
  timeOfDay: TimeOfDay
  weather: Weather
  salesRatio: number        // 0..1
  laborScore: number        // 0..100
  clientLogoUrl?: string
  isSyncing: boolean
  beamTrigger: number       // bump this on each refresh
  onRefresh?: () => Promise<void> | void
  reducedMotion?: boolean
}

const SCENE = { width: 400, height: 120 } as const // ← fixed-size stage

export function TopBar(props: TopBarProps) {
  return (
    <TopBarFrame sceneSize={SCENE} borderMode="thin-accent">
      <ScenicStage sceneSize={SCENE} {...props} />
    </TopBarFrame>
  )
}