export interface Point {
  x: number;
  y: number;
}

export interface PathSegment {
  start: Point;
  end: Point;
  length: number;
}

export interface Path {
  points: Point[];
  length: number;
  segments: PathSegment[];
  routingType: 'standard' | 'overhead' | 'underfloor';
}

export interface CalculationResult {
  path: Path;
  totalLength: number;
  segments: PathSegment[];
}

export interface RackPosition {
  id: string;
  x: number;
  y: number;
}

export interface CalculationOptions {
  includeAllowances: boolean;
  useMetric: boolean;
}

// Helper type guards
export const isPoint = (point: unknown): point is Point => {
  return (
    typeof point === 'object' &&
    point !== null &&
    'x' in point &&
    'y' in point &&
    typeof (point as Point).x === 'number' &&
    typeof (point as Point).y === 'number'
  );
};

export const isPath = (path: unknown): path is Path => {
  return (
    typeof path === 'object' &&
    path !== null &&
    'points' in path &&
    'length' in path &&
    'segments' in path &&
    'routingType' in path &&
    Array.isArray((path as Path).points) &&
    (path as Path).points.every(isPoint) &&
    typeof (path as Path).length === 'number' &&
    Array.isArray((path as Path).segments)
  );
}; 