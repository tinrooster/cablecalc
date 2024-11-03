import React from 'react';
import { ROOMS } from '@/lib/constants/rooms';
import { getRackPosition } from '@/lib/utils/positions';

interface MainRoomLayoutProps {
  RACK_WIDTH?: number;
  RACK_SPACING?: number;
  handleRackClick: (rackId: string) => void;
  sourceRack: string | null;
  targetRack: string | null;
  settings: any; // We'll keep this as 'any' if that's how it was working
}

export const MainRoomLayout: React.FC<MainRoomLayoutProps> = ({ 
  RACK_WIDTH = 45,
  RACK_SPACING = 50,
  handleRackClick,
  sourceRack,
  targetRack,
  settings 
}) => {
  const renderRack = (rackId: string, x: number, y: number) => {
    const isSelected = rackId === sourceRack || rackId === targetRack;
    const isSource = rackId === sourceRack;
    
    return (
      <g key={rackId}>
        {/* Rack rectangle */}
        <rect
          x={x}
          y={y}
          width={RACK_WIDTH}
          height={30}
          className={`
            stroke-gray-400 
            cursor-pointer 
            transition-colors
            ${isSelected 
              ? 'fill-blue-500' 
              : 'fill-white hover:fill-blue-100'}
          `}
          onClick={() => handleRackClick(rackId)}
        />
        
        {/* Rack label */}
        <text
          x={x + RACK_WIDTH/2}
          y={y + 20}
          textAnchor="middle"
          className={`text-xs font-medium ${isSelected ? 'fill-white' : 'fill-gray-600'}`}
        >
          {rackId}
        </text>

        {/* Source/Target indicators */}
        {isSelected && (
          <text
            x={x + RACK_WIDTH/2}
            y={y - 5}
            textAnchor="middle"
            className="text-xs font-bold fill-blue-600"
          >
            {isSource ? 'Source' : 'Target'}
          </text>
        )}
      </g>
    );
  };

  const renderRow = (row: any) => {
    return (
      <g key={row.id}>
        {/* Row label */}
        <text
          x={10}
          y={row.y + 20}
          className="text-sm font-medium fill-gray-500"
        >
          {row.id}
        </text>

        {/* Racks */}
        {Array.from({ length: row.count }, (_, i) => {
          const rackNum = row.reverse 
            ? row.start - i 
            : row.start + i;
          const rackId = `${row.id}${rackNum.toString().padStart(2, '0')}`;
          const x = 50 + (i * RACK_SPACING);
          
          return renderRack(rackId, x, row.y);
        })}
      </g>
    );
  };

  const renderSpecialRacks = () => {
    return ROOMS.main.specialRacks.map(rack => 
      renderRack(rack.id, rack.x, rack.y)
    );
  };

  const renderCrossTrayIndicators = () => {
    return (
      <g className="text-gray-400">
        {/* Middle cross tray (TH08-TC11) */}
        <line
          x1={50 + (7 * RACK_SPACING)}
          y1={390 - settings.middleTrayOverhead}
          x2={50 + (10 * RACK_SPACING)}
          y2={390 - settings.middleTrayOverhead}
          className="stroke-blue-200 stroke-2 dash-2"
        />
        <text
          x={50 + (8.5 * RACK_SPACING)}
          y={385 - settings.middleTrayOverhead}
          textAnchor="middle"
          className="text-xs fill-blue-400"
        >
          Middle Cross Tray
        </text>

        {/* End cross tray (TK01-TC04) */}
        <line
          x1={50}
          y1={490 - settings.endTrayOverhead}
          x2={50 + (3 * RACK_SPACING)}
          y2={490 - settings.endTrayOverhead}
          className="stroke-blue-200 stroke-2 dash-2"
        />
        <text
          x={50 + (1.5 * RACK_SPACING)}
          y={485 - settings.endTrayOverhead}
          textAnchor="middle"
          className="text-xs fill-blue-400"
        >
          End Cross Tray
        </text>
      </g>
    );
  };

  return (
    <g>
      {/* Background grid (optional) */}
      <defs>
        <pattern id="grid" width={50} height={50} patternUnits="userSpaceOnUse">
          <path 
            d="M 50 0 L 0 0 0 50" 
            fill="none" 
            stroke="rgba(0,0,0,0.05)" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Room elements */}
      {ROOMS.main.rows.map(renderRow)}
      {renderSpecialRacks()}
      {renderCrossTrayIndicators()}
    </g>
  );
}; 