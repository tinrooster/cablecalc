import type { Settings } from '../types/settings';

export const DEFAULT_SETTINGS: Settings = {
  standard: {
    verticalRun: 2000,
    dressingAllowance: 500,
    slackAllowance: 1000,
    aisleEntryLength: 300
  },
  crossTray: {
    middleTrayOverhead: 500,
    endTrayOverhead: 300
  },
  visualization: {
    showGrid: true,
    showMeasurements: true
  }
}; 