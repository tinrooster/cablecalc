'use client'

import { useState } from 'react';
import { cableCalculatorAPI } from '@/lib/api/cableCalculator';

export function APITest() {
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);

  const testConnection = async () => {
    setApiStatus('loading');
    try {
      const result = await cableCalculatorAPI.calculateSingle({
        source_rack: 'TC-12',
        target_rack: 'TF-03',
        route_type: 'default',
        settings: {
          vertical_run: 12,
          dressing_allowance: 6,
          slack_allowance: 10,
          aisle_entry_exit: 3,
        }
      });
      setResponse(result);
      setApiStatus('success');
    } catch (error) {
      console.error('API Test Failed:', error);
      setResponse(error);
      setApiStatus('error');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">API Connection Test</h3>
      
      <button
        onClick={testConnection}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        disabled={apiStatus === 'loading'}
      >
        {apiStatus === 'loading' ? 'Testing...' : 'Test API Connection'}
      </button>

      {apiStatus !== 'idle' && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Status: {apiStatus}</h4>
          <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 