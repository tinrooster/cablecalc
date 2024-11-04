'use client'

import { useSettings } from '../context/SettingsContext';

export function SettingsPanel() {
  const { settings, updateSettings, resetToStandard, resetAll } = useSettings();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
      {/* Preset Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preset:</label>
        <select
          value={settings.preset}
          onChange={(e) => updateSettings('preset', e.target.value)}
          className="w-48 border border-gray-300 rounded px-3 py-2"
        >
          <option value="Standard">Standard</option>
        </select>
      </div>

      {/* Standard Measurements */}
      <div className="space-y-4">
        <h3 className="font-medium">Standard Measurements</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vertical Run (feet)</label>
            <input
              type="number"
              value={settings.verticalRun}
              onChange={(e) => updateSettings('verticalRun', Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500">Standard up/down run</span>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Dressing Allowance (feet)</label>
            <input
              type="number"
              value={settings.dressingAllowance}
              onChange={(e) => updateSettings('dressingAllowance', Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500">Cable dressing allowance</span>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Slack Allowance (feet)</label>
            <input
              type="number"
              value={settings.slackAllowance}
              onChange={(e) => updateSettings('slackAllowance', Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500">Service loop allowance</span>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Aisle Entry/Exit (feet)</label>
            <input
              type="number"
              value={settings.aisleEntryExit}
              onChange={(e) => updateSettings('aisleEntryExit', Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500">Standard aisle entry/exit</span>
          </div>
        </div>
      </div>

      {/* Cross Tray Heights */}
      <div className="space-y-4">
        <h3 className="font-medium">Cross Tray Heights</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Middle Cross Tray Height (feet)</label>
            <input
              type="number"
              value={settings.middleCrossTrayHeight}
              onChange={(e) => updateSettings('middleCrossTrayHeight', Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500">TH08-TC11 overhead height</span>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">End Cross Tray Height (feet)</label>
            <input
              type="number"
              value={settings.endCrossTrayHeight}
              onChange={(e) => updateSettings('endCrossTrayHeight', Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-xs text-gray-500">TK01-TC04 overhead height</span>
          </div>
        </div>
      </div>

      {/* Visualization Options */}
      <div>
        <h3 className="font-medium mb-2">Visualization</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.showMeasurements}
              onChange={(e) => updateSettings('showMeasurements', e.target.checked)}
              className="mr-2"
            />
            Show Measurements
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.showGrid}
              onChange={(e) => updateSettings('showGrid', e.target.checked)}
              className="mr-2"
            />
            Show Grid
          </label>
        </div>
      </div>

      {/* Reset Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={resetToStandard}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Reset to Standard
        </button>
        <button
          onClick={resetAll}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
} 