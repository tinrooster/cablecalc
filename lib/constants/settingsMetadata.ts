import type { SettingsMetadataType } from '../types/settings';

export const SETTINGS_METADATA: SettingsMetadataType = {
  standard: {
    verticalRun: {
      label: 'Vertical Run',
      description: 'Height from underfloor to rack entry point',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    dressingAllowance: {
      label: 'Dressing Allowance',
      description: 'Additional length for cable dressing',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    slackAllowance: {
      label: 'Slack Allowance',
      description: 'Additional slack in cable length',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    aisleEntryLength: {
      label: 'Aisle Entry Length',
      description: 'Length of cable needed for aisle entry',
      unit: 'feet',
      min: 0,
      step: 0.5
    }
  },
  crossTray: {
    middleTrayOverhead: {
      label: 'Middle Tray Overhead',
      description: 'Additional height for middle cross tray',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    endTrayOverhead: {
      label: 'End Tray Overhead',
      description: 'Additional height for end cross tray',
      unit: 'feet',
      min: 0,
      step: 0.5
    }
  },
  mdf: {
    defaultMDFOverhead: {
      label: 'Default MDF Overhead',
      description: 'Default overhead length for MDF routes',
      unit: 'feet',
      min: 0,
      step: 0.5
    },
    routes: {
      sourceRack: {
        label: 'Source Rack',
        description: 'Starting rack for the route'
      },
      targetRack: {
        label: 'Target Rack',
        description: 'Ending rack for the route'
      },
      routeType: {
        label: 'Route Type',
        description: 'Type of routing path'
      },
      distance: {
        label: 'Distance',
        description: 'Length of the route',
        unit: 'feet',
        min: 0,
        step: 0.5
      },
      isDirect: {
        label: 'Direct Route',
        description: 'Whether the route is direct'
      },
      description: {
        label: 'Description',
        description: 'Route description'
      }
    }
  },
  visualization: {
    showMeasurements: {
      label: 'Show Measurements',
      description: 'Display measurement overlays'
    },
    showGrid: {
      label: 'Show Grid',
      description: 'Display grid overlay'
    }
  }
}; 