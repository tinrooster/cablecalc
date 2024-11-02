import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ROOMS = {
  main: {
    id: 'main',
    name: 'Main Server Room',
    rows: [
      { id: 'TK', count: 10, start: 10, y: 490 },
      { id: 'TJ', count: 10, start: 10, y: 440 },
      { id: 'TH', count: 11, start: 11, y: 390 },
      { id: 'TG', count: 12, start: 12, y: 340 },
      { id: 'TF', count: 12, start: 12, y: 290 },
      { id: 'TE', count: 13, start: 13, y: 240 },
      { id: 'TD', count: 13, start: 13, y: 190 },
      { id: 'TC', count: 13, start: 13, y: 140 },
      { id: 'TX', count: 12, start: 6, y: 90, reverse: true }
    ],
    specialRacks: [
      { id: 'TD15', x: 50, y: 40 },
      { id: 'TD14', x: 50 + RACK_SPACING, y: 40 }
    ]
  },
  mcr: {
    id: 'mcr',
    name: 'MCR (Imagine)',
    rows: [
      { id: 'CB', count: 4, start: 2, y: 140, reverse: false },
      { id: 'CA', count: 5, start: 1, y: 90, reverse: false }
    ]
  },
  dalet: {
    id: 'dalet',
    name: 'Dalet Room',
    rows: [
      { id: 'RK', count: 4, start: 1, y: 90, reverse: false }
    ]
  },
  itx: {
    id: 'itx',
    name: 'ITX Room',
    columns: [
      { 
        id: 'IA', 
        start: 2, 
        count: 5,
        x: 200, // IA_X_OFFSET + 200
        reverse: false 
      },
      { 
        id: 'IB', 
        start: 1, 
        count: 6,
        x: 140, // IA_X_OFFSET + 140
        reverse: false 
      },
      { 
        id: 'IC', 
        start: 1, 
        count: 6,
        x: 80, // IA_X_OFFSET + 80
        reverse: false 
      },
      { 
        id: 'ID', 
        start: 4, 
        count: 3,
        x: 20, // IA_X_OFFSET + 20
        reverse: false 
      }
    ],
    layout: 'vertical',
    dimensions: {
      rackWidth: 40, // RACK_WIDTH-5
      rackHeight: 60,
      rowHeight: 80, // ROW_HEIGHT
      baseYOffset: 40 // IA_Y_OFFSET + 40
    }
  },
  clamper: {
    id: 'clamper',
    name: 'Clamper Room',
    racks: [
      { id: 'CL01', x: 50, y: 50 }
    ]
  }
};

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
    sortByFrequency: true,

    // Inter-room distances
    mcrDistance: 35,        // Fixed distance to MCR
    itxDistance: 20,        // Default distance to ITX/Dalet
    useMdfRoute: false,     // Toggle for MDF/Direct route to MCR

    // TD14/15 specific measurements
    td15Distance: 15,      // Default distance to TD15 from main room
    td14Distance: 17,      // Default distance to TD14 from main room
    mdfPanelHeight: 8,     // Height of MDF panel in TD15

    // Clamper room routing options
    clamperViaDoor: {
      distance: 25,    // Default distance via doorway
      enabled: true    // Toggle between doorway and TK04 route
    },
    clamperViaTK04: {
      distance: 8      // Fixed distance via TK04
    }
  });

  // Add new state for room selection
  const [currentRoom, setCurrentRoom] = useState('main');

  // Calculate cable path and length
  const calculatePath = (sourceRack, targetRack) => {
    // Validate rack selection first
    const validationErrors = validateRackSelection(sourceRack, targetRack);
    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return null;
    }

    const sourcePos = getRackPosition(sourceRack);
    const targetPos = getRackPosition(targetRack);
    
    // Handle Clamper room routing
    if (sourceRack?.startsWith('CL') || targetRack?.startsWith('CL')) {
      const clamperRack = sourceRack?.startsWith('CL') ? sourceRack : targetRack;
      const otherRack = sourceRack?.startsWith('CL') ? targetRack : sourceRack;
      
      if (settings.clamperViaDoor.enabled) {
        // Route through doorway
        return calculateClamperDoorwayPath(clamperRack, otherRack);
      } else {
        // Route through TK04
        return calculateClamperTK04Path(clamperRack, otherRack);
      }
    }

    // Check for adjacent racks in same row
    const sameRow = sourceRack.slice(0, 2) === targetRack.slice(0, 2);
    const adjacent = sameRow && Math.abs(
      parseInt(sourceRack.slice(2)) - parseInt(targetRack.slice(2))
    ) === 1;

    if (adjacent) {
      // Direct path for adjacent racks
      const length = RACK_SPACING / settings.scaleFactor + 
                    settings.dressingAllowance + 
                    settings.slackAllowance;
                      
      return {
        path: [
          [sourcePos.x + RACK_WIDTH/2, sourcePos.y],
          [targetPos.x + RACK_WIDTH/2, targetPos.y]
        ],
        length,
        description: `Direct connection between adjacent racks (${length}′)`
      };
    }

    // Existing routing logic for non-adjacent racks...
  };

  // Helper functions for Clamper room routing
  const calculateClamperDoorwayPath = (clamperRack, otherRack) => {
    const clamperPos = getRackPosition(clamperRack);
    const otherPos = getRackPosition(otherRack);
    const doorwayPoint = { x: 300, y: 200 }; // Adjust coordinates based on actual layout

    return {
      path: [
        [clamperPos.x + RACK_WIDTH/2, clamperPos.y],
        [doorwayPoint.x, doorwayPoint.y],
        [otherPos.x + RACK_WIDTH/2, otherPos.y]
      ],
      length: settings.clamperViaDoor.distance + 
              settings.dressingAllowance + 
              settings.slackAllowance,
      description: 'Routed through Clamper room doorway'
    };
  };

  const calculateClamperTK04Path = (clamperRack, otherRack) => {
    const clamperPos = getRackPosition(clamperRack);
    const tk04Pos = getRackPosition('TK04');
    const otherPos = getRackPosition(otherRack);

    return {
      path: [
        [clamperPos.x + RACK_WIDTH/2, clamperPos.y],
        [tk04Pos.x + RACK_WIDTH/2, tk04Pos.y],
        [otherPos.x + RACK_WIDTH/2, otherPos.y]
      ],
      length: settings.clamperViaTK04.distance + 
              settings.dressingAllowance + 
              settings.slackAllowance,
      description: 'Routed through TK04'
    };
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

  // Validation utilities
  const validateSettings = (settings) => {
    const errors = [];
    
    // Distance validations
    if (settings.td15Distance < 0) {
      errors.push("TD15 distance cannot be negative");
    }
    if (settings.td14Distance < 0) {
      errors.push("TD14 distance cannot be negative");
    }
    if (settings.mdfPanelHeight <= 0) {
      errors.push("MDF panel height must be greater than 0");
    }
    
    // Scale factor validation
    if (settings.scaleFactor <= 0) {
      errors.push("Scale factor must be greater than 0");
    }

    // Logical validations
    if (settings.td14Distance < settings.td15Distance) {
      errors.push("TD14 should not be closer than TD15");
    }
    
    // Inter-room distance validations
    if (settings.mcrDistance < settings.td15Distance) {
      errors.push("MCR distance should be greater than TD15 distance");
    }
    
    return errors;
  };

  // Settings panel component
  const SettingsPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="mt-4">
        <Button 
          onClick={() => setIsOpen(!isOpen)} 
          variant="outline" 
          className="w-full"
        >
          {isOpen ? 'Hide Settings' : 'Show Length Calculation Settings'}
        </Button>
        
        {isOpen && (
          <div className="mt-4 p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Vertical Run (feet)</Label>
                <Input 
                  type="number" 
                  value={settings.verticalRun}
                  onChange={(e) => updateSettings('verticalRun', e.target.value)}
                  className="w-20"
                />
              </div>
              <div>
                <Label>Dressing Allowance (feet)</Label>
                <Input 
                  type="number" 
                  value={settings.dressingAllowance}
                  onChange={(e) => updateSettings('dressingAllowance', e.target.value)}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Add room selection controls to the UI
  const RoomSelector = () => (
    <Select 
      value={currentRoom} 
      onValueChange={setCurrentRoom}
      className="w-full"
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Main Server Room" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="main">Main Server Room</SelectItem>
        <SelectGroup>
          <SelectLabel>Other Rooms</SelectLabel>
          <SelectItem value="mcr">MCR (Imagine)</SelectItem>
          <SelectItem value="itx">ITX Room</SelectItem>
          <SelectItem value="dalet">Dalet Room</SelectItem>
          <SelectItem value="clamper">Clamper</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  // Add to path calculation logic
  const calculateInterRoomPath = (sourceRack, targetRack) => {
    const sourceRoom = getRoomFromRack(sourceRack);
    const targetRoom = getRoomFromRack(targetRack);
    
    if (sourceRoom === targetRoom) {
      return calculateSameRoomPath(sourceRack, targetRack);
    }

    // MCR Room routing
    if (targetRoom === 'mcr') {
      const sourcePath = calculatePathToRack(sourceRack, 'TD15');
      return {
        length: sourcePath.length + settings.mcrDistance,
        path: [
          ...sourcePath.path,
          // Add path points to MCR entry
          [TD15_X + RACK_WIDTH/2, TD15_Y],
          [MCR_ENTRY_X, MCR_ENTRY_Y]
        ],
        description: `Via ${settings.useMdfRoute ? 'MDF panel' : 'direct route'} through TD15`
      };
    }

    // ITX/Dalet routing
    if (targetRoom === 'itx' || targetRoom === 'dalet') {
      const sourcePath = calculatePathToRack(sourceRack, 'TJ10');
      return {
        length: sourcePath.length + settings.itxDistance,
        path: [
          ...sourcePath.path,
          // Add path points to ITX entry at IA05
          [TJ10_X + RACK_WIDTH/2, TJ10_Y],
          [IA05_ENTRY_X, IA05_ENTRY_Y]
        ],
        description: `Via TJ10 to ${targetRoom.toUpperCase()} entry point`
      };
    }
  };

  // Add to settings panel
  const InterRoomSettings = () => (
    <>
      <div>
        <Label>ITX/Dalet Distance (feet)</Label>
        <Input 
          type="number" 
          value={settings.itxDistance}
          onChange={(e) => handleSettingChange({
            ...settings,
            itxDistance: parseFloat(e.target.value) || 20
          })}
          className="w-20"
        />
        <span className="text-sm text-gray-500">Distance from TJ10 to IA05</span>
      </div>

      <div>
        <Label>MCR Route</Label>
        <RadioGroup 
          value={settings.useMdfRoute ? 'mdf' : 'direct'}
          onValueChange={(value) => handleSettingChange({
            ...settings,
            useMdfRoute: value === 'mdf'
          })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="direct" id="direct" />
            <Label htmlFor="direct">Direct Route</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mdf" id="mdf" />
            <Label htmlFor="mdf">Via MDF Panel</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );

  // Constants for layouts
  const ROW_HEIGHT = 80;
  const IA_X_OFFSET = 400;
  const IA_Y_OFFSET = 40;

  // Main Room Layout Component
  const MainRoomLayout = () => (
    <>
      {/* Path Indicators */}
      {Object.entries(pathConfig).map(([key, config]) => (
        <g key={key} transform={`translate(${config.x}, 20)`}>
          <line 
            x1="0" y1="0" x2="0" y2="540" 
            stroke={key === routingType ? "#2563eb" : "#94a3b8"} 
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text 
            x="5" y="15" 
            className="text-[10px]" 
            fill={key === routingType ? "#2563eb" : "#94a3b8"}
          >
            {config.label}
          </text>
        </g>
      ))}

      {/* TD14/15 Special Racks */}
      <g transform="translate(50, 40)">
        <circle cx="-25" cy="17" r="16" className="fill-none stroke-gray-400" />
        <text x="-25" y="20" textAnchor="middle" className="text-[12px] font-bold">TD</text>
        <rect 
          width={RACK_WIDTH} height={35} 
          fill={sourceRack === 'TD15' || targetRack === 'TD15' ? '#bfdbfe' : '#e9d5ff'} 
          stroke="#666" 
          onClick={() => handleRackClick('TD15')}
          className="cursor-pointer hover:stroke-blue-500 hover:stroke-2"
        />
        <text x={RACK_WIDTH/2} y={24} textAnchor="middle" className="text-[14px] select-none">15</text>
      </g>
      
      {/* Main Rack Rows */}
      {ROOMS.main.rows.map((row) => (
        <g key={row.id} transform={`translate(0, ${row.y})`}>
          <circle cx="25" cy="17" r="16" className="fill-none stroke-gray-400" />
          <text x="25" y="21" textAnchor="middle" className="text-[12px] font-bold">{row.id}</text>
          
          {Array.from({length: row.count}, (_, i) => {
            const rackNum = row.reverse ? (row.start + i) : (row.start - i);
            const rackId = formatRackId(row.id, rackNum);
            return (
              <g 
                key={rackId} 
                transform={`translate(${50 + i * RACK_SPACING}, 0)`}
                onClick={() => handleRackClick(rackId)}
                className="cursor-pointer"
              >
                <rect 
                  width={RACK_WIDTH} height={35} 
                  fill={getRackFillColor(rackId)}
                  stroke="#666"
                  className="hover:stroke-blue-500 hover:stroke-2" 
                />
                <text x={RACK_WIDTH/2} y={24} textAnchor="middle" className="text-[14px] select-none">
                  {String(rackNum).padStart(2, '0')}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </>
  );

  // ITX Room Layout Component
  const ITXLayout = () => (
    <>
      {ROOMS.itx.columns.map((column) => (
        <g key={column.id}>
          {Array.from({length: column.count}, (_, i) => {
            const rackNum = column.start + i;
            const rackId = `${column.id}-${String(rackNum).padStart(2, '0')}`;
            return (
              <g 
                key={rackId} 
                transform={`translate(${column.x}, ${settings.baseYOffset + i * ROW_HEIGHT})`}
                onClick={() => handleRackClick(rackId)}
                className="cursor-pointer"
              >
                <rect 
                  width={RACK_WIDTH-5} height={60} 
                  fill={getRackFillColor(rackId)}
                  stroke="#666"
                  className="hover:stroke-blue-500 hover:stroke-2" 
                />
                <text 
                  x={RACK_WIDTH/2-2} y={30} 
                  textAnchor="middle" 
                  className="text-xs select-none"
                >
                  {rackId}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </>
  );

  // MCR Layout Component
  const MCRLayout = () => (
    <>
      {ROOMS.mcr.rows.map((row, rowIndex) => (
        <g key={row.id} transform={`translate(50, ${100 + rowIndex * 50})`}>
          {Array.from({length: row.count}, (_, i) => {
            const rackNum = row.start + i;
            const rackId = `${row.id}-${String(rackNum).padStart(2, '0')}`;
            return (
              <g 
                key={rackId} 
                transform={`translate(${i * RACK_SPACING}, 0)`}
                onClick={() => handleRackClick(rackId)}
                className="cursor-pointer"
              >
                <rect 
                  width={RACK_WIDTH} height={35} 
                  fill={getRackFillColor(rackId)}
                  stroke="#666"
                  className="hover:stroke-blue-500 hover:stroke-2" 
                />
                <text 
                  x={RACK_WIDTH/2} y={24} 
                  textAnchor="middle" 
                  className="text-xs select-none"
                >
                  {rackId}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </>
  );

  // Dalet Room Layout Component
  const DaletLayout = () => (
    <g transform="translate(50, 100)">
      {Array.from({length: 4}, (_, i) => {
        const rackId = `RK${i + 1}`;
        return (
          <g 
            key={rackId} 
            transform={`translate(${i * RACK_SPACING}, 0)`}
            onClick={() => handleRackClick(rackId)}
            className="cursor-pointer"
          >
            <rect 
              width={RACK_WIDTH} height={35} 
              fill={getRackFillColor(rackId)}
              stroke="#666"
              className="hover:stroke-blue-500 hover:stroke-2" 
            />
            <text 
              x={RACK_WIDTH/2} y={24} 
              textAnchor="middle" 
              className="text-xs select-none"
            >
              {rackId}
            </text>
          </g>
        );
      })}
    </g>
  );

  // Clamper Room Layout Component
  const ClamperLayout = () => (
    <g transform="translate(50, 50)">
      <rect 
        width={RACK_WIDTH} 
        height={35} 
        fill={getRackFillColor('CL01')}
        stroke="#666"
        onClick={() => handleRackClick('CL01')}
        className="cursor-pointer hover:stroke-blue-500 hover:stroke-2" 
      />
      <text 
        x={RACK_WIDTH/2} 
        y={24} 
        textAnchor="middle" 
        className="text-xs select-none"
      >
        CL01
      </text>
    </g>
  );

  // Add to SettingsPanel
  const MdfSettings = () => (
    <>
      <div>
        <Label>TD15 Distance (feet)</Label>
        <Input 
          type="number" 
          value={settings.td15Distance}
          onChange={(e) => handleSettingChange({
            ...settings,
            td15Distance: parseFloat(e.target.value) || 15
          })}
          className="w-20"
        />
      </div>
      <div>
        <Label>TD14 Distance (feet)</Label>
        <Input 
          type="number" 
          value={settings.td14Distance}
          onChange={(e) => handleSettingChange({
            ...settings,
            td14Distance: parseFloat(e.target.value) || 17
          })}
          className="w-20"
        />
      </div>
      <div>
        <Label>MDF Panel Height (feet)</Label>
        <Input 
          type="number" 
          value={settings.mdfPanelHeight}
          onChange={(e) => handleSettingChange({
            ...settings,
            mdfPanelHeight: parseFloat(e.target.value) || 8
          })}
          className="w-20"
        />
      </div>
    </>
  );

  // Validation for adjacent racks and Clamper routing
  const validateRackSelection = (sourceRack, targetRack) => {
    const errors = [];
    
    // Adjacent rack validation
    if (sourceRack && targetRack) {
      const sameRow = sourceRack.slice(0, 2) === targetRack.slice(0, 2);
      const rackNumDiff = Math.abs(
        parseInt(sourceRack.slice(2)) - parseInt(targetRack.slice(2))
      );
      
      // Validate adjacent racks in same row
      if (sameRow && rackNumDiff === 1) {
        // Check if there are any known obstructions between adjacent racks
        const rowId = sourceRack.slice(0, 2);
        const lowerNum = Math.min(
          parseInt(sourceRack.slice(2)),
          parseInt(targetRack.slice(2))
        );
        
        // Add any row-specific adjacency rules
        if (rowId === 'TD' && lowerNum === 14) {
          errors.push("TD14 and TD15 require special routing due to MDF panel");
        }
      }
    }

    // Clamper room routing validation
    if (sourceRack?.startsWith('CL') || targetRack?.startsWith('CL')) {
      const nonClamperRack = sourceRack?.startsWith('CL') ? targetRack : sourceRack;
      
      if (!settings.clamperViaDoor.enabled) {
        // Validate TK04 routing
        if (!nonClamperRack?.startsWith('TK04')) {
          errors.push("When not using doorway, Clamper room must route through TK04");
        }
      }
    }

    return errors;
  };

  // Add to SettingsPanel component
  const ClamperSettings = () => (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-medium mb-2">Clamper Room Routing</h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <RadioGroup 
            value={settings.clamperViaDoor.enabled ? 'door' : 'tk04'}
            onValueChange={(value) => setSettings(prev => ({
              ...prev,
              clamperViaDoor: {
                ...prev.clamperViaDoor,
                enabled: value === 'door'
              }
            }))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="door" id="door-route" />
              <Label htmlFor="door-route">Via Doorway (25')</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tk04" id="tk04-route" />
              <Label htmlFor="tk04-route">Via TK04 (Fixed 8')</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  // Add visual indicator for TK04 connection point
  const ClamperConnectionIndicator = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <g 
        transform={`translate(${getTK04Position().x + RACK_WIDTH/2}, ${getTK04Position().y})`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Connection point indicator */}
        <circle
          r={6}
          fill={settings.clamperViaDoor.enabled ? "#94a3b8" : "#2563eb"}
          className="transition-all duration-200"
        />
        
        {/* Fixed distance label */}
        {isHovered && (
          <g transform="translate(0, -20)">
            <rect
              x={-30}
              y={-15}
              width={60}
              height={25}
              fill="white"
              stroke="#2563eb"
              rx={4}
              className="opacity-90"
            />
            <text
              textAnchor="middle"
              y={0}
              className="text-xs font-medium"
              fill="#2563eb"
            >
              8' to CL01
            </text>
          </g>
        )}
        
        {/* Connection line to Clamper (when selected) */}
        {!settings.clamperViaDoor.enabled && (
          <line
            x1={0}
            y1={0}
            x2={getClamperPosition().x - getTK04Position().x}
            y2={getClamperPosition().y - getTK04Position().y}
            stroke="#2563eb"
            strokeWidth={2}
            strokeDasharray="4 4"
            className="opacity-50"
          />
        )}
      </g>
    );
  };

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Server Room Cable Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label>Source Rack</Label>
            <Select value={sourceRack} onValueChange={setSourceRack}>
              <SelectTrigger>
                <SelectValue placeholder="Click rack in diagram" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Clear Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Target Rack</Label>
            <Select value={targetRack} onValueChange={setTargetRack}>
              <SelectTrigger>
                <SelectValue placeholder="Click rack in diagram" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Clear Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <RoutingPathSelector />
          </div>
        </div>

        <SettingsPanel />

        {/* SVG diagram */}
        <svg width={800} height={600} className="border border-gray-200">
          <MainRoomLayout />
          {activePath && <PathOverlay path={activePath} />}
        </svg>

        {/* Results display */}
        {cableLength && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium">Required Cable Length:</h3>
            <p className="text-2xl font-bold">{cableLength} feet</p>
            <p className="text-sm text-gray-600 mt-2">
              Includes standard {settings.verticalRun}' vertical run 
              ({settings.verticalRun/2}' up + {settings.verticalRun/2}' down + {settings.dressingAllowance}' for dressing + {settings.slackAllowance}' slack)
              {routingType === 'aisle' && ` plus ${settings.aisleEntryLength}' entry and exit allowance`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};