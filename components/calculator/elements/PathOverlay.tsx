'use client'

interface PathOverlayProps {
  routeType: 'aisle' | 'mid-cross' | 'end-cross'
  sourcePosition: string | null
  targetPosition: string | null
}

export function PathOverlay({ routeType, sourcePosition, targetPosition }: PathOverlayProps) {
  const getCoordinates = (position: string | null) => {
    if (!position) return null
    
    const row = position.slice(0, 2)
    const pos = position.includes('-') 
      ? position.split('-')[1]
      : position.slice(2)
    
    // Adjusted measurements
    const buttonWidth = 40    // Width of each button
    const buttonGap = 4      // Gap between buttons
    const leftOffset = 100   // Initial left offset
    const topOffset = 180    // Initial top offset
    const rowSpacing = 52    // Vertical space between rows
    
    // Row positions (0-based from top)
    const rowOrder = {
      'TD': 0,
      'TX': 1,
      'TC': 2,
      'TD': 3,
      'TE': 4,
      'TF': 5,
      'TG': 6,
      'TH': 7,
      'TJ': 8,
      'TK': 9
    }
    
    // Calculate center of button
    const x = leftOffset + ((13 - parseInt(pos)) * (buttonWidth + buttonGap)) + (buttonWidth / 2)
    const y = topOffset + (rowOrder[row] * rowSpacing) + (buttonWidth / 2)
    
    console.log(`Position ${position}:`, { x, y })
    return { x, y }
  }

  const source = getCoordinates(sourcePosition)
  const target = getCoordinates(targetPosition)

  return (
    <div className="absolute inset-0" style={{ pointerEvents: 'none', zIndex: 50 }}>
      <svg width="100%" height="100%">
        {source && target && (
          <>
            {/* Path line */}
            <line 
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />
            
            {/* Debug dots */}
            <circle cx={source.x} cy={source.y} r="3" fill="red" />
            <circle cx={target.x} cy={target.y} r="3" fill="blue" />
          </>
        )}
      </svg>
    </div>
  )
}

