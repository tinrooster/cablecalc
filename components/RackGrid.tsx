"use client"

import { memo } from 'react';

interface RackGridProps {
  routeType: 'aisle' | 'midcross' | 'endcross';
  sourcePosition: string | null;
  targetPosition: string | null;
}

export const RackGrid = memo(function RackGrid({
  routeType,
  sourcePosition,
  targetPosition
}: RackGridProps) {
  // SVG-only content
  return (
    <g>
      {/* Path indicators */}
      <g>
        <line 
          x1={150} y1={20} 
          x2={150} y2={560} 
          stroke={routeType === 'endcross' ? "#2563eb" : "#94a3b8"} 
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        <text x={155} y={35} className="text-[10px]" fill={routeType === 'endcross' ? "#2563eb" : "#94a3b8"}>
          End Cross Tray (TK01-TC04)
        </text>
      </g>
      <g>
        <line 
          x1={400} y1={20} 
          x2={400} y2={560} 
          stroke={routeType === 'midcross' ? "#2563eb" : "#94a3b8"} 
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        <text x={405} y={35} className="text-[10px]" fill={routeType === 'midcross' ? "#2563eb" : "#94a3b8"}>
          Middle Cross Tray (TH08-TC11)
        </text>
      </g>
      <g>
        <line 
          x1={650} y1={20} 
          x2={650} y2={560} 
          stroke={routeType === 'aisle' ? "#2563eb" : "#94a3b8"} 
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        <text x={655} y={35} className="text-[10px]" fill={routeType === 'aisle' ? "#2563eb" : "#94a3b8"}>
          Aisle Route (Default)
        </text>
      </g>
    </g>
  );
}); 