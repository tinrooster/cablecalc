import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ServerRoomCalculator = () => {
  // Visual constants
  const RACK_WIDTH = 45;
  const RACK_SPACING = 50;

  // Core state
  const [sourceRack, setSourceRack] = useState('');
  const [targetRack, setTargetRack] = useState('');
  const [routingType, setRoutingType] = useState('aisle');
  const [activePath, setActivePath] = useState(null);
  const [cableLength, setCableLength] = useState(null);

  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    // Standard measurements
    inRackAllowance: 11,    // Per rack allowance
    rackSpacing: 2,         // Space between racks
    rowCrossing: 8,         // Row to row via aisle
    aisleAllowance: 8,      // Aisle entry/exit
    verticalRun: 16,        // 8' up + 8' down
    dressingAllowance: 3,   // Cable dressing allowance
    slackAllowance: 3,      // Service loop/slack
    aisleEntryLength: 8,    // Standard aisle entry/exit
    scaleFactor: 10,        // Conversion factor for visual units to feet

    // Cross tray measurements
    middleTrayOverhead: 12, // Middle cross tray overhead
    endTrayOverhead: 12,    // End cross tray overhead

    // History settings
    historyEnabled: true,
    maxHistory: 10,
    sortByFrequency: true
  });

  // Calculate cable path and length
  const calculatePath = (targetRackId) => {
    console.log('Calculating path...'); // Debug log
    const start = getRackPosition(sourceRack);
    const end = getRackPosition(targetRackId || targetRack);
    if (!start || !end) return;

    // Base length includes vertical runs and allowances
    let length = settings.inRackAllowance * 2; // 11' per rack

    // Calculate horizontal distance
    const horizontalDistance = Math.abs(end.x - start.x) / settings.scaleFactor;
    const racksBetween = Math.floor(horizontalDistance / settings.rackSpacing);
    length += racksBetween * settings.rackSpacing;

    // Add row crossing if needed
    if (start.y !== end.y) {
      length += settings.rowCrossing;
      length += settings.aisleAllowance;
    }

    console.log('Calculated length:', length); // Debug log
    setActivePath(generatePath(start, end));
    setCableLength(Math.round(length));
  };

  // Selection history management
  const updateHistory = (rackId) => {
    if (!settings.historyEnabled) return;
    
    console.log('Updating history for:', rackId); // Debug log
    setRackFrequency(prev => ({
      ...prev,
      [rackId]: (prev[rackId] || 0) + 1
    }));

    setRackHistory(prev => {
      const newHistory = prev.filter(r => r !== rackId);
      newHistory.unshift(rackId);
      return newHistory.slice(0, settings.maxHistory);
    });
  };

  // Handle rack selection
  const handleRackClick = (rackId) => {
    console.log('Rack clicked:', rackId); // Debug log
    if (!sourceRack) {
      setSourceRack(rackId);
      updateHistory(rackId);
    } else if (!targetRack) {
      setTargetRack(rackId);
      updateHistory(rackId);
      calculatePath(rackId);
    } else {
      setSourceRack(rackId);
      setTargetRack('');
      setActivePath(null);
      setCableLength(null);
      updateHistory(rackId);
    }
  };

  // Settings panel component
  const SettingsPanel = () => (
    <div className="mt-4 mb-6">
      <Button 
        onClick={() => setShowSettings(!showSettings)} 
        variant="outline" 
        className="w-full"
      >
        {showSettings ? 'Hide Settings' : 'Show Length Calculation Settings'}
      </Button>
      
      {showSettings && (
        <div className="grid grid-cols-2 gap-4 mt-4 p-4 border rounded-lg">
          <div>
            <Label>Vertical Run (feet)</Label>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={settings.verticalRun}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  verticalRun: parseFloat(e.target.value) || 0
                }))}
                className="w-20"
              />
              <span className="text-sm text-gray-500">(Up + Down)</span>
            </div>
          </div>
          
          <div>
            <Label>Dressing Allowance (feet)</Label>
            <Input 
              type="number" 
              value={settings.dressingAllowance}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                dressingAllowance: parseFloat(e.target.value) || 0
              }))}
              className="w-20"
            />
          </div>
          
          <div>
            <Label>Slack Allowance (feet)</Label>
            <Input 
              type="number" 
              value={settings.slackAllowance}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                slackAllowance: parseFloat(e.target.value) || 0
              }))}
              className="w-20"
            />
          </div>
          
          <div>
            <Label>Aisle Entry/Exit (feet)</Label>
            <Input 
              type="number" 
              value={settings.aisleEntryLength}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                aisleEntryLength: parseFloat(e.target.value) || 0
              }))}
              className="w-20"
            />
          </div>

          <div>
            <Label>Scale Factor (pixels/foot)</Label>
            <Input 
              type="number" 
              value={settings.scaleFactor}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                scaleFactor: parseFloat(e.target.value) || 1
              }))}
              className="w-20"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Server Room Cable Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing rack selection controls */}
        <div className="grid grid-cols-3 gap-4">
          {/* ... existing controls ... */}
        </div>

        {/* Add Settings Panel here */}
        <SettingsPanel />

        {/* Existing SVG diagram */}
        <svg 
          width={800} 
          height={600}
          className="border border-gray-200"
        >
          {/* ... existing SVG content ... */}
        </svg>

        {/* ... rest of the existing component ... */}
      </CardContent>
    </Card>
  );
};