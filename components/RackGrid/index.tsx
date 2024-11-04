'use client';

import { memo } from 'react';

interface RackGridProps {
  routeType: 'aisle' | 'midcross' | 'endcross';
}

export const RackGrid = memo(function RackGrid({ routeType }: RackGridProps) {
  return (
    <g>
      {/* Path indicators - using exact coordinates from UI */}
      <g>
        {/* Grid lines first */}
        <line x1={650} y1={20} x2={650} y2={560} 
              stroke={routeType === 'aisle' ? "#2563eb" : "#94a3b8"} 
              strokeWidth={2} strokeDasharray="4 4" />
        <text x={655} y={35} fontSize={10}>Aisle Route (Default)</text>
      </g>

      {/* Rack grid - matching the TD, TX, etc. layout */}
      <g transform="translate(50, 100)">
        {/* We'll add the rack grid here */}
      </g>
    </g>
  );
}); 