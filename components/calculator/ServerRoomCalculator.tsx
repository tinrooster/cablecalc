'use client'

import { useState, useCallback } from 'react'

// Component imports
import { SettingsPanel } from './settings/SettingsPanel'
import { PathOverlay } from './elements/PathOverlay'
import { CableLengthDisplay } from './elements/CableLengthDisplay'
import { MainRoomLayout } from './elements/MainRoomLayout'
import { RoutingPathSelector } from './elements/RoutingPathSelector'
import { RadioGroup } from '../ui/radio-group';
import { Label } from '../ui/label';

// Utils and constants
import { calculatePath } from '@/lib/utils/calculatePath'
import { calculations } from '@/lib/utils/calculations'
import { 
  defaultSettings,
  presets 
} from '@/lib/constants/settings'

// Types
import type { 
  CalculatorSettings,
  PathCalculation,
  RoomVisualizationProps 
} from '@/types/calculator'

export function ServerRoomCalculator() {
  // State management
  const [settings, setSettings] = useState<CalculatorSettings>(defaultSettings)
  const [calculatedPath, setCalculatedPath] = useState<PathCalculation | null>(null)

  // Handlers
  const handleSettingsChange = useCallback((newSettings: CalculatorSettings) => {
    setSettings(newSettings)
    const newPath = calculatePath(newSettings)
    setCalculatedPath(newPath)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Settings Panel - Left Side */}
        <div className="md:col-span-1">
          <SettingsPanel 
            settings={settings}
            onSettingsChange={handleSettingsChange}
            presets={presets}
          />
        </div>

        {/* Visualization - Right Side */}
        <div className="md:col-span-2">
          <MainRoomLayout>
            <RoutingPathSelector 
              settings={settings}
              onPathChange={handleSettingsChange}
            />
            {calculatedPath && (
              <PathOverlay 
                path={calculatedPath}
                settings={settings}
              />
            )}
          </MainRoomLayout>

          {/* Cable Length Display */}
          {calculatedPath && (
            <CableLengthDisplay 
              calculation={calculatedPath}
              settings={settings}
            />
          )}
        </div>
      </div>
    </div>
  )
}