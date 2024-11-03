import { useState, useCallback } from 'react';
import { calculatePath } from '@/lib/utils/calculations';
import type { Settings, RouteType } from '@/types/settings';
import type { Path } from '@/types/calculations';

interface UseRackSelectionReturn {
  sourceRack: string;
  targetRack: string;
  activePath: Path | null;
  cableLength: number | null;
  routingType: RouteType;
  handleRackClick: (rackId: string) => void;
  handleRoutingTypeChange: (type: RouteType) => void;
}

export const useRackSelection = (settings: Settings): UseRackSelectionReturn => {
  const [sourceRack, setSourceRack] = useState<string>('');
  const [targetRack, setTargetRack] = useState<string>('');
  const [routingType, setRoutingType] = useState<RouteType>('aisle');
  const [activePath, setActivePath] = useState<Path | null>(null);
  const [cableLength, setCableLength] = useState<number | null>(null);

  const calculateAndSetPath = useCallback((
    source: string, 
    target: string, 
    type: RouteType
  ) => {
    const path = calculatePath(target, source, type, settings);
    setActivePath(path);
    setCableLength(path?.length ?? null);
  }, [settings]);

  const handleRackClick = useCallback((rackId: string) => {
    if (!sourceRack) {
      setSourceRack(rackId);
    } else if (!targetRack) {
      setTargetRack(rackId);
      calculateAndSetPath(sourceRack, rackId, routingType);
    } else {
      setSourceRack(rackId);
      setTargetRack('');
      setActivePath(null);
      setCableLength(null);
    }
  }, [sourceRack, targetRack, routingType, calculateAndSetPath]);

  const handleRoutingTypeChange = useCallback((type: RouteType) => {
    setRoutingType(type);
    if (sourceRack && targetRack) {
      calculateAndSetPath(sourceRack, targetRack, type);
    }
  }, [sourceRack, targetRack, calculateAndSetPath]);

  return {
    sourceRack,
    targetRack,
    activePath,
    cableLength,
    routingType,
    handleRackClick,
    handleRoutingTypeChange
  };
}; 