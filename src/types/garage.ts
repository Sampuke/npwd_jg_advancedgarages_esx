export interface GarageItem {
  body: number;
  engine: number;
  fuel: number;
  garage: string;
  hash: string;
  plate: string;
  state: 'not in garage' | 'in garage';
  vehicle: string;
  brand: string;
  type: 'car' | 'aircraft' | 'boat' | 'bike';
}
