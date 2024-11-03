"use client"

import * as React from "react"

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, children }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  );
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  groupValue: string;
  onSelect: (value: string) => void;
  label: string;
}

export function RadioGroupItem({ value, id, groupValue, onSelect, label }: RadioGroupItemProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={id}
        name="radio-group"
        value={value}
        checked={value === groupValue}
        onChange={(e) => onSelect(e.target.value)}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
} 