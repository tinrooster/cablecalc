import React from 'react';

export const LoadingOverlay: React.FC = () => (
  <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
); 