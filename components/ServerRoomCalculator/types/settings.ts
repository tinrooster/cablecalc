// Basic setting types
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

export interface VisualizationSettings {
  showGrid: boolean;
  showMeasurements: boolean;
}

export interface Settings {
  standard: StandardSettings;
  crossTray: CrossTraySettings;
  visualization: VisualizationSettings;
}

// Numeric settings types
export type NumericCategory = 'standard' | 'crossTray';

export interface NumericSetting {
  category: NumericCategory;
  key: string;
  label: string;
}

// Component props types
export interface SettingsPanelProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

export interface SettingMetadata {
  label: string;
  description?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface SettingsMetadataType {
  standard: {
    verticalRun: SettingMetadata;
    dressingAllowance: SettingMetadata;
    slackAllowance: SettingMetadata;
    aisleEntryLength: SettingMetadata;
  };
  crossTray: {
    middleTrayOverhead: SettingMetadata;
    endTrayOverhead: SettingMetadata;
  };
  visualization: {
    showMeasurements: SettingMetadata;
    showGrid: SettingMetadata;
  };
}

export type RoutingType = 'standard' | 'overhead' | 'underfloor';

export interface PathCalculationOptions {
  routingType: RoutingType;
  settings: Settings;
} 