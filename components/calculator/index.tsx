'use client';

import { useState } from 'react';
import { RackGrid } from './elements/RackGrid';
import { SettingsPanel } from './elements/SettingsPanel';

export function CableLengthCalculator() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cable Length Calculator</h1>
      
      {/* Main Content */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Rack Layout</h2>
        <RackGrid />
      </div>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      {/* Settings Toggle Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 w-12 h-12 
                   bg-blue-500 text-white rounded-full 
                   shadow-lg flex items-center justify-center
                   hover:bg-blue-600 transition-colors"
      >
        ⚙️
      </button>
    </div>
  );
} 