interface Position {
  row: string;
  number: string;
}

interface CablePathMetrics {
  horizontalDistance: number;
  verticalDistance: number;
  crossTrayHeight: number;
  totalLength: number;
  routeDescription: string;
}

export function calculateCablePath(
  source: string,
  target: string,
  routeType: 'default' | 'alternate',
  settings: {
    verticalRun: number;
    dressingAllowance: number;
    slackAllowance: number;
    aisleEntryExit: number;
    middleCrossTrayHeight: number;
    endCrossTrayHeight: number;
  }
): CablePathMetrics {
  // Parse positions
  const parsePosition = (pos: string): Position => {
    const [row, number] = pos.split('-');
    return { row, number };
  };

  const sourcePos = parsePosition(source);
  const targetPos = parsePosition(target);

  // Constants for rack spacing (in feet)
  const RACK_WIDTH = 2; // 2 feet between rack centers
  const HORIZONTAL_MULTIPLIER = 2; // Additional space for horizontal runs

  // Calculate horizontal distance
  const horizontalDistance = Math.abs(
    (parseInt(sourcePos.number) - parseInt(targetPos.number)) * RACK_WIDTH
  );

  // Determine cross tray zone and height
  const isMiddleCrossTray = (pos: Position) => {
    const num = parseInt(pos.number);
    return pos.row === 'TH' && num >= 8 || pos.row === 'TC' && num <= 11;
  };

  const isEndCrossTray = (pos: Position) => {
    const num = parseInt(pos.number);
    return pos.row === 'TK' && num <= 1 || pos.row === 'TC' && num <= 4;
  };

  // Calculate vertical run based on route type
  let verticalDistance = settings.verticalRun;
  let crossTrayHeight = 0;
  let routeDescription = '';

  if (routeType === 'default') {
    // Default route uses aisle path
    verticalDistance = settings.verticalRun * 2; // Up and down
    routeDescription = 'Aisle Route (Default)';
  } else {
    // Alternate route uses cross trays
    if (isMiddleCrossTray(sourcePos) || isMiddleCrossTray(targetPos)) {
      crossTrayHeight = settings.middleCrossTrayHeight;
      routeDescription = 'Middle Cross Tray (TH08-TC11)';
    } else if (isEndCrossTray(sourcePos) || isEndCrossTray(targetPos)) {
      crossTrayHeight = settings.endCrossTrayHeight;
      routeDescription = 'End Cross Tray (TK01-TC04)';
    }
    verticalDistance = crossTrayHeight * 2; // Up and down
  }

  // Calculate total length
  const totalLength = horizontalDistance + verticalDistance;

  return {
    horizontalDistance,
    verticalDistance,
    crossTrayHeight,
    totalLength,
    routeDescription,
  };
} 