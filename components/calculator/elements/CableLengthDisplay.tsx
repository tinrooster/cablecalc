import React from 'react';

interface CableLengthDisplayProps {
  length: number;
}

export const CableLengthDisplay: React.FC<CableLengthDisplayProps> = ({ length }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <h3 className="text-sm font-medium text-gray-700">
      Estimated Cable Length
    </h3>
    <p className="text-2xl font-bold text-blue-600">
      {Math.ceil(length)}′
    </p>
    <p className="text-xs text-gray-500 mt-1">
      Includes all allowances and service loops
    </p>
  </div>
); 