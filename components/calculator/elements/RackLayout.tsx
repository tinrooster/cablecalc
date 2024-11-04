'use client'

import { useState } from 'react'
import { RackGrid } from './RackGrid'
import { PathOverlay } from './PathOverlay'

export function RackLayout() {
  const [routeType, setRouteType] = useState<'aisle' | 'mid-cross' | 'end-cross'>('aisle')
  const [sourcePosition, setSourcePosition] = useState<string | null>(null)
  const [targetPosition, setTargetPosition] = useState<string | null>(null)

  console.log('RackLayout Render:', { routeType, sourcePosition, targetPosition })

  return (
    <div className="relative" style={{ 
      minHeight: '800px', 
      width: '1000px',
      border: '1px solid blue' // Debug border
    }}>
      <PathOverlay 
        routeType={routeType}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
      <RackGrid 
        routeType={routeType}
        setRouteType={setRouteType}
        sourcePosition={sourcePosition}
        setSourcePosition={setSourcePosition}
        targetPosition={targetPosition}
        setTargetPosition={setTargetPosition}
      />
    </div>
  )
} 