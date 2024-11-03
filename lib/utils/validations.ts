import type { Settings, ValidationError, SettingValidation } from '@/types/settings';

export function validateSettings(settings: Settings): SettingValidation {
  const errors: ValidationError[] = [];

  // Add validation rules
  if (!settings.sourceRack) {
    errors.push({ field: 'sourceRack', message: 'Source rack is required' });
  }

  if (!settings.targetRack) {
    errors.push({ field: 'targetRack', message: 'Target rack is required' });
  }

  // Add other validation rules as needed

  return {
    isValid: errors.length === 0,
    errors
  };
} 