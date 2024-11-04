interface RackPositionProps {
  id: string;
  label: string;
  isSelected: boolean;
  showMeasurements: boolean;
  onClick: () => void;
}

export function RackPosition({ 
  id, 
  label, 
  isSelected, 
  showMeasurements,
  onClick 
}: RackPositionProps) {
  return (
    <button
      className={`
        relative
        w-10 h-10 flex items-center justify-center
        border rounded text-sm
        ${isSelected 
          ? 'bg-blue-100 border-blue-500 text-blue-700' 
          : 'border-gray-300 hover:border-gray-400'
        }
      `}
      onClick={onClick}
    >
      {label}
      {showMeasurements && isSelected && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
          {id}
        </div>
      )}
    </button>
  );
} 