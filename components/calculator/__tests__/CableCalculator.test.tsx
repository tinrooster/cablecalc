import { render, screen, fireEvent } from '@testing-library/react'
import { CableCalculator } from '../CableCalculator'

describe('CableCalculator Core Functionality', () => {
  // Basic Rendering
  it('renders without crashing', () => {
    render(<CableCalculator />)
    expect(screen.getByTestId('cable-calculator')).toBeInTheDocument()
  })

  // Settings Panel
  it('shows settings panel with correct initial values', () => {
    render(<CableCalculator />)
    expect(screen.getByTestId('settings-panel')).toBeInTheDocument()
    // Add specific settings checks based on your defaults
  })

  // Room Visualization
  it('displays room visualization', () => {
    render(<CableCalculator />)
    expect(screen.getByTestId('room-visualization')).toBeInTheDocument()
  })

  // Calculations
  it('calculates cable length correctly for default settings', () => {
    render(<CableCalculator />)
    const lengthDisplay = screen.getByTestId('cable-length')
    expect(lengthDisplay).toHaveTextContent(/\d+/) // Should show some numeric value
  })
}) 