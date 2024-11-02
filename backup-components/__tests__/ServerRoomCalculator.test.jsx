import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServerRoomCalculator from '../index';

describe('ServerRoomCalculator', () => {
  beforeEach(() => {
    render(<ServerRoomCalculator />);
  });

  test('renders initial state correctly', () => {
    // Check for initial instructions
    expect(screen.getByText(/Click a rack to select the source/i)).toBeInTheDocument();
    
    // Check for main components
    expect(screen.getByRole('radio', { name: /aisle route/i })).toBeInTheDocument();
    expect(screen.getByText(/cable path settings/i)).toBeInTheDocument();
  });

  test('handles rack selection flow', async () => {
    const user = userEvent.setup();
    
    // Click first rack (TD15)
    const td15Rack = screen.getByText('TD15').closest('g');
    await user.click(td15Rack);
    
    // Check for updated instruction
    expect(screen.getByText(/Click another rack to select the target/i)).toBeInTheDocument();
    
    // Click second rack (TK04)
    const tk04Rack = screen.getByText('TK04').closest('g');
    await user.click(tk04Rack);
    
    // Check for cable length display
    expect(screen.getByText(/estimated cable length/i)).toBeInTheDocument();
  });

  test('calculates correct path lengths', async () => {
    const user = userEvent.setup();
    
    // Select source and target racks
    await user.click(screen.getByText('TD15').closest('g'));
    await user.click(screen.getByText('TK04').closest('g'));
    
    // Get initial length
    const initialLength = screen.getByText(/\d+′/).textContent;
    
    // Change routing type
    await user.click(screen.getByRole('radio', { name: /middle cross tray/i }));
    
    // Get new length
    const newLength = screen.getByText(/\d+′/).textContent;
    
    // Lengths should be different for different routing types
    expect(initialLength).not.toBe(newLength);
  });
}); 