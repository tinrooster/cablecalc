'use client'

interface PathOverlayProps {
  routeType: 'aisle' | 'mid-cross' | 'end-cross'
  sourcePosition: string | null
  targetPosition: string | null
}

export function PathOverlay({ routeType, sourcePosition, targetPosition }: PathOverlayProps) {
  console.log('PathOverlay rendering:', { routeType, sourcePosition, targetPosition })

  return (
    <div className="absolute inset-0" style={{ 
      pointerEvents: 'none',
      border: '1px solid red' // Temporary border to see the overlay container
    }}>
      <svg 
        width="100%" 
        height="100%" 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        {/* Test line - should always be visible */}
        <line
          x1="100"
          y1="100"
          x2="300"
          y2="300"
          stroke="#E5E7EB"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
      </svg>
    </div>
  )
} 