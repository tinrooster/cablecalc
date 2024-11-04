'use client'

import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { RackPosition } from './RackPosition';
import { PathOverlay } from './PathOverlay';

// Define row configurations
const RACK_ROWS = [
  { id: 'TD', positions: ['15', '14'] },
  { id: 'TX', positions: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'] },
  { id: 'TC', positions: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TD', positions: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TE', positions: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TF', positions: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TG', positions: ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TH', positions: ['11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TJ', positions: ['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
  { id: 'TK', positions: ['10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
];

export function RackGrid() {
  const { settings } = useSettings();
  const [sourcePosition, setSourcePosition] = useState<string | null>(null);
  const [targetPosition, setTargetPosition] = useState<string | null>(null);
  const [routeType, setRouteType] = useState<'default' | 'alternate'>('default');

  const handlePositionClick = (positionId: string) => {
    if (!sourcePosition) {
      setSourcePosition(positionId);
    } else if (!targetPosition) {
      setTargetPosition(positionId);
    } else {
      // Reset and start new selection
      setSourcePosition(positionId);
      setTargetPosition(null);
    }
  };

  const isSelected = (positionId: string) => 
    positionId === sourcePosition || positionId === targetPosition;

  return (
    <div className="relative">
      {/* Grid background */}
      {settings.showGrid && (
        <div className="absolute inset-0 grid grid-cols-3 pointer-events-none">
          <div className="border-r border-dashed border-gray-300" />
          <div className="border-r border-dashed border-gray-300" />
        </div>
      )}

      {/* Path Overlay */}
      <PathOverlay 
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        routeType={routeType}
      />

      {/* Rack grid */}
      <div className="relative space-y-2">
        {RACK_ROWS.map((row) => (
          <div key={row.id} className="flex items-center gap-2">
            <div className="w-8 font-medium text-gray-700">{row.id}</div>
            <div className="flex gap-1">
              {row.positions.map((position) => {
                const positionId = `${row.id}-${position}`;
                return (
                  <RackPosition
                    key={positionId}
                    id={positionId}
                    label={position}
                    isSelected={isSelected(positionId)}
                    isSource={positionId === sourcePosition}
                    isTarget={positionId === targetPosition}
                    showMeasurements={settings.showMeasurements}
                    onClick={() => handlePositionClick(positionId)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Zone labels - only show if settings.showMeasurements is true */}
      {settings.showMeasurements && (
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <div>Aisle Route (Default)</div>
          <div>Middle Cross Tray (TH08-TC11)</div>
          <div>End Cross Tray (TK01-TC04)</div>
        </div>
      )}

      {/* Height measurements - only show if settings.showMeasurements is true */}
      {settings.showMeasurements && (
        <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
          <div>{settings.middleCrossTrayHeight}ft</div>
          <div className="mt-4">{settings.endCrossTrayHeight}ft</div>
        </div>
      )}
    </div>
  );
} 