export type PathType = 'aisle' | 'middle' | 'end';

export interface Settings {
  inRackAllowance: number;
  rackSpacing: number;
  rowCrossing: number;
  aisleAllowance: number;
  middleTrayOverhead: number;
  endTrayOverhead: number;
  verticalRun: number;
  dressingAllowance: number;
  slackAllowance: number;
  historyEnabled: boolean;
  maxHistory: number;
  sortByFrequency: boolean;
  scaleFactor: number;
  aisleEntryLength: number;
}

export interface RackPosition {
  x: number;
  y: number;
} 