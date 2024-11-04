import { useState } from 'react';
import { cableCalculatorAPI } from '@/lib/api/cableCalculator';
import { useSettings } from '@/components/calculator/context/SettingsContext';

export function useCableCalculator() {
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCalculation, setCurrentCalculation] = useState<CableCalculationResponse | null>(null);

  const calculateCableLength = async (sourceRack: string, targetRack: string, routeType: 'default' | 'alternate') => {
    setLoading(true);
    setError(null);

    try {
      const request = {
        source_rack: sourceRack,
        target_rack: targetRack,
        route_type: routeType,
        settings: {
          vertical_run: settings.verticalRun,
          dressing_allowance: settings.dressingAllowance,
          slack_allowance: settings.slackAllowance,
          aisle_entry_exit: settings.aisleEntryExit,
        }
      };

      const result = await cableCalculatorAPI.calculateSingle(request);
      setCurrentCalculation(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    calculateCableLength,
    currentCalculation,
    loading,
    error
  };
}