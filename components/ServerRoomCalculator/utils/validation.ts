import type { SettingValidation, ValidationError } from '../types/settings';

export const validateSetting = (
  value: number | boolean,
  validation: SettingValidation
): ValidationError | null => {
  if (typeof value === 'boolean') {
    return null; // Boolean values don't need validation
  }

  if (validation.required && (value === null || value === undefined)) {
    return { message: 'This field is required', type: 'error' };
  }

  if (validation.min !== undefined && value < validation.min) {
    return { 
      message: `Value must be at least ${validation.min}`, 
      type: 'error' 
    };
  }

  if (validation.max !== undefined && value > validation.max) {
    return { 
      message: `Value must not exceed ${validation.max}`, 
      type: 'error' 
    };
  }

  if (validation.customValidation) {
    return validation.customValidation(value);
  }

  return null;
}; 