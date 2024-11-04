'use client'

interface RackPositionProps {
  row: string
  position: string
  isSelected?: boolean
  isSource?: boolean
  onClick: () => void
}

export function RackPosition({ row, position, isSelected, isSource, onClick }: RackPositionProps) {
  return (
    <button
      type="button"
      className={`
        w-9 h-9 
        border-2 
        rounded 
        flex 
        items-center 
        justify-center 
        text-sm
        font-medium
        transition-colors 
        duration-150
        ${
          isSelected
            ? isSource
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'bg-blue-200 border-blue-600 text-blue-800'
            : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
        }
      `}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {position}
    </button>
  )
}