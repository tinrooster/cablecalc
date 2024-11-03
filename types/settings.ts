export interface VisualizationSettings {
  showMeasurements: boolean;
  showGrid: boolean;
}

export type RouteType = 'aisle' | 'midCross' | 'endCross';

export interface MDFRoute {
  sourceRack: string;
  targetRack: string;
  routeType: RouteType;
  distance: number;
  isDirect: boolean;
  description: string;
}

export interface MDFSettingsType {
  routes: {
    [key: string]: MDFRoute;
  };
  defaultMDFOverhead: number;
}

export interface StandardSettings {
  verticalRun: number;
  dressingAllowance: number;
  slackAllowance: number;
  aisleEntryLength: number;
}

export interface CrossTraySettings {
  middleTrayOverhead: number;
  endTrayOverhead: number;
}

export interface Settings {
  sourceRack: string | null;
  targetRack: string | null;
  routeType: RouteType;
  showEnhancedVisualization: boolean;
  mdf: MDFSettingsType;
  visualization: VisualizationSettings;
  standard: StandardSettings;
  crossTray: CrossTraySettings;
}

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

export interface SettingsMetadataField {
  label: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface SettingsMetadataType {
  standard: {
    verticalRun: SettingsMetadataField;
    dressingAllowance: SettingsMetadataField;
    slackAllowance: SettingsMetadataField;
    aisleEntryLength: SettingsMetadataField;
  };
  crossTray: {
    middleTrayOverhead: SettingsMetadataField;
    endTrayOverhead: SettingsMetadataField;
  };
  mdf: {
    defaultMDFOverhead: SettingsMetadataField;
    routes: {
      sourceRack: SettingsMetadataField;
      targetRack: SettingsMetadataField;
      routeType: SettingsMetadataField;
      distance: SettingsMetadataField;
      isDirect: SettingsMetadataField;
      description: SettingsMetadataField;
    };
  };
  visualization: {
    showMeasurements: SettingsMetadataField;
    showGrid: SettingsMetadataField;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SettingValidation {
  isValid: boolean;
  errors: ValidationError[];
} 