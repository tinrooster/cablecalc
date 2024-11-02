import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ServerRoomCalculator = () => {
  // State
  const [sourceRack, setSourceRack] = useState('');
  const [targetRack, setTargetRack] = useState('');
  const [routingType, setRoutingType] = useState('aisle');
  const [cableLength, setCableLength] = useState(null);
  const [activePath, setActivePath] = useState(null);

  // Constants - now as state for adjustability
  const [settings, setSettings] = useState({
    verticalRun: 16,        // 8' up + 8' down
    dressingAllowance: 3,   // Cable dressing allowance
    slackAllowance: 3,      // Service loop/slack
    aisleEntryLength: 8,    // Standard aisle entry/exit
    scaleFactor: 10         // Conversion factor for visual units to feet
  });

  // Additional room definitions
  const secondaryRooms = {
    MCR: [
      { id: 'CB', count: 4, start: 5, end: 2 },  // CB02-CB05
      { id: 'CA', count: 5, start: 5, end: 1 }   // CA01-CA05
    ],
    DALET: [
      { id: 'RK', count: 4, start: 4, end: 1 }   // RK1-RK4
    ]
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
          <div className="grid grid-cols-2 gap-4 mt-4 p-4 border rounded-lg">
            <div>
              <Label>Vertical Run (feet)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  value={settings.verticalRun}
                  onChange={(e) => setSettings({
                    ...settings,
                    verticalRun: parseFloat(e.target.value)
                  })}
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
                onChange={(e) => setSettings({
                  ...settings,
                  dressingAllowance: parseFloat(e.target.value)
                })}
                className="w-20"
              />
            </div>
            
            <div>
              <Label>Slack Allowance (feet)</Label>
              <Input 
                type="number" 
                value={settings.slackAllowance}
                onChange={(e) => setSettings({
                  ...settings,
                  slackAllowance: parseFloat(e.target.value)
                })}
                className="w-20"
              />
            </div>
            
            <div>
              <Label>Aisle Entry/Exit (feet)</Label>
              <Input 
                type="number" 
                value={settings.aisleEntryLength}
                onChange={(e) => setSettings({
                  ...settings,
                  aisleEntryLength: parseFloat(e.target.value)
                })}
                className="w-20"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Row definitions
  const rows = [
    { id: 'TK', count: 10, start: 10, y: 490 },
    { id: 'TJ', count: 10, start: 10, y: 440 },
    { id: 'TH', count: 11, start: 11, y: 390 },
    { id: 'TG', count: 12, start: 12, y: 340 },
    { id: 'TF', count: 12, start: 12, y: 290 },
    { id: 'TE', count: 13, start: 13, y: 240 },
    { id: 'TD', count: 13, start: 13, y: 190 },
    { id: 'TC', count: 13, start: 13, y: 140 },
    { id: 'TX', count: 12, start: 6, y: 90, reverse: true }  // Now starts at 06 and counts up
  ];

  // Cable path definitions
  const pathConfig = {
    aisle: { 
      x: 50, 
      label: 'Aisle Route (Default)'
    },
    middle: { 
      x: 50 + 4 * RACK_SPACING,
      label: 'Middle Cross Tray (TH08-TC11)'
    },
    end: { 
      x: 50 + 11 * RACK_SPACING,
      label: 'End Cross Tray (TK01-TC04)'
    }
  };

  // Special racks (TD14/15)
  const specialRacks = {
    'TD14': { x: 50 + RACK_SPACING, y: 40 },
    'TD15': { x: 50, y: 40 }
  };

  // Format rack IDs with double digits
  const formatRackId = (rowId, number) => {
    const paddedNumber = String(Math.abs(number)).padStart(2, '0');
    return `${rowId}${paddedNumber}`;
  };

  // Handle rack click
  const handleRackClick = (rackId) => {
    if (!sourceRack) {
      setSourceRack(rackId);
    } else if (!targetRack) {
      setTargetRack(rackId);
      calculatePath(rackId);
    } else {
      setSourceRack(rackId);
      setTargetRack('');
      setActivePath(null);
      setCableLength(null);
    }
  };

  // Calculate rack position
  const getRackPosition = (rackId) => {
    if (specialRacks[rackId]) {
      return specialRacks[rackId];
    }
    
    const row = rows.find(r => rackId.startsWith(r.id));
    if (!row) return null;
    
    const number = parseInt(rackId.replace(row.id, ''));
    const index = row.reverse ? 
      (number - row.start) : 
      (row.start - number);
    
    return {
      x: 50 + index * RACK_SPACING,
      y: row.y
    };
  };

  // Calculate cable path with adjustable settings
  const calculatePath = (targetRackId) => {
    const start = getRackPosition(sourceRack);
    const end = getRackPosition(targetRackId || targetRack);
    if (!start || !end) return;

    let path = [];
    let length = settings.verticalRun + settings.dressingAllowance + settings.slackAllowance;
    const pathX = pathConfig[routingType].x;

    // Calculate path points
    path = [
      [start.x + RACK_WIDTH/2, start.y],
      [start.x + RACK_WIDTH/2, start.y + 30],
      [pathX, start.y + 30],
      [pathX, end.y + 30],
      [end.x + RACK_WIDTH/2, end.y + 30],
      [end.x + RACK_WIDTH/2, end.y]
    ];

    // Calculate length
    if (routingType === 'aisle') {
      length += settings.aisleEntryLength * 2;
    }
    length += Math.abs(pathX - start.x) / settings.scaleFactor;
    length += Math.abs(pathX - end.x) / settings.scaleFactor;
    length += Math.abs(end.y - start.y) / settings.scaleFactor;

    setActivePath(path);
    setCableLength(Math.round(length * 10) / 10);
  };

  // Generate options for dropdowns with secondary rooms
  const generateRackOptions = () => (
    <>
      <SelectItem value="header-td-special" disabled className="font-bold bg-gray-100">
        -- TD Special --
      </SelectItem>
      <SelectItem value="TD14">TD14</SelectItem>
      <SelectItem value="TD15">TD15</SelectItem>
      
      {/* Main room racks */}
      {rows.map(row => (
        <React.Fragment key={row.id}>
          <SelectItem value={`header-${row.id}`} disabled className="font-bold bg-gray-100">
            -- {row.id} Row --
          </SelectItem>
          {Array.from({length: row.count}, (_, i) => {
            const rackNum = row.reverse ? (row.start + i) : (row.start - i);
            const rackId = formatRackId(row.id, rackNum);
            return (
              <SelectItem key={rackId} value={rackId}>
                {rackId}
              </SelectItem>
            );
          })}
        </React.Fragment>
      ))}

      {/* MCR racks */}
      <SelectItem value="header-mcr" disabled className="font-bold bg-gray-100">
        -- MCR (Imagine) --
      </SelectItem>
      {secondaryRooms.MCR.map(row => 
        Array.from({length: row.count}, (_, i) => {
          const rackNum = row.start - i;
          const rackId = formatRackId(row.id, rackNum);
          return (
            <SelectItem key={rackId} value={rackId}>
              {rackId}
            </SelectItem>
          );
        })
      )}

      {/* Dalet racks */}
      <SelectItem value="header-dalet" disabled className="font-bold bg-gray-100">
        -- Dalet Room --
      </SelectItem>
      {secondaryRooms.DALET.map(row => 
        Array.from({length: row.count}, (_, i) => {
          const rackNum = row.start - i;
          const rackId = formatRackId(row.id, rackNum);
          return (
            <SelectItem key={rackId} value={rackId}>
              {rackId}
            </SelectItem>
          );
        })
      )}
    </>
  );

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle>Server Room Cable Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Source Rack</Label>
            <Select value={sourceRack} onValueChange={setSourceRack}>
              <SelectTrigger>
                <SelectValue placeholder="Select source rack or click rack in diagram" />
              </SelectTrigger>
              <SelectContent>
                {generateRackOptions()}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Target Rack</Label>
            <Select value={targetRack} onValueChange={(value) => {
              setTargetRack(value);
              calculatePath(value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select target rack or click rack in diagram" />
              </SelectTrigger>
              <SelectContent>
                {generateRackOptions()}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Routing Path</Label>
            <RadioGroup 
              value={routingType} 
              onValueChange={(value) => {
                setRoutingType(value);
                if (sourceRack && targetRack) {
                  calculatePath();
                }
              }} 
              className="grid grid-cols-1 gap-2"
            >
              {Object.entries(pathConfig).map(([key, config]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key}>{config.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <Button 
          onClick={() => calculatePath()} 
          className="w-full"
          disabled={!sourceRack || !targetRack}
        >
          Calculate Cable Path
        </Button>

        <svg 
          width={800} 
          height={600}
          className="border border-gray-200"
        >
          {/* Path Indicators */}
          {Object.entries(pathConfig).map(([key, config]) => (
            <g key={key} transform={`translate(${config.x}, 20)`}>
              <line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="540" 
                stroke={key === routingType ? "#2563eb" : "#94a3b8"} 
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text 
                x="5" 
                y="15" 
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
              width={RACK_WIDTH} 
              height={35} 
              fill={sourceRack === 'TD15' || targetRack === 'TD15' ? '#bfdbfe' : '#e9d5ff'} 
              stroke="#666" 
              onClick={() => handleRackClick('TD15')}
              className="cursor-pointer hover:stroke-blue-500 hover:stroke-2"
            />
            <text x={RACK_WIDTH/2} y={24} textAnchor="middle" className="text-[14px] select-none">15</text>
          </g>
          <g transform={`translate(${50 + RACK_SPACING}, 40)`}>
            <rect 
              width={RACK_WIDTH} 
              height={35} 
              fill={sourceRack === 'TD14' || targetRack === 'TD14' ? '#bfdbfe' : '#e9d5ff'} 
              stroke="#666" 
              onClick={() => handleRackClick('TD14')}
              className="cursor-pointer hover:stroke-blue-500 hover:stroke-2"
            />
            <text x={RACK_WIDTH/2} y={24} textAnchor="middle" className="text-[14px] select-none">14</text>
          </g>

          {/* Main Rack Rows */}
          {rows.map((row) => (
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
                      width={RACK_WIDTH} 
                      height={35} 
                      fill={sourceRack === rackId ? '#bfdbfe' : targetRack === rackId ? '#93c5fd' : '#f3f4f6'} 
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

          {/* Cable Path */}
          {activePath && (
            <path
              d={`M ${activePath.map(p => p.join(',')).join(' L ')}`}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeDasharray="4"
            />
          )}
        </svg>

        {/* Cable Length Result */}
        {cableLength && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium">Required Cable Length:</h3>
            <p className="text-2xl font-bold">{cableLength} feet</p>
            <p className="text-sm text-gray-600 mt-2">
              Includes standard {VERTICAL_OVERHEAD}' vertical run (8' up + 8' down + 3' for dressing + 3' slack)
              {routingType === 'aisle' && ` plus ${AISLE_ENTRY_LENGTH}' entry and exit allowance`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServerRoomCalculator;