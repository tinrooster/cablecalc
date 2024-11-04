'use client'

interface RackPositionProps {
  row: string
  position: string
  isSelected: boolean
  isSource?: boolean
  onClick: () => void
}

export function RackPosition({ row, position, isSelected, isSource, onClick }: RackPositionProps) {
  return (
    <button
      className={`
        w-[38px] h-[30px]
        flex items-center justify-center 
        border border-[#797979]
        font-medium text-xs
        transition-colors
        ${isSelected 
          ? 'bg-blue-500 text-white' 
          : 'bg-[#f3f4f6] hover:border-blue-500'
        }
      `}
      onClick={onClick}
    >
      {position}
    </button>
  )
}

const PATHS = {
  aisle: {
    x: 50,
    label: 'Aisle Route (Default)'
  },
  middle: {
    x: 400,    // Middle Cross Tray position
    label: 'Middle Cross Tray (TH08-TC11)',
    fixed: {
      source: 'TH08',
      target: 'TC11'
    }
  },
  end: {
    x: 150,    // End Cross Tray position
    label: 'End Cross Tray (TK01-TC04)',
    fixed: {
      source: 'TK01',
      target: 'TC04'
    }
  }
};