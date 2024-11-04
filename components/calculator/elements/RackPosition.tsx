interface RackPositionProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export function RackPosition({ id, label, isSelected, onClick }: RackPositionProps) {
  return (
    <button
      className={`
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
    </button>
  );
} 