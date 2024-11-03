import type { Settings } from './settings';
import type { Point } from './calculations';

export interface RoomVisualizationProps {
  // Core settings
  settings: Settings;
  sourceRack: string | null;
  targetRack: string | null;
  routingType: 'aisle' | 'midCross' | 'endCross';
  
  // Visualization options
  showGrid?: boolean;
  showMeasurements?: boolean;
  showEnhancedVisualization?: boolean;
  
  // Calculated path data
  pathPoints?: Point[];
  pathLength?: number;
  
  // Event handlers
  onRackClick?: (rackId: string) => void;
  onRackHover?: (rackId: string | null) => void;
  
  // Optional styling
  className?: string;
  style?: React.CSSProperties;
}

// Optional: Add helper types if needed
export interface RackHighlight {
  rackId: string;
  color: string;
  opacity?: number;
}

export interface PathStyle {
  color: string;
  width: number;
  dashArray?: string;
  opacity?: number;
}

export interface VisualizationDimensions {
  width: number;
  height: number;
  padding: number;
  rackWidth: number;
  rackHeight: number;
  spacing: number;
}
