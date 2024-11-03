import { Settings, RouteType } from '@/types/settings';
import { Point } from '@/types/calculations';
import {
  CalculatePathOptions,
  CalculatePathResult,
  PathSegmentDetails,
  PathMeasurements
} from '@/types/calculatePath';

// Export the Path type
export type { CalculatePathResult as Path };

function calculateSegmentLength(start: Point, end: Point): number {
  return Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
}

function determineSegmentType(start: Point, end: Point): 'vertical' | 'horizontal' | 'diagonal' {
  if (start.x === end.x) return 'vertical';
  if (start.y === end.y) return 'horizontal';
  return 'diagonal';
}

export function calculatePath({
  source,
  target,
  settings,
  routingType = 'aisle' as RouteType
}: CalculatePathOptions): CalculatePathResult {
  switch (routingType) {
    case 'aisle':
      return calculateAislePath(source, target, settings);
    case 'midCross':
      return calculateCrossPath(source, target, settings, 'mid');
    case 'endCross':
      return calculateCrossPath(source, target, settings, 'end');
    default:
      throw new Error(`Invalid route type: ${routingType}`);
  }
}

// Helper functions for path calculations
export const getPathPoints = (path: CalculatePathResult): Point[] => path.path;
export const getPathLength = (path: CalculatePathResult): number => path.measurements.totalLength;
export const getPathSegments = (path: CalculatePathResult): PathSegmentDetails[] => path.segments;
export const getPathMeasurements = (path: CalculatePathResult): PathMeasurements => path.measurements;

// Validation helper
export function isValidPath(path: any): path is CalculatePathResult {
  return (
    path &&
    Array.isArray(path.path) &&
    Array.isArray(path.segments) &&
    typeof path.measurements.totalLength === 'number' &&
    typeof path.routingType === 'string' &&
    path.allowances &&
    path.measurements
  );
}

interface PathCalculation {
  source: string;
  target: string;
  routeType: RouteType;
}

export function calculateCableLength({ source, target, routeType }: PathCalculation): number {
  const rowDistance = getDirectRowDistance(source, target);
  const isAdjacent = areRowsAdjacent(source, target);

  if (routeType === 'aisle' && isAdjacent) {
    return 8; // Standard adjacent row loop distance
  }

  if (routeType === 'aisle') {
    return 4 + rowDistance + 4; // Entry + direct distance + exit
  }

  if (routeType === 'midCross' || routeType === 'endCross') {
    return rowDistance; // Direct distance only
  }

  return rowDistance; // Fallback to direct distance
}

function areRowsAdjacent(source: string, target: string): boolean {
  const sourceRow = source.substring(0, 2);
  const targetRow = target.substring(0, 2);
  return isAdjacentInRowMap(sourceRow, targetRow);
}

function getDirectRowDistance(source: string, target: string): number {
  const tilesBetween = calculateTilesBetween(source, target);
  return tilesBetween * 4; // Each tile is 4'
}

function isAdjacentInRowMap(sourceRow: string, targetRow: string): boolean {
  const adjacencyMap: Record<string, string[]> = {
    'TK': ['TG', 'TM'],
    'TG': ['TK', 'TE'],
    // ... add other row mappings
  };
  return adjacencyMap[sourceRow]?.includes(targetRow) || false;
}

function calculateTilesBetween(source: string, target: string): number {
  const sourceNum = parseInt(source.slice(2));
  const targetNum = parseInt(target.slice(2));
  return Math.abs(targetNum - sourceNum);
}

function calculateAislePath(source: Point, target: Point, settings: Settings): CalculatePathResult {
  return {
    path: [source, target],
    measurements: {
      totalLength: 0,
      segments: [],
      verticalRun: settings.standard.verticalRun
    },
    segments: []
  };
}

function calculateCrossPath(source: Point, target: Point, settings: Settings, type: 'mid' | 'end'): CalculatePathResult {
  return {
    path: [source, target],
    measurements: {
      totalLength: 0,
      segments: [],
      verticalRun: settings.standard.verticalRun
    },
    segments: []
  };
}

 