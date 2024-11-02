import type { Settings } from '../../../types/settings';
import type { Path } from '../../../types/calculations';

export interface RoomVisualizationProps {
  settings: Settings;
  currentPath: Path | null;
  onRackSelect?: (rackId: string) => void;
  selectedRacks?: {
    source?: string;
    target?: string;
  };
} 