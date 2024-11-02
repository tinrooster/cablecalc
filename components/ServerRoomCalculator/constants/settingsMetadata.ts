import type { SettingsMetadataType } from '../types/settings';

export const SETTINGS_METADATA: SettingsMetadataType = {
  standard: {
    verticalRun: {
      label: 'Vertical Run',
      description: 'The vertical distance cables need to travel',
      unit: 'feet',
      min: 0,
      step: 1
    },
    dressingAllowance: {
      label: 'Dressing Allowance',
      description: 'Extra cable length for dressing',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    slackAllowance: {
      label: 'Slack Allowance',
      description: 'Extra cable length for slack',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    aisleEntryLength: {
      label: 'Aisle Entry Length',
      description: 'Length of cable needed for aisle entry',
      unit: 'feet',
      min: 0,
      step: 1
    }
  },
  crossTray: {
    middleTrayOverhead: {
      label: 'Middle Tray Height',
      description: 'Height of middle tray',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    endTrayOverhead: {
      label: 'End Tray Height',
      description: 'Height of end tray',
      unit: 'feet',
      min: 0,
      step: 0.5
    }
  },
  visualization: {
    showMeasurements: {
      label: 'Show Measurements',
      description: 'Display measurement labels'
    },
    showGrid: {
      label: 'Show Grid',
      description: 'Display grid lines'
    }
  }
}; 