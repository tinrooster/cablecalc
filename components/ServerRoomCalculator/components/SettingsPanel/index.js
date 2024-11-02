import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export const SettingsPanel = ({ settings, setSettings, showSettings, setShowSettings }) => {
  // For now, let's just do a simple settings panel to get it working
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Settings</h3>
        <Button 
          variant="outline" 
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Hide' : 'Show'} Settings
        </Button>
      </div>

      {showSettings && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="verticalRun">Vertical Run (feet)</Label>
            <Input
              id="verticalRun"
              type="number"
              value={settings.verticalRun}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                verticalRun: Number(e.target.value)
              }))}
            />
          </div>

          <div>
            <Label htmlFor="dressingAllowance">Dressing Allowance (feet)</Label>
            <Input
              id="dressingAllowance"
              type="number"
              value={settings.dressingAllowance}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                dressingAllowance: Number(e.target.value)
              }))}
            />
          </div>
        </div>
      )}
    </div>
  );
}; 