import React, { useState, useCallback, Suspense } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { RoomVisualization } from './components/RoomVisualization';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Card } from './components/Card';
import { useRackSelection } from './hooks/useRackSelection';
import type { Settings } from './types/settings';
import type { Path } from './types/calculations';
import { DEFAULT_SETTINGS } from './constants/defaults';

interface ServerRoomCalculatorProps {
  initialSettings?: Partial<Settings>;
  onSettingsChange?: (settings: Settings) => void;
}

export const ServerRoomCalculator: React.FC<ServerRoomCalculatorProps> = ({
  initialSettings,
  onSettingsChange
}) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);

  const {
    sourceRack,
    targetRack,
    calculateAndSetPath,
    setSourceRack,
    setTargetRack
  } = useRackSelection(settings);

  const handleSettingsUpdate = (newSettings: Settings) => {
    setSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  return (
    <ErrorBoundary>
      <Card className="w-full max-w-5xl p-4 space-y-4">
        <Suspense fallback={<LoadingOverlay />}>
          {/* Settings Panel */}
          <SettingsPanel
            settings={settings}
            setSettings={handleSettingsUpdate}
            showSettings={isSettingsVisible}
            setShowSettings={setIsSettingsVisible}
          />

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-4 relative">
            {isCalculating && <LoadingOverlay />}
            <RoomVisualization
              handleRackClick={handleRackClick}
              sourceRack={sourceRack}
              targetRack={targetRack}
              activePath={currentPath}
              routingType={routingType}
              settings={settings}
            />
            <ControlPanel
              routingType={routingType}
              onRoutingTypeChange={handleRoutingTypeChange}
              sourceRack={sourceRack}
              targetRack={targetRack}
              cableLength={cableLength}
              settings={settings}
            />
          </div>
        </Suspense>
      </Card>
    </ErrorBoundary>
  );
}; 