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
export const isPoint = (point: any): point is Point => {
  return (
    typeof point === 'object' &&
    'x' in point &&
    'y' in point &&
    typeof point.x === 'number' &&
    typeof point.y === 'number'
  );
};

export const isPath = (path: any): path is Path => {
  return (
    typeof path === 'object' &&
    'points' in path &&
    'length' in path &&
    'segments' in path &&
    'routingType' in path &&
    Array.isArray(path.points) &&
    path.points.every(isPoint) &&
    typeof path.length === 'number' &&
    Array.isArray(path.segments)
  );
}; 