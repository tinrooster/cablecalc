import { render, screen, fireEvent } from '@testing-library/react'
import { SettingsPanel } from '../SettingsPanel'
import { type Settings } from '@/types/calculator'

const mockSettings: Settings = {
  rackHeight: 42,
  rackPosition: { x: 0, y: 0 },
  mdfPosition: { x: 10, y: 10 },
  cablePathType: 'overhead',
  // ... other settings from your working implementation
}

describe('SettingsPanel', () => {
  it('renders with default settings', () => {
    const onSettingsChange = jest.fn()
    render(
      <SettingsPanel 
        settings={mockSettings}
        onSettingsChange={onSettingsChange}
      />
    )

    expect(screen.getByLabelText(/rack height/i)).toHaveValue('42')
    expect(screen.getByRole('group', { name: /cable path/i })).toBeInTheDocument()
  })

  it('calls onSettingsChange when settings are updated', () => {
    const onSettingsChange = jest.fn()
    render(
      <SettingsPanel 
        settings={mockSettings}
        onSettingsChange={onSettingsChange}
      />
    )

    fireEvent.change(screen.getByLabelText(/rack height/i), {
      target: { value: '48' }
    })

    expect(onSettingsChange).toHaveBeenCalledWith(
      expect.objectContaining({
        rackHeight: 48
      })
    )
  })
}) 