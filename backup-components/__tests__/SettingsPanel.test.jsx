import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsPanel } from '../components/SettingsPanel';
import { DEFAULT_SETTINGS } from '../constants/settings';

describe('SettingsPanel', () => {
  const mockSetSettings = vi.fn();
  
  beforeEach(() => {
    render(
      <SettingsPanel
        settings={DEFAULT_SETTINGS}
        setSettings={mockSetSettings}
        showSettings={true}
        setShowSettings={vi.fn()}
      />
    );
  });

  test('renders all setting inputs', () => {
    expect(screen.getByLabelText(/vertical run/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dressing allowance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/slack allowance/i)).toBeInTheDocument();
  });

  test('updates settings on input change', async () => {
    const user = userEvent.setup();
    const verticalRunInput = screen.getByLabelText(/vertical run/i);
    
    await user.clear(verticalRunInput);
    await user.type(verticalRunInput, '25');
    
    expect(mockSetSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        verticalRun: 25
      })
    );
  });

  test('loads and applies presets', async () => {
    const user = userEvent.setup();
    const presetSelect = screen.getByRole('combobox');
    
    await user.click(presetSelect);
    await user.click(screen.getByText(/fiber optic/i));
    
    expect(mockSetSettings).toHaveBeenCalledWith(
      expect.objectContaining({
        dressingAllowance: 15,
        slackAllowance: 15
      })
    );
  });
}); 