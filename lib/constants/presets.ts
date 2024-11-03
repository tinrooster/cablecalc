import type { Settings } from '@/types/settings';

// Define the preset structure type
interface CablePreset {
  name: string;
  settings: {
    standard: {
      verticalRun: number;
      dressingAllowance: number;
      slackAllowance: number;
      aisleEntryLength: number;
    };
    crossTray: {
      middleTrayOverhead: number;
      endTrayOverhead: number;
    };
    visualization: {
      showMeasurements: boolean;
      showGrid: boolean;
    };
  };
}

// Define the presets
export const CABLE_PRESETS = {
  standard: {
    name: "Standard",
    settings: {
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
    }
  },
  custom: {
    name: "Custom",
    settings: {
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
    }
  }
} as const;

// Type guard to check if a preset key exists
export const isValidPresetKey = (key: string): key is keyof typeof CABLE_PRESETS => {
  return Object.keys(CABLE_PRESETS).includes(key);
};

// Helper to get a preset's settings
export const getPresetSettings = (key: keyof typeof CABLE_PRESETS) => {
  return CABLE_PRESETS[key].settings;
}; 