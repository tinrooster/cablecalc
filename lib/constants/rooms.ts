// Constants
const RACK_SPACING = 50;
const RACK_WIDTH = 45;

interface RackRow {
  id: string;
  count: number;
  start: number;
  y: number;
  reverse?: boolean;
}

interface SpecialRack {
  id: string;
  x: number;
  y: number;
}

interface Room {
  id: string;
  name: string;
  rows: RackRow[];
  specialRacks: SpecialRack[];
}

export const ROOMS: { [key: string]: Room } = {
  main: {
    id: 'main',
    name: 'Main Server Room',
    rows: [
      { id: 'TK', count: 10, start: 10, y: 490 },
      { id: 'TJ', count: 12, start: 1, y: 390 },
      { id: 'TH', count: 12, start: 1, y: 290 },
      { id: 'TG', count: 12, start: 1, y: 190 },
      { id: 'TF', count: 12, start: 1, y: 90 },
      { id: 'TD', count: 13, start: 1, y: 40 }
    ],
    specialRacks: [
      // MDF / room exit racks
      { id: 'TD15', x: 50, y: 40 },           // External connectivity rack
      { id: 'TD14', x: 50 + RACK_SPACING, y: 40 }  // MDF rack
    ]
  }
};

// Helper functions
export const isSpecialRack = (rackId: string): boolean => {
  return ROOMS.main.specialRacks.some(rack => rack.id === rackId);
};

export const getSpecialRackPosition = (rackId: string): { x: number; y: number } | null => {
  const rack = ROOMS.main.specialRacks.find(rack => rack.id === rackId);
  return rack ? { x: rack.x, y: rack.y } : null;
}; 