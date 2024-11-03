import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { VisualizationSettings } from './VisualizationSettings';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CABLE_PRESETS } from '../../constants/presets';
import { PresetManager } from './PresetManager';

export const SettingsPanel = ({ settings, setSettings, showSettings, setShowSettings }) => {
  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: Number(value)
      }
    }));
  };

  const handlePresetChange = (presetKey) => {
    if (presetKey === 'custom') return;
    
    const preset = CABLE_PRESETS[presetKey];
    if (preset) {
      setSettings(preset.settings);
    }
  };

  const isUsingPreset = (presetKey) => {
    const preset = CABLE_PRESETS[presetKey];
    if (!preset) return false;

    return Object.entries(preset.settings).every(([key, value]) => {
      if (key === 'visualization') {
        return Object.entries(value).every(([vKey, vValue]) => 
          settings.visualization[vKey] === vValue
        );
      }
      return settings[key] === value;
    });
  };

  const currentPreset = Object.entries(CABLE_PRESETS).find(([key]) => 
    isUsingPreset(key)
  )?.[0] || 'custom';

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Cable Path Settings</h3>
        <Button 
          variant="outline" 
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </Button>
      </div>

      {showSettings && (
        <div className="space-y-6">
          <PresetManager
            settings={settings}
            setSettings={setSettings}
            currentPreset={currentPreset}
            onPresetChange={handlePresetChange}
          />

          {/* Standard Measurements */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Standard Measurements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="verticalRun">Vertical Run (feet)</Label>
                <Input
                  id="verticalRun"
                  type="number"
                  value={settings.verticalRun}
                  onChange={(e) => updateSetting('standard', 'verticalRun', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Standard up/down run</p>
              </div>
              <div>
                <Label htmlFor="dressingAllowance">Dressing Allowance (feet)</Label>
                <Input
                  id="dressingAllowance"
                  type="number"
                  value={settings.dressingAllowance}
                  onChange={(e) => updateSetting('standard', 'dressingAllowance', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Cable dressing allowance</p>
              </div>
              <div>
                <Label htmlFor="slackAllowance">Slack Allowance (feet)</Label>
                <Input
                  id="slackAllowance"
                  type="number"
                  value={settings.slackAllowance}
                  onChange={(e) => updateSetting('standard', 'slackAllowance', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Service loop allowance</p>
              </div>
              <div>
                <Label htmlFor="aisleEntryLength">Aisle Entry/Exit (feet)</Label>
                <Input
                  id="aisleEntryLength"
                  type="number"
                  value={settings.aisleEntryLength}
                  onChange={(e) => updateSetting('standard', 'aisleEntryLength', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Standard aisle entry/exit</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cross Tray Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Cross Tray Heights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="middleTrayOverhead">Middle Cross Tray Height (feet)</Label>
                <Input
                  id="middleTrayOverhead"
                  type="number"
                  value={settings.middleTrayOverhead}
                  onChange={(e) => updateSetting('crossTray', 'middleTrayOverhead', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">TH08-TC11 overhead height</p>
              </div>
              <div>
                <Label htmlFor="endTrayOverhead">End Cross Tray Height (feet)</Label>
                <Input
                  id="endTrayOverhead"
                  type="number"
                  value={settings.endTrayOverhead}
                  onChange={(e) => updateSetting('crossTray', 'endTrayOverhead', e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">TK01-TC04 overhead height</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Visualization Settings */}
          <VisualizationSettings settings={settings} setSettings={setSettings} />

          <Separator />

          {/* Modified Reset Button section */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => handlePresetChange('standard')}
            >
              Reset to Standard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="text-red-600 hover:text-red-700"
            >
              Reset All Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 