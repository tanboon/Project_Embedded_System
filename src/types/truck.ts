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
