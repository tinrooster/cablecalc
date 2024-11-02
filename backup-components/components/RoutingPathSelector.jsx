import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const RoutingPathSelector = ({ 
  routingType, 
  setRoutingType,
  sourceRack,
  targetRack,
  settings 
}) => {
  // Determine which paths are available based on rack positions
  const getAvailablePaths = () => {
    if (!sourceRack || !targetRack) return ['end', 'middle', 'aisle'];
    
    // If either rack is in Clamper room, only show relevant options
    if (sourceRack.startsWith('CL') || targetRack.startsWith('CL')) {
      return settings.clamperViaDoor?.enabled ? ['aisle'] : ['end'];
    }

    return ['end', 'middle', 'aisle'];
  };

  const availablePaths = getAvailablePaths();

  const pathDescriptions = {
    end: {
      title: "End Cross Tray (TK01-TC04)",
      description: "Routes cables through the end cross tray near TK01-TC04"
    },
    middle: {
      title: "Middle Cross Tray (TH08-TC11)",
      description: "Routes cables through the middle cross tray near TH08-TC11"
    },
    aisle: {
      title: "Aisle Route",
      description: "Standard aisle routing with vertical runs"
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-base">Routing Path</Label>
      <RadioGroup 
        value={routingType} 
        onValueChange={setRoutingType}
        className="space-y-1"
      >
        <TooltipProvider>
          {availablePaths.map((path) => (
            <Tooltip key={path}>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                  <RadioGroupItem value={path} id={path} />
                  <Label 
                    htmlFor={path}
                    className="cursor-pointer"
                  >
                    {pathDescriptions[path].title}
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{pathDescriptions[path].description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </RadioGroup>

      {/* Optional: Show current routing info */}
      {sourceRack && targetRack && (
        <p className="text-sm text-gray-500 mt-2">
          Routing from {sourceRack} to {targetRack}
        </p>
      )}
    </div>
  );
}; 
export const RoutingPathSelector = ({ routingType, setRoutingType }) => (
  <div className="space-y-2">
    <Label>Routing Path</Label>
    <RadioGroup 
      value={routingType} 
      onValueChange={setRoutingType}
      className="space-y-1"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="end" id="end" />
        <Label htmlFor="end">End Cross Tray (TK01-TC04)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="middle" id="middle" />
        <Label htmlFor="middle">Middle Cross Tray (TH08-TC11)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="aisle" id="aisle" />
        <Label htmlFor="aisle">Aisle Route (Default)</Label>
      </div>
    </RadioGroup>
  </div>
); 