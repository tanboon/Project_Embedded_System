export interface TruckData {
  id: string;
  name: string;
  status: "active" | "inactive" | "warning";
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  driverName: string;
  fuelLevel: number;
}

export interface TruckEvent {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
}
