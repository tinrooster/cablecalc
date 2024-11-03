import { render, screen, fireEvent } from '@testing-library/react'
import { SettingsPanel } from '../SettingsPanel'
import { mockDefaultSettings } from '../test-utils'

describe('SettingsPanel', () => {
  it('renders all setting controls', () => {
    render(<SettingsPanel 
      settings={mockDefaultSettings}
      onSettingsChange={jest.fn()}
    />)
    
    // Verify critical settings controls exist
    expect(screen.getByLabelText(/rack height/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cable path/i)).toBeInTheDocument()
    // Add more specific control checks
  })

  it('handles settings changes correctly', () => {
    const onSettingsChange = jest.fn()
    render(<SettingsPanel 
      settings={mockDefaultSettings}
      onSettingsChange={onSettingsChange}
    />)

    // Test interaction
    fireEvent.change(screen.getByLabelText(/rack height/i), {
      target: { value: '42' }
    })

    expect(onSettingsChange).toHaveBeenCalled()
    // Add specific value checks
  })
}) 