'use client';

import { memo } from 'react';

const ROUTE_PATHS = {
  endcross: {
    x: 150,
    label: 'End Cross Tray (TK01-TC04)',
    fixed: { source: 'TK01', target: 'TC04' }
  },
  midcross: {
    x: 400,
    label: 'Middle Cross Tray (TH08-TC11)',
    fixed: { source: 'TH08', target: 'TC11' }
  },
  aisle: {
    x: 650,
    label: 'Aisle Route (Default)'
  }
};

interface RackLayoutProps {
  routeType: 'aisle' | 'midcross' | 'endcross';
  sourcePosition: string | null;
  targetPosition: string | null;
}

export const RackLayout = memo(function RackLayout({ 
  routeType, 
  sourcePosition, 
  targetPosition 
}: RackLayoutProps) {
  return (
    <svg width={800} height={600} className="border border-gray-200">
      {Object.entries(ROUTE_PATHS).map(([key, config]) => (
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
  );
}); 