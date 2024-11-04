'use client'

import { useState } from 'react'
import { RackGrid } from './RackGrid'
import { PathOverlay } from './PathOverlay'

export function RackLayout() {
  const [routeType, setRouteType] = useState<'aisle' | 'mid-cross' | 'end-cross'>('aisle')
  const [sourcePosition, setSourcePosition] = useState<string | null>(null)
  const [targetPosition, setTargetPosition] = useState<string | null>(null)

  console.log('RackLayout state:', { routeType, sourcePosition, targetPosition })

  return (
    <div className="relative" style={{ 
      minHeight: '600px', 
      width: '800px',
      border: '1px solid blue' // Temporary border to see container
    }}>
      <RackGrid 
        routeType={routeType}
        setRouteType={setRouteType}
        sourcePosition={sourcePosition}
        setSourcePosition={setSourcePosition}
        targetPosition={targetPosition}
        setTargetPosition={setTargetPosition}
      />
      <PathOverlay 
        routeType={routeType}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
    </div>
  )
} 