import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

// Constants
const RACK_SPACING = 24 // inches between racks
const VERTICAL_CLEARANCE = 12 // inches of vertical clearance
const SERVICE_LOOP = 36 // inches of service loop

// Path configuration
const pathConfig = {
  direct: {
    label: "Direct Path",
    x: 200,
    multiplier: 1.1
  },
  overhead: {
    label: "Overhead Path",
    x: 400,
    multiplier: 1.3
  },
  underfloor: {
    label: "Under Floor Path",
    x: 600,
    multiplier: 1.2
  }
}

const ServerRoomCalculator = () => {
  const [sourceRack, setSourceRack] = useState('')
  const [targetRack, setTargetRack] = useState('')
  const [routingType, setRoutingType] = useState('direct')
  const [calculatedLength, setCalculatedLength] = useState(null)

  const calculatePath = () => {
    if (!sourceRack || !targetRack) return

    const source = parseInt(sourceRack)
    const target = parseInt(targetRack)
    const rackDistance = Math.abs(target - source) * RACK_SPACING

    let totalLength = rackDistance
    
    // Add vertical distance for overhead/underfloor
    if (routingType !== 'direct') {
      totalLength += (VERTICAL_CLEARANCE * 2)
    }

    // Add path multiplier
    totalLength *= pathConfig[routingType].multiplier

    // Add service loop
    totalLength += SERVICE_LOOP

    setCalculatedLength(Math.ceil(totalLength))
  }

  const rackOptions = Array.from({ length: 42 }, (_, i) => ({
    value: String(i + 1),
    label: `Rack ${i + 1}`
  }))

  return (
    <Card className="p-6 max-w-md mx-auto mt-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Source Rack</Label>
          <Select value={sourceRack} onValueChange={setSourceRack}>
            <SelectTrigger>
              <SelectValue placeholder="Select source rack" />
            </SelectTrigger>
            <SelectContent>
              {rackOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Target Rack</Label>
          <Select value={targetRack} onValueChange={setTargetRack}>
            <SelectTrigger>
              <SelectValue placeholder="Select target rack" />
            </SelectTrigger>
            <SelectContent>
              {rackOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Routing Path</Label>
          <RadioGroup 
            value={routingType} 
            onValueChange={setRoutingType}
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
        onClick={calculatePath} 
        className="w-full mt-4"
        disabled={!sourceRack || !targetRack}
      >
        Calculate Cable Path
      </Button>

      {calculatedLength && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-center">
            Required Cable Length: {calculatedLength} inches
            ({(calculatedLength / 12).toFixed(1)} feet)
          </p>
        </div>
      )}
    </Card>
  )
}

export default ServerRoomCalculator