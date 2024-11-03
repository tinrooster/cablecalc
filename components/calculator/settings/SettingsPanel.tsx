'use client'

import React from 'react';
import { Settings } from '@/types/settings';

interface SettingsPanelProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  setSettings,
  showSettings,
  setShowSettings
}) => {
  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-center">
        <h2>Cable Path Settings</h2>
        <button onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>

      {showSettings && (
        <div className="space-y-4">
          {/* Global Settings */}
          <section>
            <h3>Standard Measurements</h3>
            {/* Vertical run, dressing allowance, etc. */}
          </section>

          {/* Visualization Options */}
          <section>
            <h3>Display Options</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showEnhancedVisualization}
                onChange={(e) => setSettings({
                  ...settings,
                  showEnhancedVisualization: e.target.checked
                })}
              />
              <span>Show Enhanced Path Visualization</span>
            </label>
          </section>
        </div>
      )}
    </div>
  );
}; 