'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Settings {
  preset: string;
  verticalRun: number;
  dressingAllowance: number;
  slackAllowance: number;
  aisleEntryExit: number;
  middleCrossTrayHeight: number;
  endCrossTrayHeight: number;
  showMeasurements: boolean;
  showGrid: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  preset: 'Standard',
  verticalRun: 22,
  dressingAllowance: 11,
  slackAllowance: 10,
  aisleEntryExit: 6,
  middleCrossTrayHeight: 12,
  endCrossTrayHeight: 12,
  showMeasurements: true,
  showGrid: true,
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (field: keyof Settings, value: string | number | boolean) => void;
  resetToStandard: () => void;
  resetAll: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const updateSettings = (field: keyof Settings, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const resetToStandard = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetToStandard, resetAll }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 