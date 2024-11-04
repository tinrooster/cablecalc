'use client'

type RouteType = 'aisle' | 'middle' | 'end';

interface RouteToggleProps {
  value: RouteType;
  onChange: (type: RouteType) => void;
}

export function RouteToggle({ value, onChange }: RouteToggleProps) {
  return (
    <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
      <button
        onClick={() => onChange('aisle')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          value === 'aisle'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-white hover:shadow-sm'
        }`}
      >
        Aisle Route
      </button>
      
      <div className="h-4 w-px bg-gray-300" /> {/* Divider */}
      
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => onChange('middle')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            value === 'middle'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-white hover:shadow-sm'
          }`}
        >
          Middle Cross
          <span className="ml-1 text-xs opacity-75">
            (TH08-TC11)
          </span>
        </button>
        
        <button
          onClick={() => onChange('end')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            value === 'end'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-white hover:shadow-sm'
          }`}
        >
          End Cross
          <span className="ml-1 text-xs opacity-75">
            (TK01-TC04)
          </span>
        </button>
      </div>
    </div>
  )
} 