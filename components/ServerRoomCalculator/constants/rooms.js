export const ROOMS = {
  main: {
    id: 'main',
    name: 'Main Server Room',
    rows: [
      { id: 'TK', count: 10, start: 10, y: 490 },
      // ... rest of the rooms configuration
    ],
    specialRacks: [
      { id: 'TD15', x: 50, y: 40 },
      { id: 'TD14', x: 50 + RACK_SPACING, y: 40 }
    ]
  },
  // ... other rooms
}; 