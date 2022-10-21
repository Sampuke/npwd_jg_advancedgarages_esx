export interface GarageItem {
  body: number;
  engine: number;
  fuel: number;
  garage?: string;
  impound_reason?: string;
  hash: string;
  plate: string;
  state: 'out' | 'parked' | 'impound';
  vehicle: string;
  brand: string;
  type: 'car' | 'aircraft' | 'boat' | 'bike';
}
