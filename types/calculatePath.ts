// Auto-generated type file for ../utils/calculatePath
// Generated from components\ServerRoomCalculator\hooks\useRackSelection.ts

import { Settings, RouteType } from '@/types/settings';
import { Point, Path } from '@/types/calculations';

export type PathRoutingType = RouteType;

export interface CalculatePathOptions {
  source: Point;
  target: Point;
  settings: Settings;
  routingType: PathRoutingType;
}

export interface CalculatePathResult {
  path: Point[];
  measurements: PathMeasurements;
  segments: PathSegmentDetails[];
}

export interface PathSegmentDetails {
  start: Point;
  end: Point;
  type: string;
  length: number;
}

export interface PathMeasurements {
  totalLength: number;
  segments: number[];
  verticalRun: number;
}

export type CalculatePathFunction = (options: CalculatePathOptions) => CalculatePathResult;
