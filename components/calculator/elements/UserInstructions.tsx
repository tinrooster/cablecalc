import React from 'react';

interface UserInstructionsProps {
  sourceRack?: string;
  targetRack?: string;
}

export const UserInstructions: React.FC<UserInstructionsProps> = ({ 
  sourceRack = '', 
  targetRack = '' 
}) => {
  if (!sourceRack) {
    return (
      <p className="text-sm text-gray-500">
        Click a rack to select the source
      </p>
    );
  }

  if (!targetRack) {
    return (
      <p className="text-sm text-gray-500">
        Click another rack to select the target
      </p>
    );
  }

  return null;
}; 