export interface Settings {
  rackWidth: number;
  rackSpacing: number;
  serviceLoop: number;
  cableAllowance: number;
  showMeasurements: boolean;
}

export interface Path {
  points: Point[];
  length: number;
}

export interface Point {
  x: number;
  y: number;
}

export type RoutingType = 'aisle' | 'overhead' | 'underfloor';

export interface RackSelectionState {
  sourceRack: string;
  targetRack: string;
  activePath: Path | null;
  cableLength: number | null;
  routingType: RoutingType;
} 