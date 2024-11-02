import { useState, useCallback } from 'react';

export const useSettings = (defaultSettings) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsChange = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

  return {
    settings,
    showSettings,
    handleSettingsChange,
    toggleSettings
  };
}; 