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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const PresetManager = ({ 
  settings, 
  setSettings, 
  currentPreset, 
  onPresetChange 
}) => {
  const [customPresets, setCustomPresets] = useState(
    JSON.parse(localStorage.getItem('customPresets') || '{}')
  );
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetDescription, setNewPresetDescription] = useState('');

  const saveCustomPreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset = {
      name: newPresetName,
      description: newPresetDescription,
      settings: { ...settings },
      isCustom: true
    };

    const updatedPresets = {
      ...customPresets,
      [newPresetName.toLowerCase().replace(/\s+/g, '_')]: newPreset
    };

    setCustomPresets(updatedPresets);
    localStorage.setItem('customPresets', JSON.stringify(updatedPresets));
    setSaveDialogOpen(false);
    setNewPresetName('');
    setNewPresetDescription('');
  };

  const deleteCustomPreset = (presetKey) => {
    const { [presetKey]: removed, ...remainingPresets } = customPresets;
    setCustomPresets(remainingPresets);
    localStorage.setItem('customPresets', JSON.stringify(remainingPresets));
    onPresetChange('standard'); // Reset to standard preset after deletion
  };

  const allPresets = {
    ...CABLE_PRESETS,
    ...customPresets
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Label>Cable Preset</Label>
          <Select value={currentPreset} onValueChange={onPresetChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a preset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Copper</SelectItem>
              <SelectItem value="fiber">Fiber Optic</SelectItem>
              <SelectItem value="minimal">Minimal Path</SelectItem>
              {Object.entries(customPresets).map(([key, preset]) => (
                <SelectItem key={key} value={key}>{preset.name}</SelectItem>
              ))}
              <SelectItem value="custom">Custom Settings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSaveDialogOpen(true)}
              >
                💾
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save current settings as preset</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Preset Description */}
      {allPresets[currentPreset]?.description && (
        <p className="text-sm text-gray-600 italic">
          {allPresets[currentPreset].description}
        </p>
      )}

      {/* Save Preset Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Custom Preset</DialogTitle>
            <DialogDescription>
              Save your current settings as a custom preset for future use.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="presetName">Preset Name</Label>
              <Input
                id="presetName"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="My Custom Preset"
              />
            </div>
            
            <div>
              <Label htmlFor="presetDescription">Description (optional)</Label>
              <Input
                id="presetDescription"
                value={newPresetDescription}
                onChange={(e) => setNewPresetDescription(e.target.value)}
                placeholder="Describe your preset settings"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCustomPreset}>Save Preset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Preset Management */}
      {currentPreset !== 'custom' && customPresets[currentPreset] && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => deleteCustomPreset(currentPreset)}
          >
            Delete Preset
          </Button>
        </div>
      )}
    </div>
  );
}; 