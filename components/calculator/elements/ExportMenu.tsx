'use client'

import { useState } from 'react';
import { exportCalculations, generatePreviewData } from '../utils/exportUtils';
import { PreviewModal } from './PreviewModal';

interface ExportMenuProps {
  currentCalculation: CableCalculation | null;
  calculationHistory: CableCalculation[];
}

export function ExportMenu({ currentCalculation, calculationHistory }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    data: string;
    format: 'simple' | 'detailed';
    scope: 'current' | 'all';
  } | null>(null);

  const handleExportClick = (format: 'simple' | 'detailed', scope: 'current' | 'all') => {
    const calculations = scope === 'current' && currentCalculation ? 
      [currentCalculation] : 
      calculationHistory;

    const previewContent = generatePreviewData(calculations, format);
    setPreviewData({ data: previewContent, format, scope });
    setIsOpen(false);
  };

  const handleConfirmExport = () => {
    if (previewData) {
      const calculations = previewData.scope === 'current' && currentCalculation ? 
        [currentCalculation] : 
        calculationHistory;
      
      exportCalculations(calculations, previewData.format, previewData.scope);
      setPreviewData(null);
    }
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
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={() => handleExportClick('simple', 'current')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={!currentCalculation}
          >
            Export Current (Simple)
          </button>
          <button
            onClick={() => handleExportClick('detailed', 'current')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={!currentCalculation}
          >
            Export Current (Detailed)
          </button>
          <div className="border-t border-gray-200 my-1" />
          <button
            onClick={() => handleExportClick('simple', 'all')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={calculationHistory.length === 0}
          >
            Export All (Simple)
          </button>
          <button
            onClick={() => handleExportClick('detailed', 'all')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            disabled={calculationHistory.length === 0}
          >
            Export All (Detailed)
          </button>
        </div>
      )}

      {previewData && (
        <PreviewModal
          data={previewData.data}
          format={previewData.format}
          onClose={() => setPreviewData(null)}
          onConfirm={handleConfirmExport}
        />
      )}
    </div>
  );
} 