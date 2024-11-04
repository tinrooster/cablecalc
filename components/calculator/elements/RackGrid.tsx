'use client'

import { useState, useCallback, useEffect } from 'react'
import { RackPosition } from './RackPosition'
import { RouteToggle } from './RouteToggle'
import { PathOverlay } from './PathOverlay'

// Define row configurations
const RACK_ROWS = [
  { id: 'TD1', displayId: 'TD', positions: ['15', '14'] },
  { id: 'TX', displayId: 'TX', positions: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'] },
  { id: 'TC', displayId: 'TC', positions: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TD2', displayId: 'TD', positions: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TE', displayId: 'TE', positions: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TF', displayId: 'TF', positions: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TG', displayId: 'TG', positions: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TH', displayId: 'TH', positions: ['11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TJ', displayId: 'TJ', positions: ['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TK', displayId: 'TK', positions: ['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] }
];

export function RackGrid() {
  const [routeType, setRouteType] = useState<'aisle' | 'mid-cross' | 'end-cross'>('aisle')
  const [sourcePosition, setSourcePosition] = useState<string | null>(null)
  const [targetPosition, setTargetPosition] = useState<string | null>(null)

  // Debug state changes
  useEffect(() => {
    console.group('State Update')
    console.log('Route Type:', routeType)
    console.log('Source Position:', sourcePosition)
    console.log('Target Position:', targetPosition)
    console.groupEnd()
  }, [routeType, sourcePosition, targetPosition])

  const handlePositionClick = useCallback((row: string, position: string) => {
    console.group('Position Click')
    console.log('Clicked:', { row, position })
    console.log('Current State:', { sourcePosition, targetPosition, routeType })
    
    const positionId = `${row}-${position}`
    
    // Wrap state updates in requestAnimationFrame to ensure UI stays responsive
    requestAnimationFrame(() => {
      try {
        if (positionId === sourcePosition) {
          console.log('Clearing source position')
          setSourcePosition(null)
          setTargetPosition(null) // Clear both to avoid stuck state
        } else if (positionId === targetPosition) {
          console.log('Clearing target position')
          setTargetPosition(null)
        } else if (!sourcePosition) {
          console.log('Setting source:', positionId)
          setSourcePosition(positionId)
        } else if (!targetPosition) {
          console.log('Setting target:', positionId)
          setTargetPosition(positionId)
        } else {
          console.log('Resetting and setting new source:', positionId)
          setSourcePosition(positionId)
          setTargetPosition(null)
        }
      } catch (error) {
        console.error('Error in handlePositionClick:', error)
        // Reset state on error
        setSourcePosition(null)
        setTargetPosition(null)
      }
    })
    
    console.groupEnd()
  }, [sourcePosition, targetPosition])

  // Debug render
  console.log('RackGrid rendering with:', { routeType, sourcePosition, targetPosition })

  // Reset selections when changing route type
  const handleRouteChange = useCallback((type: 'aisle' | 'mid-cross' | 'end-cross') => {
    console.log('Route type changed:', type) // Debug log
    setRouteType(type)
    setSourcePosition(null)
    setTargetPosition(null)
  }, [])

  return (
    <div className="relative w-full h-full">
      <PathOverlay 
        routeType={routeType}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
      
      <div className="grid gap-4">
        {RACK_ROWS.map((row) => (
          <div key={row.id} className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-full font-medium">
              {row.displayId}
            </div>
            <div className="flex gap-2">
              {row.positions.map((pos) => (
                <RackPosition
                  key={`${row.id}-${pos}`}
                  row={row.id}
                  position={pos}
                  isSelected={
                    sourcePosition === `${row.id}-${pos}` ||
                    targetPosition === `${row.id}-${pos}`
                  }
                  isSource={sourcePosition === `${row.id}-${pos}`}
                  onClick={() => handlePositionClick(row.id, pos)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


