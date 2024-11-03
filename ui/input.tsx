import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'number' | 'checkbox';
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${props.type === 'checkbox' ? 'w-4 h-4' : ''} 
        ${className}`}
      {...props}
    />
  );
}; 