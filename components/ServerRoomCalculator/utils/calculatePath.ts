import { Settings } from '../types/settings';
import { Point } from '../types/calculations';
import {
  calculatePathOptions,
  calculatePathResult,
  PathSegmentDetails,
  PathMeasurements
} from '../types/calculatePath';

// Export the Path type
export type { calculatePathResult as Path };

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
  routingType = 'standard'
}: calculatePathOptions): calculatePathResult {
  const points: Point[] = [];
  const segments: PathSegmentDetails[] = [];
  let totalLength = 0;

  // Add source point
  points.push(source);

  // Calculate vertical run point
  const verticalPoint: Point = {
    x: source.x,
    y: source.y + settings.standard.verticalRun
  };
  points.push(verticalPoint);

  // Add intermediate points based on routing type
  switch (routingType) {
    case 'overhead':
      const overheadPoint: Point = {
        x: (source.x + target.x) / 2,
        y: verticalPoint.y + settings.crossTray.middleTrayOverhead
      };
      points.push(overheadPoint);
      break;

    case 'underfloor':
      // Add underfloor specific routing points
      const underfloorPoint: Point = {
        x: (source.x + target.x) / 2,
        y: source.y - settings.standard.verticalRun
      };
      points.push(underfloorPoint);
      break;

    default: // standard
      if (settings.crossTray.middleTrayOverhead > 0) {
        const middlePoint: Point = {
          x: (source.x + target.x) / 2,
          y: verticalPoint.y + settings.crossTray.middleTrayOverhead
        };
        points.push(middlePoint);
      }
  }

  // Add target point
  points.push(target);

  // Calculate segments and total length
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    const length = calculateSegmentLength(start, end);
    const type = determineSegmentType(start, end);

    const segment: PathSegmentDetails = {
      start,
      end,
      length,
      type,
      elevation: end.y - start.y
    };

    segments.push(segment);
    totalLength += length;
  }

  // Calculate allowances
  const allowances = {
    dressing: settings.standard.dressingAllowance,
    slack: settings.standard.slackAllowance,
    aisleEntry: settings.standard.aisleEntryLength
  };

  // Add allowances to total length
  totalLength += allowances.dressing + allowances.slack + allowances.aisleEntry;

  const measurements: PathMeasurements = {
    totalLength,
    verticalRun: settings.standard.verticalRun,
    horizontalRun: Math.abs(target.x - source.x),
    allowances
  };

  return {
    points,
    segments,
    length: totalLength,
    totalLength,
    routingType,
    allowances,
    measurements
  };
}

// Helper functions for path calculations
export const getPathPoints = (path: calculatePathResult): Point[] => path.points;
export const getPathLength = (path: calculatePathResult): number => path.totalLength;
export const getPathSegments = (path: calculatePathResult): PathSegmentDetails[] => path.segments;
export const getPathMeasurements = (path: calculatePathResult): PathMeasurements => path.measurements;

// Validation helper
export function isValidPath(path: any): path is calculatePathResult {
  return (
    path &&
    Array.isArray(path.points) &&
    Array.isArray(path.segments) &&
    typeof path.totalLength === 'number' &&
    typeof path.routingType === 'string' &&
    path.allowances &&
    path.measurements
  );
}
 