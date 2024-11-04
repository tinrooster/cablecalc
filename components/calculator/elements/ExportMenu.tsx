'use client'

import { useState } from 'react';
import { exportCalculations } from '../utils/exportUtils';

interface ExportMenuProps {
  currentCalculation: CableCalculation | null;
  calculationHistory: CableCalculation[];
}

export function ExportMenu({ currentCalculation, calculationHistory }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: 'simple' | 'detailed', scope: 'current' | 'all') => {
    const calculations = scope === 'current' && currentCalculation ? 
      [currentCalculation] : 
      calculationHistory;

    exportCalculations(calculations, format, scope);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Export Calculations
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          <button
            onClick={() => handleExport('simple', 'current')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={!currentCalculation}
          >
            Export Current (Simple)
          </button>
          <button
            onClick={() => handleExport('detailed', 'current')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={!currentCalculation}
          >
            Export Current (Detailed)
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            onClick={() => handleExport('simple', 'all')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={calculationHistory.length === 0}
          >
            Export All (Simple)
          </button>
          <button
            onClick={() => handleExport('detailed', 'all')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={calculationHistory.length === 0}
          >
            Export All (Detailed)
          </button>
        </div>
      )}
    </div>
  );
} 