import React from 'react';
import { Settings, MDFRoute, type MDFSettingsType } from '../../types/settings';

interface MDFSettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const MDFSettings: React.FC<MDFSettingsProps> = ({ settings, onSettingsChange }) => {
  const addRoute = () => {
    const newSettings: Settings = {
      ...settings,
      mdf: {
        ...settings.mdf,
        routes: {
          ...settings.mdf.routes,
          [`route_${Object.keys(settings.mdf.routes).length + 1}`]: {
            sourceRack: '',
            targetRack: '',
            routeType: 'aisle',
            distance: 0,
            isDirect: true,
            description: ''
          }
        }
      }
    };
    onSettingsChange(newSettings);
  };

  const updateRoute = (routeId: string, field: keyof MDFRoute, value: string | number | boolean) => {
    const newSettings: Settings = {
      ...settings,
      mdf: {
        ...settings.mdf,
        routes: {
          ...settings.mdf.routes,
          [routeId]: {
            ...settings.mdf.routes[routeId],
            [field]: value
          }
        }
      }
    };
    onSettingsChange(newSettings);
  };

  const updateMDFOverhead = (value: number) => {
    const newSettings: Settings = {
      ...settings,
      mdf: {
        ...settings.mdf,
        defaultMDFOverhead: value
      }
    };
    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">MDF Routing Settings</h4>
      
      {/* Default MDF Overhead */}
      <div className="space-y-2">
        <label className="flex items-center justify-between">
          <span>Default MDF Overhead (feet)</span>
          <input
            type="number"
            value={settings.mdf.defaultMDFOverhead}
            onChange={(e) => updateMDFOverhead(Number(e.target.value))}
            className="w-24 px-2 py-1 border rounded"
          />
        </label>
      </div>

      {/* MDF Routes */}
      <div className="space-y-4">
        <h5 className="text-sm font-medium">MDF Routes</h5>
        
        {Object.entries(settings.mdf.routes).map(([routeId, route]) => (
          <div key={routeId} className="p-4 border rounded space-y-2">
            <input
              type="text"
              value={route.description}
              onChange={(e) => updateRoute(routeId, 'description', e.target.value)}
              placeholder="Route Description (e.g., 'MDF to Room B')"
              className="w-full px-2 py-1 border rounded"
            />
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <span>Distance (feet)</span>
                <input
                  type="number"
                  value={route.distance}
                  onChange={(e) => updateRoute(routeId, 'distance', Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded"
                />
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={route.isDirect}
                  onChange={(e) => updateRoute(routeId, 'isDirect', e.target.checked)}
                  className="form-checkbox"
                />
                <span>Direct Path Available</span>
              </label>
            </div>
          </div>
        ))}

        <button
          onClick={addRoute}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add MDF Route
        </button>
      </div>
    </div>
  );
}; 