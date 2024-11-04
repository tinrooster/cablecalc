'use client'

import { useSettings } from '../context/SettingsContext';

interface Position {
  row: string;
  number: string;
}

interface PathOverlayProps {
  sourcePosition: string | null;
  targetPosition: string | null;
  routeType: 'default' | 'alternate';
}

export function PathOverlay({ sourcePosition, targetPosition, routeType }: PathOverlayProps) {
  const { settings } = useSettings();

  if (!sourcePosition || !targetPosition || !settings.showGrid) {
    return null;
  }

  // Parse position strings (e.g., "TC-12" -> { row: "TC", number: "12" })
  const parsePosition = (pos: string): Position => {
    const [row, number] = pos.split('-');
    return { row, number };
  };

  const source = parsePosition(sourcePosition);
  const target = parsePosition(targetPosition);

  // Calculate grid coordinates (each rack is 40px wide + 4px gap)
  const RACK_WIDTH = 44;
  const ROW_HEIGHT = 44;
  const ROW_ORDER = ['TD', 'TX', 'TC', 'TD', 'TE', 'TF', 'TG', 'TH', 'TJ', 'TK'];

  const getXCoordinate = (position: Position): number => {
    const numberInt = parseInt(position.number);
    return (numberInt - 1) * RACK_WIDTH + RACK_WIDTH / 2;
  };

  const getYCoordinate = (position: Position): number => {
    const rowIndex = ROW_ORDER.indexOf(position.row);
    return rowIndex * ROW_HEIGHT + ROW_HEIGHT / 2;
  };

  const sourceX = getXCoordinate(source);
  const sourceY = getYCoordinate(source);
  const targetX = getXCoordinate(target);
  const targetY = getYCoordinate(target);

  // Calculate control points for the path
  const getMidPoint = () => {
    // Default route uses the aisle (vertical path)
    if (routeType === 'default') {
      const midX = Math.min(sourceX, targetX) - RACK_WIDTH;
      return {
        x1: midX,
        y1: sourceY,
        x2: midX,
        y2: targetY
      };
    }
    // Alternate route uses cross trays (horizontal path)
    return {
      x1: sourceX,
      y1: Math.min(sourceY, targetY) - ROW_HEIGHT,
      x2: targetX,
      y2: Math.min(sourceY, targetY) - ROW_HEIGHT
    };
  };

  const { x1, y1, x2, y2 } = getMidPoint();

  // Create SVG path
  const pathData = `
    M ${sourceX} ${sourceY}
    L ${x1} ${y1}
    L ${x2} ${y2}
    L ${targetX} ${targetY}
  `;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        {/* Main path */}
        <path
          d={pathData}
          fill="none"
          stroke={routeType === 'default' ? '#4CAF50' : '#2196F3'}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        
        {/* Source point */}
        <circle
          cx={sourceX}
          cy={sourceY}
          r="4"
          fill="#4CAF50"
        />
        
        {/* Target point */}
        <circle
          cx={targetX}
          cy={targetY}
          r="4"
          fill="#2196F3"
        />

        {/* Distance labels */}
        {settings.showMeasurements && (
          <>
            <text
              x={(sourceX + x1) / 2}
              y={sourceY - 8}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {settings.verticalRun}ft
            </text>
            <text
              x={(targetX + x2) / 2}
              y={targetY + 16}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {settings.aisleEntryExit}ft
            </text>
          </>
        )}
      </svg>
    </div>
  );
} 