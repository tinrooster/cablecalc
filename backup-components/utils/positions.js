import { ROOMS } from '../constants/rooms';

export const getRackPosition = (rackId) => {
  // Handle special racks
  const specialRack = ROOMS.main.specialRacks.find(r => r.id === rackId);
  if (specialRack) {
    return { x: specialRack.x, y: specialRack.y };
  }

  // Handle Clamper room racks
  if (rackId.startsWith('CL')) {
    const clamperRack = ROOMS.clamper.racks.find(r => r.id === rackId);
    return clamperRack ? { x: clamperRack.x, y: clamperRack.y } : null;
  }

  // Handle standard racks
  const row = rackId.slice(0, 2);
  const number = parseInt(rackId.slice(2));
  const rowConfig = ROOMS.main.rows.find(r => r.id === row);

  if (!rowConfig) return null;

  let rackIndex;
  if (rowConfig.reverse) {
    rackIndex = rowConfig.start - number;
  } else {
    rackIndex = number - rowConfig.start;
  }

  return {
    x: 50 + (rackIndex * RACK_SPACING),
    y: rowConfig.y
  };
};

export const getTK04Position = (RACK_SPACING = 50) => ({
  x: 50 + (3 * RACK_SPACING), // Position for TK04
  y: 490 // TK row Y position
});

export const getClamperPosition = () => ({
  x: 50, // CL01 X position
  y: 50  // CL01 Y position
});

// Helper functions for cross tray positions
export const getMiddleTrayPosition = (settings) => ({
  y: 390 - settings.middleTrayOverhead, // TH row Y - overhead
  startX: 50 + (7 * RACK_SPACING),      // TH08
  endX: 50 + (10 * RACK_SPACING)        // TC11
});

export const getEndTrayPosition = (settings) => ({
  y: 490 - settings.endTrayOverhead,    // TK row Y - overhead
  startX: 50,                           // TK01
  endX: 50 + (3 * RACK_SPACING)         // TC04
});

// Helper for checking if a point is within rack bounds
export const isPointInRack = (point, rackPos) => {
  return point.x >= rackPos.x && 
         point.x <= rackPos.x + RACK_WIDTH &&
         point.y >= rackPos.y && 
         point.y <= rackPos.y + RACK_HEIGHT;
};

// Helper for finding nearest valid rack position
export const snapToNearestRack = (point) => {
  let nearestRack = null;
  let minDistance = Infinity;

  ROOMS.main.rows.forEach(row => {
    for (let i = 0; i < row.count; i++) {
      const rackPos = {
        x: 50 + (i * RACK_SPACING),
        y: row.y
      };

      const distance = Math.sqrt(
        Math.pow(point.x - (rackPos.x + RACK_WIDTH/2), 2) +
        Math.pow(point.y - (rackPos.y + RACK_HEIGHT/2), 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestRack = {
          id: `${row.id}${(row.reverse ? row.start - i : row.start + i).toString().padStart(2, '0')}`,
          position: rackPos
        };
      }
    }
  });

  return nearestRack;
}; 