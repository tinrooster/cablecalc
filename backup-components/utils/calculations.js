export const calculatePath = (sourceRack, targetRack, settings) => {
  // Validate rack selection first
  const validationErrors = validateRackSelection(sourceRack, targetRack);
  if (validationErrors.length > 0) {
    console.error('Validation errors:', validationErrors);
    return null;
  }

  const sourcePos = getRackPosition(sourceRack);
  const targetPos = getRackPosition(targetRack);

  // Handle Clamper room routing
  if (sourceRack?.startsWith('CL') || targetRack?.startsWith('CL')) {
    const clamperRack = sourceRack?.startsWith('CL') ? sourceRack : targetRack;
    const otherRack = sourceRack?.startsWith('CL') ? targetRack : sourceRack;

    if (settings.clamperViaDoor.enabled) {
      return calculateClamperDoorwayPath(clamperRack, otherRack, settings);
    } else {
      return calculateClamperTK04Path(clamperRack, otherRack, settings);
    }
  }

  // Check for adjacent racks in same row
  const sameRow = sourceRack.slice(0, 2) === targetRack.slice(0, 2);
  const adjacent = sameRow && Math.abs(
    parseInt(sourceRack.slice(2)) - parseInt(targetRack.slice(2))
  ) === 1;

  if (adjacent) {
    // Direct path for adjacent racks
    const length = settings.rackSpacing +
                  settings.dressingAllowance +
                  settings.slackAllowance;

    return {
      path: [
        [sourcePos.x + RACK_WIDTH/2, sourcePos.y],
        [targetPos.x + RACK_WIDTH/2, targetPos.y]
      ],
      length,
      description: `Direct connection between adjacent racks (${length}′)`
    };
  }

  // Calculate standard path based on routing type
  switch (routingType) {
    case 'end':
      return calculateEndTrayPath(sourcePos, targetPos, settings);
    case 'middle':
      return calculateMiddleTrayPath(sourcePos, targetPos, settings);
    case 'aisle':
      return calculateAislePath(sourcePos, targetPos, settings);
    default:
      return null;
  }
};

export const calculateClamperDoorwayPath = (clamperRack, otherRack, settings) => {
  const clamperPos = getRackPosition(clamperRack);
  const otherPos = getRackPosition(otherRack);
  const doorwayPoint = { x: 300, y: 200 }; // Adjust coordinates based on actual layout

  return {
    path: [
      [clamperPos.x + RACK_WIDTH/2, clamperPos.y],
      [doorwayPoint.x, doorwayPoint.y],
      [otherPos.x + RACK_WIDTH/2, otherPos.y]
    ],
    length: settings.clamperViaDoor.distance +
            settings.dressingAllowance +
            settings.slackAllowance,
    description: 'Routed through Clamper room doorway'
  };
};

export const calculateClamperTK04Path = (clamperRack, otherRack, settings) => {
  const clamperPos = getRackPosition(clamperRack);
  const otherPos = getRackPosition(otherRack);
  const tk04Pos = getTK04Position();

  return {
    path: [
      [clamperPos.x + RACK_WIDTH/2, clamperPos.y],
      [tk04Pos.x + RACK_WIDTH/2, tk04Pos.y],
      [otherPos.x + RACK_WIDTH/2, otherPos.y]
    ],
    length: settings.clamperViaTK04.distance +
            settings.dressingAllowance +
            settings.slackAllowance,
    description: 'Routed through TK04'
  };
};

// Helper functions for different routing types
const calculateAislePath = (sourcePos, targetPos, settings) => {
  const verticalOffset = settings.verticalRun / 2; // Half up, half down
  const path = [
    [sourcePos.x + RACK_WIDTH/2, sourcePos.y],                    // Start at source
    [sourcePos.x + RACK_WIDTH/2, sourcePos.y - verticalOffset],   // Up
    [targetPos.x + RACK_WIDTH/2, targetPos.y - verticalOffset],   // Across
    [targetPos.x + RACK_WIDTH/2, targetPos.y]                     // Down
  ];

  // Calculate horizontal distance
  const horizontalDistance = Math.abs(targetPos.x - sourcePos.x) / settings.scaleFactor;

  const length = settings.verticalRun +                  // Up and down
                horizontalDistance +                     // Horizontal run
                settings.dressingAllowance +             // Dressing allowance
                settings.slackAllowance +                // Service loop
                (2 * settings.aisleEntryLength);         // Entry/exit allowance

  return {
    path,
    length,
    description: `Aisle route with ${settings.verticalRun}' vertical run`
  };
};

const calculateMiddleTrayPath = (sourcePos, targetPos, settings) => {
  const middleTrayY = 390 - settings.middleTrayOverhead; // TH row Y - overhead
  const crossPoint1 = { x: sourcePos.x + RACK_WIDTH/2, y: middleTrayY };
  const crossPoint2 = { x: targetPos.x + RACK_WIDTH/2, y: middleTrayY };

  const path = [
    [sourcePos.x + RACK_WIDTH/2, sourcePos.y],         // Start at source
    [crossPoint1.x, crossPoint1.y],                    // Up to middle tray
    [crossPoint2.x, crossPoint2.y],                    // Across middle tray
    [targetPos.x + RACK_WIDTH/2, targetPos.y]          // Down to target
  ];

  // Calculate distances
  const sourceVertical = Math.abs(sourcePos.y - middleTrayY) / settings.scaleFactor;
  const targetVertical = Math.abs(targetPos.y - middleTrayY) / settings.scaleFactor;
  const horizontal = Math.abs(targetPos.x - sourcePos.x) / settings.scaleFactor;

  const length = sourceVertical +                     // Up to tray
                horizontal +                          // Along tray
                targetVertical +                      // Down from tray
                settings.dressingAllowance +          // Dressing allowance
                settings.slackAllowance;              // Service loop

  return {
    path,
    length,
    description: `Middle cross tray route (TH08-TC11) at ${settings.middleTrayOverhead}' overhead`
  };
};

const calculateEndTrayPath = (sourcePos, targetPos, settings) => {
  const endTrayY = 490 - settings.endTrayOverhead; // TK row Y - overhead
  const crossPoint1 = { x: sourcePos.x + RACK_WIDTH/2, y: endTrayY };
  const crossPoint2 = { x: targetPos.x + RACK_WIDTH/2, y: endTrayY };

  const path = [
    [sourcePos.x + RACK_WIDTH/2, sourcePos.y],         // Start at source
    [crossPoint1.x, crossPoint1.y],                    // Up to end tray
    [crossPoint2.x, crossPoint2.y],                    // Across end tray
    [targetPos.x + RACK_WIDTH/2, targetPos.y]          // Down to target
  ];

  // Calculate distances
  const sourceVertical = Math.abs(sourcePos.y - endTrayY) / settings.scaleFactor;
  const targetVertical = Math.abs(targetPos.y - endTrayY) / settings.scaleFactor;
  const horizontal = Math.abs(targetPos.x - sourcePos.x) / settings.scaleFactor;

  const length = sourceVertical +                     // Up to tray
                horizontal +                          // Along tray
                targetVertical +                      // Down from tray
                settings.dressingAllowance +          // Dressing allowance
                settings.slackAllowance;              // Service loop

  return {
    path,
    length,
    description: `End cross tray route (TK01-TC04) at ${settings.endTrayOverhead}' overhead`
  };
};

// Helper for inter-room calculations
const calculateInterRoomPath = (sourcePos, targetPos, settings, roomDistance) => {
  const verticalOffset = settings.verticalRun / 2;
  const path = [
    [sourcePos.x + RACK_WIDTH/2, sourcePos.y],
    [sourcePos.x + RACK_WIDTH/2, sourcePos.y - verticalOffset],
    [targetPos.x + RACK_WIDTH/2, targetPos.y - verticalOffset],
    [targetPos.x + RACK_WIDTH/2, targetPos.y]
  ];

  const length = settings.verticalRun +              // Up and down
                roomDistance +                       // Fixed room-to-room distance
                settings.dressingAllowance +         // Dressing allowance
                settings.slackAllowance;             // Service loop

  return {
    path,
    length,
    description: `Inter-room route with ${roomDistance}' fixed distance`
  };
}; 