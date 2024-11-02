import { describe, test, expect } from 'vitest';
import { 
  calculatePath,
  calculateClamperDoorwayPath,
  calculateClamperTK04Path
} from '../utils/calculations';

describe('Path Calculations', () => {
  const defaultSettings = {
    verticalRun: 22,
    dressingAllowance: 11,
    slackAllowance: 10,
    aisleEntryLength: 6
  };

  test('calculates aisle path correctly', () => {
    const path = calculatePath('TD15', 'TK04', 'aisle', defaultSettings);
    
    expect(path).toMatchObject({
      path: expect.arrayContaining([
        expect.arrayContaining([expect.any(Number), expect.any(Number)])
      ]),
      length: expect.any(Number)
    });
  });

  test('handles adjacent racks', () => {
    const path = calculatePath('TK01', 'TK02', 'aisle', defaultSettings);
    
    expect(path.path.length).toBe(2); // Direct path should only have start and end points
    expect(path.length).toBeLessThan(50); // Adjacent racks should have shorter paths
  });

  test('calculates clamper paths', () => {
    const doorwayPath = calculateClamperDoorwayPath('CL01', 'TD15', defaultSettings);
    const tk04Path = calculateClamperTK04Path('CL01', 'TD15', defaultSettings);
    
    expect(doorwayPath.length).not.toBe(tk04Path.length);
    expect(doorwayPath.path.length).toBe(3); // Start, doorway, end
    expect(tk04Path.path.length).toBe(3); // Start, TK04, end
  });
}); 