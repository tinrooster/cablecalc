import { Settings } from '@/types/settings';

// Clean, minimal default settings
export const DEFAULT_SETTINGS: Settings = {
    sourceRack: null,
    targetRack: null,
    routeType: 'aisle',
    showEnhancedVisualization: false,
    mdf: {
      routes: {},
      defaultMDFOverhead: 0
    },
    visualization: {
      showMeasurements: false,
      showGrid: false
    },
    standard: {
      verticalRun: 10,
      dressingAllowance: 3,
      slackAllowance: 2,
      aisleEntryLength: 3
    },
    crossTray: {
      middleTrayOverhead: 0,
      endTrayOverhead: 0
    }
};

// First, define the interface
export interface PathStyleType {
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  className: string;
  glowColor: string;  // Explicitly include glowColor
}

export const pathStyles: Record<string, PathStyleType> = {
  default: {
    stroke: '#93c5fd',
    strokeWidth: 2,
    strokeDasharray: '',
    className: 'path-default',
    glowColor: '#93c5fd'
  },
  selected: {
    stroke: '#c4b5fd',
    strokeWidth: 2,
    strokeDasharray: '',
    className: 'path-selected',
    glowColor: '#c4b5fd'
  },
  highlight: {
    stroke: '#6ee7b7',
    strokeWidth: 2,
    strokeDasharray: '',
    className: 'path-highlight',
    glowColor: '#6ee7b7'
  }
};