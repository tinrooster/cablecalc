import React, { useState, useCallback } from 'react';
import type { Settings, RoutingType } from '../types/settings';
import { calculatePath } from '../utils/calculatePath';
import type { calculatePathResult as Path } from '../types/calculatePath';
import type { Point } from '../types/calculations';

export const useRackSelection = (settings: Settings) => {
  const [sourceRack, setSourceRack] = useState<string>('');
  const [targetRack, setTargetRack] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateAndSetPath = useCallback(async (
    source: string,
    target: string,
    routingType: RoutingType
  ) => {
    setIsCalculating(true);
    try {
      // Convert rack IDs to coordinates (example implementation)
      const sourcePoint: Point = getRackCoordinates(source);
      const targetPoint: Point = getRackCoordinates(target);

      const path = await calculatePath({
        source: sourcePoint,
        target: targetPoint,
        settings,
        routingType
      });
      
      setCurrentPath(path);
    } catch (error) {
      console.error('Error calculating path:', error);
      setCurrentPath(null);
    } finally {
      setIsCalculating(false);
    }
  }, [settings]);

  return {
    sourceRack,
    targetRack,
    currentPath,
    isCalculating,
    setSourceRack,
    setTargetRack,
    calculateAndSetPath
  };
};

// Helper function to convert rack IDs to coordinates
function getRackCoordinates(rackId: string): Point {
  // This should be implemented based on your rack layout system
  // For now, returning a dummy point
  return {
    x: 0,
    y: 0
  };
} 