import { Settings } from '../../types/settings';

interface PresetManagerProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  currentPreset: string;
  onPresetChange: (preset: string) => void;
}

export const PresetManager = ({
  settings,
  setSettings,
  currentPreset,
  onPresetChange
}: PresetManagerProps) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">Preset:</label>
      <select
        value={currentPreset}
        onChange={(e) => onPresetChange(e.target.value)}
        className="w-[180px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <option value="custom">Custom</option>
        <option value="standard">Standard</option>
      </select>
    </div>
  );
};