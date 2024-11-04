'use client'

import { useState } from 'react'

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    verticalRun: { value: 1, unit: 'feet' },
    dressingAllowance: { value: 6, unit: 'inches' },
    slackAllowance: { value: 1.5, unit: 'feet' },
    aisleEntryExit: { value: 3, unit: 'feet' }
  })

  const handleChange = (key: string, value: number, unit: 'feet' | 'inches') => {
    setSettings(prev => ({
      ...prev,
      [key]: { value, unit }
    }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Vertical Run
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={settings.verticalRun.value}
            onChange={(e) => handleChange('verticalRun', Number(e.target.value), 'feet')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="mt-1 inline-flex items-center text-sm text-gray-500">
            feet
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dressing Allowance
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={settings.dressingAllowance.value}
            onChange={(e) => handleChange('dressingAllowance', Number(e.target.value), 'inches')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="mt-1 inline-flex items-center text-sm text-gray-500">
            inches
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Slack Allowance
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={settings.slackAllowance.value}
            onChange={(e) => handleChange('slackAllowance', Number(e.target.value), 'feet')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="mt-1 inline-flex items-center text-sm text-gray-500">
            feet
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Aisle Entry/Exit
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={settings.aisleEntryExit.value}
            onChange={(e) => handleChange('aisleEntryExit', Number(e.target.value), 'feet')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="mt-1 inline-flex items-center text-sm text-gray-500">
            feet
          </span>
        </div>
      </div>
    </div>
  )
} 