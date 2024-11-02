// Auto-generated type file for ../utils/calculatePath
// Generated from components\ServerRoomCalculator\hooks\useRackSelection.ts

import { Settings } from './settings';
import { Point, Path } from './calculations';

export interface calculatePathOptions {
  source: Point;
  target: Point;
  settings: Settings;
  routingType?: 'standard' | 'overhead' | 'underfloor';
}

export interface calculatePathResult extends Path {
  totalLength: number;
  segments: {
    start: Point;
    end: Point;
    length: number;
    type: 'vertical' | 'horizontal' | 'diagonal';
  }[];
  allowances: {
    dressing: number;
    slack: number;
    aisleEntry: number;
  };
}

export type calculatePathFunction = (options: calculatePathOptions) => calculatePathResult;

// Additional utility types
export interface PathSegmentDetails {
  start: Point;
  end: Point;
  length: number;
  type: 'vertical' | 'horizontal' | 'diagonal';
  elevation?: number;
}

export interface PathMeasurements {
  totalLength: number;
  verticalRun: number;
  horizontalRun: number;
  allowances: {
    dressing: number;
    slack: number;
    aisleEntry: number;
  };
}
