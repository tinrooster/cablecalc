import type { Settings } from '../types/settings';

export const DEFAULT_SETTINGS: Settings = {
  standard: {
    verticalRun: 10,
    dressingAllowance: 3,
    slackAllowance: 2,
    aisleEntryLength: 5
  },
  crossTray: {
    middleTrayOverhead: 8,
    endTrayOverhead: 6
  },
  visualization: {
    showMeasurements: true,
    showGrid: true
  }
};

// Optional: Add validation functions
export const isValidSettings = (settings: Settings): boolean => {
  return (
    settings &&
    typeof settings === 'object' &&
    'standard' in settings &&
    'crossTray' in settings &&
    'visualization' in settings
  );
};

// Optional: Add reset function
export const resetSettings = (): Settings => {
  return { ...DEFAULT_SETTINGS };
}; 