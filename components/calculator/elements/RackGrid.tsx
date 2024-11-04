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
    x: 50,
    label: 'Aisle Route (Default)'
  },
  middle: {
    x: 250,
    label: 'Middle Cross Tray (TH08-TC11)',
    fixed: {
      source: 'TH08',
      target: 'TC11'
    }
  },
  end: {
    x: 450,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePositionClick = (rowId: string, position: string) => {
    const positionId = `${rowId}-${position}`;
    
    // If no source selected, set it as source
    if (!sourcePosition) {
      setSourcePosition(positionId);
      return;
    }
    
    // If clicking the source again, deselect it
    if (positionId === sourcePosition) {
      setSourcePosition(null);
      return;
    }
    
    // If source is selected but no target, set target
    if (!targetPosition) {
      setTargetPosition(positionId);
      return;
    }
    
    // If clicking the target again, deselect it
    if (positionId === targetPosition) {
      setTargetPosition(null);
      return;
    }
    
    // If both are selected, start over with new source
    setSourcePosition(positionId);
    setTargetPosition(null);
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full">
      {/* Cable Path Lines - with shorter height */}
      <svg width={800} height={500} className="absolute top-0 z-0">
        {Object.entries(PATHS).map(([key, config]) => (
          <g key={key} transform={`translate(${config.x}, 20)`}>
            <line 
              x1="0" y1="0" 
              x2="0" y2="420"
              stroke={routeType === key ? "#2563eb" : "#94a3b8"} 
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </g>
        ))}
      </svg>

      {/* Interactive Cable Path Labels - above */}
      <div className="relative z-20 h-16">
        <svg width={800} height={60}>
          {Object.entries(PATHS).map(([key, config]) => (
            <g key={key} transform={`translate(${config.x}, 20)`}>
              <foreignObject x="5" y="0" width="200" height="30">
                <button
                  onClick={() => setRouteType(key)}
                  className={`
                    text-[10px] px-2 py-1 rounded
                    transition-colors duration-150
                    hover:text-blue-600
                    ${routeType === key 
                      ? 'text-blue-500 font-medium' 
                      : 'text-gray-600'
                    }
                  `}
                >
                  {config.label}
                </button>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>

      {/* Grid - middle layer */}
      <div className="relative z-10 mt-4">
        {RACK_ROWS.map((row) => (
          <div key={row.id} className="flex items-center mb-[10px]">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-full font-medium mr-3">
              {row.displayId}
            </div>
            <div className="flex gap-[2px]">
              {row.positions.map((pos) => (
                <RackPosition
                  key={`${row.id}-${pos}`}
                  row={row.id}
                  position={pos}
                  isSelected={sourcePosition === `${row.id}-${pos}` || targetPosition === `${row.id}-${pos}`}
                  isSource={sourcePosition === `${row.id}-${pos}`}
                  onClick={() => handlePositionClick(row.id, pos)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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


