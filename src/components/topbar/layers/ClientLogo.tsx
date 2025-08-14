// src/components/topbar/layers/ClientLogo.tsx
import React, { useState } from 'react'

type Props = {
  sceneSize: { width: number; height: number }
  url?: string
}

export function ClientLogo(_: Props) {
  const [failed, setFailed] = useState(false)
  const src = '/gcdc.png' // from /public

  if (failed) return null

  return (
    <img
      src={src}
      alt="Client logo"
      onError={() => setFailed(true)}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      }}
    />
  )
}