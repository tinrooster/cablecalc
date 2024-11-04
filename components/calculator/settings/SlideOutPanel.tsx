export function SettingsPanel({ isOpen, onClose }) {
  return (
    <div 
      className={`
        fixed top-0 right-0 h-full w-96 
        bg-white shadow-xl transform transition-transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button onClick={onClose}>×</button>
        </div>
        {/* Settings content */}
      </div>
    </div>
  );
} 