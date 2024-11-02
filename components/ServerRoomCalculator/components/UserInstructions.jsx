import React from 'react';

export const UserInstructions = ({ sourceRack, targetRack }) => {
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

// Optional: Add PropTypes
UserInstructions.propTypes = {
  sourceRack: PropTypes.string,
  targetRack: PropTypes.string,
};

UserInstructions.defaultProps = {
  sourceRack: '',
  targetRack: '',
}; 