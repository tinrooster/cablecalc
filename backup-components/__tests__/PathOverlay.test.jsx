import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PathOverlay } from '../components/PathOverlay';

describe('PathOverlay', () => {
  const mockPath = {
    path: [
      [0, 0],
      [100, 0],
      [100, 100]
    ],
    length: 200
  };

  test('renders nothing when no path provided', () => {
    const { container } = render(<PathOverlay path={null} />);
    expect(container.querySelector('path')).not.toBeInTheDocument();
  });

  test('renders path with correct attributes', () => {
    const { container } = render(
      <PathOverlay 
        path={mockPath}
        routingType="aisle"
        settings={{ visualization: { enhanced: true } }}
      />
    );
    
    const pathElement = container.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('d', 'M 0,0 L 100,0 L 100,100');
  });

  test('applies different styles based on routing type', () => {
    const { container, rerender } = render(
      <PathOverlay 
        path={mockPath}
        routingType="aisle"
        settings={{ visualization: { enhanced: true } }}
      />
    );
    
    const aislePath = container.querySelector('path');
    const aisleColor = aislePath.getAttribute('stroke');
    
    rerender(
      <PathOverlay 
        path={mockPath}
        routingType="end"
        settings={{ visualization: { enhanced: true } }}
      />
    );
    
    const endPath = container.querySelector('path');
    const endColor = endPath.getAttribute('stroke');
    
    expect(aisleColor).not.toBe(endColor);
  });
}); 