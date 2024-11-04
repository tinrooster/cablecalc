'use client'

import { useState } from 'react';
import { SettingsPanel } from './settings/SettingsPanel';
import { RackGrid } from './elements/RackGrid';

export function ServerRoomCalculator() {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Cable Path Settings</h2>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="px-4 py-2 bg-navy-700 text-white rounded"
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>
      
      {showSettings && <SettingsPanel />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RackGrid />
        </div>
        <div>
          {/* Routing info will go here */}
        </div>
      </div>
    </div>
  );
}