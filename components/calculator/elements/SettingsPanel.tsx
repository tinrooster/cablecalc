'use client'

import { useState } from 'react'

export function SettingsPanel({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black bg-opacity-25 transition-opacity
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`
          fixed right-0 top-0 h-full w-96 
          bg-white shadow-xl 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Settings</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vertical Run
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  className="w-20 p-2 border rounded" 
                  defaultValue={1}
                />
                <span className="text-gray-600">feet</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dressing Allowance
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  className="w-20 p-2 border rounded" 
                  defaultValue={6}
                />
                <span className="text-gray-600">inches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 