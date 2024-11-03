import React from 'react';
import { Settings } from '../../types/settings';

interface VisualizationSettingsProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export const VisualizationSettings: React.FC<VisualizationSettingsProps> = ({
  settings,
  setSettings
}) => {
  const updateVisualization = (updates: Partial<Settings['visualization']>) => {
    setSettings({
      ...settings,
      visualization: {
        ...settings.visualization,
        ...updates
      }
    });
  };

  return (
    <div>
      <h4>Visualization Settings</h4>
      <div>
        <label>
          <span>Show Measurements</span>
          <input
            type="checkbox"
            checked={settings.visualization.showMeasurements}
            onChange={(e) => updateVisualization({ showMeasurements: e.target.checked })}
          />
        </label>
        <label>
          <span>Show Grid</span>
          <input
            type="checkbox"
            checked={settings.visualization.showGrid}
            onChange={(e) => updateVisualization({ showGrid: e.target.checked })}
          />
        </label>
      </div>
    </div>
  );
};