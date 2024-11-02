import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

export const VisualizationSettings = ({ settings, setSettings }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium">Path Visualization</h3>
    
    <div className="flex items-center space-x-2">
      <Switch
        id="enhancedVisuals"
        checked={settings.visualization?.enhanced}
        onCheckedChange={(checked) => 
          setSettings(prev => ({
            ...prev,
            visualization: {
              ...prev.visualization,
              enhanced: checked
            }
          }))
        }
      />
      <Label htmlFor="enhancedVisuals">Enhanced Path Visualization</Label>
    </div>

    {settings.visualization?.enhanced && (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="showArrows"
            checked={settings.visualization?.showArrows}
            onCheckedChange={(checked) => 
              setSettings(prev => ({
                ...prev,
                visualization: {
                  ...prev.visualization,
                  showArrows: checked
                }
              }))
            }
          />
          <Label htmlFor="showArrows">Show Direction Arrows</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="showDistances"
            checked={settings.visualization?.showDistances}
            onCheckedChange={(checked) => 
              setSettings(prev => ({
                ...prev,
                visualization: {
                  ...prev.visualization,
                  showDistances: checked
                }
              }))
            }
          />
          <Label htmlFor="showDistances">Show Distance Labels</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="showGlow"
            checked={settings.visualization?.showGlow}
            onCheckedChange={(checked) => 
              setSettings(prev => ({
                ...prev,
                visualization: {
                  ...prev.visualization,
                  showGlow: checked
                }
              }))
            }
          />
          <Label htmlFor="showGlow">Show Glow Effect</Label>
        </div>
      </div>
    )}
  </div>
); 