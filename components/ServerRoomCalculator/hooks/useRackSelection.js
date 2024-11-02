import { useState, useCallback } from 'react';
import { calculatePath } from '../utils/calculations';

export const useRackSelection = (settings) => {
  const [sourceRack, setSourceRack] = useState('');
  const [targetRack, setTargetRack] = useState('');
  const [routingType, setRoutingType] = useState('aisle');
  const [activePath, setActivePath] = useState(null);
  const [cableLength, setCableLength] = useState(null);

  const calculateAndSetPath = useCallback((source, target, type) => {
    const path = calculatePath(target, source, type, settings);
    setActivePath(path);
    setCableLength(path?.length);
  }, [settings]);

  const handleRackClick = useCallback((rackId) => {
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

  const handleRoutingTypeChange = useCallback((type) => {
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