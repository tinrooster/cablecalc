"use client"

import { RackGrid } from '@/components/calculator/elements/RackGrid'
import { SettingsPanel } from '@/components/calculator/elements/SettingsPanel'

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Rack Layout</h2>
            <RackGrid />
          </div>
        </div>
        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <SettingsPanel />
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Calculation History</h2>
        {/* We'll add the history component later */}
      </div>
    </div>
  )
}