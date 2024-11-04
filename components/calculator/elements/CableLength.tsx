'use client'

import { useSettings } from '../context/SettingsContext';
import { calculateCablePath } from '../utils/cableCalculations';

interface CableLengthProps {
  sourcePosition: string | null;
  targetPosition: string | null;
  routeType: 'default' | 'alternate';
}

export function CableLength({ sourcePosition, targetPosition, routeType }: CableLengthProps) {
  const { settings } = useSettings();

  if (!sourcePosition || !targetPosition) {
    return (
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-2">Required Cable Length:</h3>
        <p className="text-gray-600">Select source and target positions</p>
      </div>
    );
  }

  const metrics = calculateCablePath(sourcePosition, targetPosition, routeType, settings);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-2">Required Cable Length:</h3>
      <div className="text-2xl font-bold text-blue-600 mb-4">
        {metrics.totalLength} feet
      </div>
      
      {settings.showMeasurements && (
        <div className="text-sm text-gray-600 space-y-1">
          <p>Route: {metrics.routeDescription}</p>
          <p>Includes:</p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>Standard {settings.verticalRun}' vertical run (8' up + 8' down)</li>
            <li>{settings.dressingAllowance}' for dressing + {settings.slackAllowance}' slack</li>
            <li>{settings.aisleEntryExit}' entry and exit allowance</li>
            {metrics.crossTrayHeight > 0 && (
              <li>Cross tray height: {metrics.crossTrayHeight}'</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 