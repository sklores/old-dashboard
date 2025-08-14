// src/components/topbar/layers/Lighthouse.tsx
import React, { useState } from 'react'

type Props = { sceneSize: { width: number; height: number } }

export function Lighthouse(_: Props) {
  const [failed, setFailed] = useState(false)
  const src = '/innovue.png' // served from /public

  if (failed) {
    return <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: 8 }} />
  }

  return (
    <img
      src={src}
      alt="Lighthouse"
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  )
}