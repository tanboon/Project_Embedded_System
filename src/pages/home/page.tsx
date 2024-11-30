import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "../../components/Search";
import { TruckMap } from "../../components/TruckMap";
import { TruckList } from "../../components/TruckList";
import { TruckData } from "../../types/truck";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/UI/card";
import { useLocations } from "../../hooks/useLocations";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(null);
  const [trucks, setTrucks] = useState<TruckData[]>([
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
  ]);

  const navigate = useNavigate();
  const { data, isLoading } = useLocations();

  const updateTrucksWithLocation = useCallback(async () => {
    if (data && !isLoading) {
      try {
        const updatedTrucks = [...trucks].map((truck, index) => {
          switch (index) {
            case 0:
              return {
                ...truck,
                location: { ...truck.location, lat: data.V1, lng: data.V2 },
              };
            case 1:
              return {
                ...truck,
                location: { ...truck.location, lat: data.V4, lng: data.V5 },
              };
            case 2:
              return {
                ...truck,
                location: { ...truck.location, lat: data.V7, lng: data.V8 },
              };
            default:
              return truck;
          }
        });

        setTrucks(updatedTrucks);
      } catch (error) {
        console.error("Error updating truck locations:", error);
      }
    }
  }, [data, isLoading]);

  useEffect(() => {
    updateTrucksWithLocation();
  }, [updateTrucksWithLocation]);

  const filteredTrucks = trucks.filter(
    (truck) =>
      truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTruckClick = (truckId: string) => {
    navigate(`/truck/${truckId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-left">Overview</h1>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card p-4 h-[600px]">
              <TruckMap
                trucks={filteredTrucks}
                selectedTruck={selectedTruck}
                setSelectedTruck={setSelectedTruck}
              />
            </Card>
          </div>
          <div className="lg:col-span-1">
            <TruckList
              trucks={filteredTrucks}
              selectedTruck={selectedTruck}
              onTruckSelect={setSelectedTruck}
              onTruckClick={handleTruckClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
