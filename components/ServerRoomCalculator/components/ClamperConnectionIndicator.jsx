import React from 'react';

export const ClamperConnectionIndicator = ({ 
  settings,
  routingType,
  sourceRack,
  targetRack 
}) => {
  // Only show for Clamper room connections
  const isClamperConnection = sourceRack?.startsWith('CL') || targetRack?.startsWith('CL');
  if (!isClamperConnection) return null;

  const isDoorwayRoute = settings.clamperViaDoor?.enabled;
  
  return (
    <g className="clamper-indicator">
      {/* Doorway or TK04 indicator */}
      {isDoorwayRoute ? (
        <g>
          {/* Doorway visualization */}
          <rect
            x={290}
            y={190}
            width={20}
            height={20}
            className="fill-green-100 stroke-green-500"
            rx={2}
          />
          <text
            x={300}
            y={203}
            textAnchor="middle"
            className="text-xs font-medium fill-green-700"
          >
            D
          </text>
          <text
            x={300}
            y={180}
            textAnchor="middle"
            className="text-xs fill-green-600"
          >
            Via Doorway
          </text>
        </g>
      ) : (
        <g>
          {/* TK04 connection point */}
          <rect
            x={50 + (3 * 50)}  // TK04 position
            y={490}            // TK row position
            width={45}         // RACK_WIDTH
            height={30}
            className="fill-blue-100 stroke-blue-500"
          />
          <text
            x={50 + (3 * 50) + 22.5}
            y={505}
            textAnchor="middle"
            className="text-xs font-medium fill-blue-700"
          >
            TK04
          </text>
          <text
            x={50 + (3 * 50) + 22.5}
            y={480}
            textAnchor="middle"
            className="text-xs fill-blue-600"
          >
            Via TK04
          </text>
        </g>
      )}

      {/* Connection type label */}
      <text
        x={10}
        y={30}
        className="text-sm font-medium fill-gray-600"
      >
        Clamper Connection: {isDoorwayRoute ? 'Via Doorway' : 'Via TK04'}
      </text>
    </g>
  );
}; 