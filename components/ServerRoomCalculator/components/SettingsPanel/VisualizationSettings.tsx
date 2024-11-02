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
  const handleChange = (key: keyof Settings['visualization']) => {
    setSettings({
      ...settings,
      visualization: {
        ...settings.visualization,
        [key]: !settings.visualization[key]
      }
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Visualization</h4>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.visualization.showMeasurements}
            onChange={() => handleChange('showMeasurements')}
            className="form-checkbox"
          />
          <span>Show Measurements</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.visualization.showGrid}
            onChange={() => handleChange('showGrid')}
            className="form-checkbox"
          />
          <span>Show Grid</span>
        </label>
      </div>
    </div>
  );
};