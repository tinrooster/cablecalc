"use client"

import { useState } from 'react';

type RackPosition = {
  row: string;  // TD, TX, TC, etc.
  number: string;  // 01-17
};

interface RackGridProps {
  onSourceSelect: (position: RackPosition) => void;
  onTargetSelect: (position: RackPosition) => void;
  selectedSource?: RackPosition;
  selectedTarget?: RackPosition;
}

export function RackGrid({ 
  onSourceSelect, 
  onTargetSelect,
  selectedSource,
  selectedTarget 
}: RackGridProps) {
  
  // Define rack rows
  const rackRows = [
    { id: 'TD', cells: ['15', '14'] },
    { id: 'TX', cells: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'] },
    { id: 'TC', cells: ['13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01'] },
    // Add other rows (TD, TE, TF, etc.)
  ];

  return (
    <div className="grid gap-2">
      {rackRows.map((row) => (
        <div key={row.id} className="flex items-center gap-2">
          <div className="w-8 font-bold">{row.id}</div>
          <div className="flex gap-1">
            {row.cells.map((cell) => (
              <button
                key={`${row.id}-${cell}`}
                className={`
                  w-10 h-10 border rounded
                  ${selectedSource?.row === row.id && selectedSource?.number === cell ? 'bg-blue-200' : ''}
                  ${selectedTarget?.row === row.id && selectedTarget?.number === cell ? 'bg-green-200' : ''}
                  hover:bg-gray-100
                `}
                onClick={() => {
                  const position = { row: row.id, number: cell };
                  if (!selectedSource) {
                    onSourceSelect(position);
                  } else if (!selectedTarget) {
                    onTargetSelect(position);
                  }
                }}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 