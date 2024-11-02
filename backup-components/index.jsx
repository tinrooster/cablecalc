import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MainRoomLayout } from './components/MainRoomLayout';
import { PathOverlay } from './components/PathOverlay';
import { SettingsPanel } from './components/SettingsPanel';
import { RoutingPathSelector } from './components/RoutingPathSelector';
import { ClamperConnectionIndicator } from './components/ClamperConnectionIndicator';
import { calculatePath } from './utils/calculations';
import { DEFAULT_SETTINGS } from './constants/settings';

const ServerRoomCalculator = () => {
  // State management
  const [sourceRack, setSourceRack] = useState('');
  const [targetRack, setTargetRack] = useState('');
  const [routingType, setRoutingType] = useState('aisle');
  const [activePath, setActivePath] = useState(null);
  const [cableLength, setCableLength] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  // Handle rack selection
  const handleRackClick = (rackId) => {
    if (!sourceRack) {
      setSourceRack(rackId);
    } else if (!targetRack) {
      setTargetRack(rackId);
      // Calculate path when both racks are selected
      const path = calculatePath(rackId, sourceRack, routingType, settings);
      setActivePath(path);
      setCableLength(path?.length);
    } else {
      // Reset selections
      setSourceRack(rackId);
      setTargetRack('');
      setActivePath(null);
      setCableLength(null);
    }
  };

  // Handle routing type changes
  const handleRoutingTypeChange = (type) => {
    setRoutingType(type);
    if (sourceRack && targetRack) {
      const path = calculatePath(targetRack, sourceRack, type, settings);
      setActivePath(path);
      setCableLength(path?.length);
    }
  };

  return (
    <Card className="w-full max-w-5xl p-4 space-y-4">
      {/* Settings Panel */}
      <SettingsPanel
        settings={settings}
        setSettings={setSettings}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* SVG Container */}
        <div className="flex-1 relative">
          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto border rounded-lg"
          >
            {/* Room Layout */}
            <MainRoomLayout
              RACK_WIDTH={45}
              RACK_SPACING={50}
              handleRackClick={handleRackClick}
              sourceRack={sourceRack}
              targetRack={targetRack}
            />

            {/* Path Overlay */}
            <PathOverlay
              path={activePath}
              routingType={routingType}
              settings={settings}
            />

            {/* Clamper Connection Indicator */}
            <ClamperConnectionIndicator
              settings={settings}
              routingType={routingType}
              sourceRack={sourceRack}
              targetRack={targetRack}
            />
          </svg>
        </div>

        {/* Controls */}
        <div className="w-full md:w-64 space-y-4">
          {/* Routing Path Selector */}
          <RoutingPathSelector
            routingType={routingType}
            setRoutingType={handleRoutingTypeChange}
            sourceRack={sourceRack}
            targetRack={targetRack}
            settings={settings}
          />

          {/* Cable Length Display */}
          {cableLength && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700">
                Estimated Cable Length
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {Math.ceil(cableLength)}′
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Includes all allowances and service loops
              </p>
            </div>
          )}

          {/* Instructions */}
          {!sourceRack && (
            <p className="text-sm text-gray-500">
              Click a rack to select the source
            </p>
          )}
          {sourceRack && !targetRack && (
            <p className="text-sm text-gray-500">
              Click another rack to select the target
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ServerRoomCalculator; 