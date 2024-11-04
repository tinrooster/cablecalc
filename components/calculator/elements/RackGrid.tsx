'use client'

import { useState } from 'react';
import { RackPosition } from './RackPosition';

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
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Zone indicators */}
      <div className="absolute inset-0 grid grid-cols-3 pointer-events-none">
        <div className="border-r border-dashed border-gray-300" />
        <div className="border-r border-dashed border-gray-300" />
      </div>

      {/* Rack grid */}
      <div className="relative space-y-2">
        {RACK_ROWS.map((row) => (
          <div key={row.id} className="flex items-center gap-2">
            <div className="w-8 font-medium text-gray-700">{row.id}</div>
            <div className="flex gap-1">
              {row.positions.map((position) => (
                <RackPosition
                  key={`${row.id}-${position}`}
                  id={`${row.id}-${position}`}
                  label={position}
                  isSelected={selectedPosition === `${row.id}-${position}`}
                  onClick={() => setSelectedPosition(`${row.id}-${position}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Zone labels */}
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <div>Aisle Route (Default)</div>
        <div>Middle Cross Tray (TH08-TC11)</div>
        <div>End Cross Tray (TK01-TC04)</div>
      </div>
    </div>
  );
} 