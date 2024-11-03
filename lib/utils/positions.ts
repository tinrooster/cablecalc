import { ROOMS } from '@/lib/constants/rooms';
import type { Point } from '@/types/calculations';
import type { Settings } from '@/types/settings';

// Constants
const RACK_WIDTH = 45;
const RACK_HEIGHT = 30;
const RACK_SPACING = 50;

interface RackPosition {
  x: number;
  y: number;
}

interface NearestRack {
  id: string;
  position: RackPosition;
}

export const getRackPosition = (rackId: string): RackPosition | null => {
  // Handle special racks
  const specialRack = ROOMS.main.specialRacks.find(r => r.id === rackId);
  if (specialRack) {
    return { x: specialRack.x, y: specialRack.y };
  }

  // Handle Clamper room racks
  if (rackId.startsWith('CL')) {
    const clamperRack = ROOMS.clamper?.racks.find(r => r.id === rackId);
    return clamperRack ? { x: clamperRack.x, y: clamperRack.y } : null;
  }

  // Handle standard racks
  const row = rackId.slice(0, 2);
  const number = parseInt(rackId.slice(2));
  const rowConfig = ROOMS.main.rows.find(r => r.id === row);

  if (!rowConfig) return null;

  let rackIndex: number;
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

export const getTK04Position = (spacing: number = RACK_SPACING): RackPosition => ({
  x: 50 + (3 * spacing),
  y: 490
});

export const getClamperPosition = (): RackPosition => ({
  x: 50,
  y: 50
});

interface TrayPosition {
  y: number;
  startX: number;
  endX: number;
}

export const getMiddleTrayPosition = (settings: Settings): TrayPosition => ({
  y: 390 - settings.crossTray.middleTrayOverhead,
  startX: 50 + (7 * RACK_SPACING),
  endX: 50 + (10 * RACK_SPACING)
});

export const getEndTrayPosition = (settings: Settings): TrayPosition => ({
  y: 490 - settings.crossTray.endTrayOverhead,
  startX: 50,
  endX: 50 + (3 * RACK_SPACING)
});

export const isPointInRack = (point: Point, rackPos: RackPosition): boolean => {
  return point.x >= rackPos.x && 
         point.x <= rackPos.x + RACK_WIDTH &&
         point.y >= rackPos.y && 
         point.y <= rackPos.y + RACK_HEIGHT;
};

export const snapToNearestRack = (point: Point): NearestRack | null => {
  let nearestRack: NearestRack | null = null;
  let minDistance = Infinity;

  ROOMS.main.rows.forEach(row => {
    for (let i = 0; i < row.count; i++) {
      const rackPos: RackPosition = {
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