'use client'

import { useState, useCallback, useEffect } from 'react'
import { RackPosition } from './RackPosition'
import { RouteToggle } from './RouteToggle'

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

// Add these constants at the top
const PATHS = {
  aisle: {
    x: 650,  // Rightmost vertical line
    label: 'Aisle Route (Default)'
  },
  middle: {
    x: 400,  // Middle cross tray position
    label: 'Middle Cross Tray (TH08-TC11)',
    fixed: {
      source: 'TH08',
      target: 'TC11'
    }
  },
  end: {
    x: 150,   // End cross tray position
    label: 'End Cross Tray (TK01-TC04)',
    fixed: {
      source: 'TK01',
      target: 'TC04'
    }
  }
};

export function RackGrid() {
  const [mounted, setMounted] = useState(false);
  const [routeType, setRouteType] = useState('aisle');
  const [sourcePosition, setSourcePosition] = useState(null);
  const [targetPosition, setTargetPosition] = useState(null);

  // All useEffects must be at the top level, before any conditionals
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {  // Check mounted inside the effect instead
      console.group('State Update')
      console.log('Route Type:', routeType)
      console.log('Source Position:', sourcePosition)
      console.log('Target Position:', targetPosition)
      console.groupEnd()
    }
  }, [routeType, sourcePosition, targetPosition, mounted]);

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
  const handleRouteChange = useCallback((type: 'aisle' | 'middle' | 'end') => {
    console.log('Route type changed:', type) // Debug log
    setRouteType(type)
    setSourcePosition(null)
    setTargetPosition(null)
  }, [])

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <svg width={800} height={600} className="border border-gray-200">
        {/* Path Indicators */}
        {Object.entries(PATHS).map(([key, config]) => (
          <g key={key} transform={`translate(${config.x}, 20)`}>
            <line 
              x1="0" y1="0" 
              x2="0" y2="540" 
              stroke={routeType === key ? "#2563eb" : "#94a3b8"} 
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text 
              x="5" y="15" 
              className="text-[10px]" 
              fill={routeType === key ? "#2563eb" : "#94a3b8"}
            >
              {config.label}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Rack Layout - MOVED OUTSIDE SVG */}
      <div className="absolute top-0 left-0 w-full">
        {RACK_ROWS.map((row) => (
          <div key={row.id} className="flex items-center gap-4 mb-2">
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

// Path rendering components
function AislePath({ source, target }) {
  const sourcePt = getRackPosition(source);
  const targetPt = getRackPosition(target);
  const aisleX = PATHS.aisle.x;

  return (
    <path
      d={`M ${sourcePt.x},${sourcePt.y} 
          H ${aisleX} 
          V ${targetPt.y} 
          H ${targetPt.x}`}
      stroke="#2563eb"
      strokeWidth="2"
      strokeDasharray="4 4"
      fill="none"
    />
  );
}

function CrossTrayPath({ source, target, fixedPath, pathX }) {
  const sourcePt = getRackPosition(source);
  const targetPt = getRackPosition(target);
  const fixedStart = getRackPosition(fixedPath.source);
  const fixedEnd = getRackPosition(fixedPath.target);

  return (
    <>
      {/* Fixed cross tray path */}
      <path
        d={`M ${fixedStart.x},${fixedStart.y} 
            L ${fixedEnd.x},${fixedEnd.y}`}
        stroke="#2563eb"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
      />
      
      {/* Source to cross tray */}
      <path
        d={`M ${sourcePt.x},${sourcePt.y} 
            H ${pathX}`}
        stroke="#2563eb"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
      />
      
      {/* Target to cross tray */}
      <path
        d={`M ${targetPt.x},${targetPt.y} 
            H ${pathX}`}
        stroke="#2563eb"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
      />
    </>
  );
}


