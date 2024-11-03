import type { Settings, RouteType } from './settings';

export interface SettingsPanelProps {
  // Core settings
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
  
  // Current selection state
  sourceRack: string | null;
  targetRack: string | null;
  routingType: RouteType;
  
  // Optional visibility controls
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  
  // Optional customization
  className?: string;
  style?: React.CSSProperties;
}

// Helper types for specific settings sections
export interface StandardSettingsProps {
  settings: Settings['standard'];
  onChange: (standard: Settings['standard']) => void;
}

export interface CrossTraySettingsProps {
  settings: Settings['crossTray'];
  onChange: (crossTray: Settings['crossTray']) => void;
}

export interface VisualizationSettingsProps {
  settings: Settings['visualization'];
  onChange: (visualization: Settings['visualization']) => void;
}

// Form field metadata
export interface SettingField {
  key: string;
  label: string;
  type: 'number' | 'boolean' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{
    value: string | number;
    label: string;
  }>;
}

// Section configuration
export interface SettingsSection {
  title: string;
  description?: string;
  fields: SettingField[];
}

// Panel configuration
export interface SettingsPanelConfig {
  sections: SettingsSection[];
  defaultCollapsed?: boolean;
  showResetButton?: boolean;
  showPresets?: boolean;
}
