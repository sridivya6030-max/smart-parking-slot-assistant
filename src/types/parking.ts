export type ParkingStatus = 'Available' | 'Occupied' | 'Unknown';

export type SlotType = 'Standard' | 'Compact' | 'EV Charging' | 'Accessible';

export type ZoneName = 'Zone A (North Gate)' | 'Zone B (Academic Wing)' | 'Zone C (Visitor & EV)';

export interface ParkingSlot {
  id: string; // e.g. "P01", "P02"
  status: ParkingStatus;
  type: SlotType;
  zone: ZoneName;
  floor: string;
  notes: string;
  lastUpdated: string;
  simulatedVehicle?: string;
  aiDetectionConfidence?: number; // Educational demonstration metric (e.g. 94%)
}

export interface ParkingStats {
  total: number;
  available: number;
  occupied: number;
  unknown: number;
  occupancyPercentage: number;
}
