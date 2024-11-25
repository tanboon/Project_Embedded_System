import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusCard } from "../../components/StatusCard";
import { Fuel, Gauge, Navigation, Truck } from "lucide-react";
import { LocationMap } from "../../components/LocationMap";
import { TruckData } from "../../types/truck";
import { DriverStatus } from "../../components/DriverStatus";
import { FuelStatus } from "../../components/FuelChart";
import { Card } from "../../components/UI/card";
import { Header } from "../../components/Header";
import { Notification } from "../../components/Notification";

const trucks: TruckData[] = [
  {
    id: "T001",
    name: "Truck 001",
    status: "active",
    location: {
      lat: 13.7563,
      lng: 100.5018,
      address: "Bangkok, Thailand",
    },
    driverName: "John Doe",
    fuelLevel: 75,
  },
  {
    id: "T002",
    name: "Truck 002",
    status: "warning",
    location: {
      lat: 13.8,
      lng: 100.55,
      address: "Pathum Thani, Thailand",
    },
    driverName: "Jane Smith",
    fuelLevel: 45,
  },
  {
    id: "T003",
    name: "Truck 003",
    status: "inactive",
    location: {
      lat: 13.65,
      lng: 100.45,
      address: "Samut Prakan, Thailand",
    },
    driverName: "Mike Johnson",
    fuelLevel: 90,
  },
];

export const TruckIndex = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedTruck = trucks.filter((truck) => truck.id == id);

  return (
    <div className="min-h-screen bg-background">
      <main className="container p-4 space-y-6">
        <Header truck={selectedTruck[0]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-1 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <StatusCard
                className="col-span-1"
                title="Velocity"
                value="234"
                suffix="km/h"
                icon={<Gauge />}
              />
              <StatusCard
                className="col-span-1"
                title={"Fuel"}
                value="20%"
                suffix="remaining"
                icon={<Fuel />}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <DriverStatus />
              <FuelStatus />
            </div>
          </div>
          <div className="col-span-1 space-y-6">
            <LocationMap truck={selectedTruck[0]} />
            <Notification />
          </div>
        </div>
      </main>
    </div>
  );
};
