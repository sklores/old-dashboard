// src/components/topbar/TopBarFrame.tsx
import React, { PropsWithChildren } from 'react'

type Props = {
  sceneSize: { width: number; height: number }
  borderMode?: 'thin-accent' | 'framed'
}

export function TopBarFrame({
  sceneSize,
  borderMode = 'thin-accent',
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={`tb-frame ${borderMode}`}>
      {/* The fixed-size "stage" lives centered inside the scaling frame */}
      <div
        className="tb-stage"
        style={{ width: sceneSize.width, height: sceneSize.height }}
      >
        {children}
      </div>
    </div>
  )
}