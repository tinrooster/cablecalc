import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RoutingPathSelectorProps {
  routingType: 'end' | 'middle' | 'aisle';
  setRoutingType: (type: 'end' | 'middle' | 'aisle') => void;
  sourceRack: string | null;
  targetRack: string | null;
  settings: {
    clamperViaDoor?: {
      enabled: boolean;
    };
  };
}

export const RoutingPathSelector: React.FC<RoutingPathSelectorProps> = ({ 
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

    return ['end', 'middle', 'aisle'] as const;
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
  } as const;

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