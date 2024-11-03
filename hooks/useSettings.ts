import { useState, useCallback } from 'react';
import type { Settings } from '@/types/settings';

interface UseSettingsReturn {
  settings: Settings;
  showSettings: boolean;
  handleSettingsChange: (newSettings: Partial<Settings>) => void;
  toggleSettings: () => void;
}

export const useSettings = (defaultSettings: Settings): UseSettingsReturn => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleSettingsChange = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

  return {
    settings,
    showSettings,
    handleSettingsChange,
    toggleSettings
  };
};

// For handling path calculations between racks
interface UsePathCalculationReturn {
  calculatePath: (source: string, target: string) => Path;
  pathLength: number | null;
  isCalculating: boolean;
  error: Error | null;
}

// For managing visualization state
interface UseVisualizationReturn {
  showGrid: boolean;
  showMeasurements: boolean;
  showEnhanced: boolean;
  toggleGrid: () => void;
  toggleMeasurements: () => void;
  toggleEnhanced: () => void;
}

// For rack validation logic
interface UseRackValidationReturn {
  isValidRack: (rackId: string) => boolean;
  getValidationError: (rackId: string) => string | null;
  validatePath: (source: string, target: string) => boolean;
} 