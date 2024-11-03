import { render, screen } from '@testing-library/react'
import { ServerRoomCalculator } from '../ServerRoomCalculator'

describe('ServerRoomCalculator', () => {
  it('renders the main calculator components', () => {
    render(<ServerRoomCalculator />)
    
    expect(screen.getByTestId('settings-panel')).toBeInTheDocument()
    expect(screen.getByTestId('room-visualization')).toBeInTheDocument()
  })
}) 