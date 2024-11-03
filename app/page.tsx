"use client"

import { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState("default");
  const [parameters, setParameters] = useState({
    startPoint: '',
    endPoint: '',
    cableType: '',
    // Add other parameters as needed
  });

  const handleParameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({
      ...parameters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Title */}
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-serif">KGO Cable Length Calculator</h1>
        
        {/* Export Button */}
        <button className="mt-4 px-4 py-1 border border-black rounded hover:bg-gray-100">
          Export Calculations
        </button>

        {/* Route Selection */}
        <div className="mt-8">
          <h2 className="text-xl font-serif">Route Type:</h2>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="route"
                value="default"
                checked={value === "default"}
                onChange={(e) => setValue(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Default Route</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="route"
                value="alternate"
                checked={value === "alternate"}
                onChange={(e) => setValue(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Alternate Route</span>
            </label>
          </div>
        </div>

        {/* Cable Parameters Section */}
        <div className="mt-8 w-full">
          <h2 className="text-xl font-serif">Cable Parameters:</h2>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startPoint" className="block">Start Point</label>
                <input
                  type="text"
                  id="startPoint"
                  name="startPoint"
                  value={parameters.startPoint}
                  onChange={handleParameterChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endPoint" className="block">End Point</label>
                <input
                  type="text"
                  id="endPoint"
                  name="endPoint"
                  value={parameters.endPoint}
                  onChange={handleParameterChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="cableType" className="block">Cable Type</label>
              <select
                id="cableType"
                name="cableType"
                value={parameters.cableType}
                onChange={(e) => setParameters({...parameters, cableType: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Cable Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
                {/* Add more cable types as needed */}
              </select>
            </div>

            {/* Add more parameter inputs as needed */}
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8">
          <h2 className="text-xl font-serif">Calculated Length:</h2>
          <div className="mt-2">
            {/* Calculation results will go here */}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-1 bg-gray-100 border-t text-sm">
        Ready
      </div>
    </main>
  );
}