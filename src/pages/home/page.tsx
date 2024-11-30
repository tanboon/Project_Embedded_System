import { useEffect, useState } from "react";
import { SearchBar } from "../../components/Search";
import { TruckMap } from "../../components/TruckMap";
import { TruckList } from "../../components/TruckList";
import { TruckData } from "../../types/truck";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/UI/card";
import { useLocations } from "../../hooks/useLocations";
import { useGetLocation } from "../../hooks/useGetLocation";

const fetchTruckAddresses = async (
  trucks: TruckData[],
  useGetLocation: any
) => {
  const updatedTrucks = [...trucks];

  const addressPromises = updatedTrucks.map(async (truck) => {
    // try {
    //   const result = await useGetLocation(
    //     truck.location.lat,
    //     truck.location.lng
    //   );
    //   if (result && result.results && result.results[11]) {
    //     truck.location.address = result.results[11].formatted_address || "";
    //   }
    // } catch (error) {
    //   console.error(`Error fetching address for truck ${truck.id}:`, error);
    // }
  });

  await Promise.all(addressPromises);

  return updatedTrucks;
};

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

  useEffect(() => {
    if (data && !isLoading) {
      const updateTrucksWithLocation = async () => {
        const updatedTrucks = [...trucks];

        updatedTrucks[0].location.lat = data.V1;
        updatedTrucks[0].location.lng = data.V2;
        updatedTrucks[1].location.lat = data.V4;
        updatedTrucks[1].location.lng = data.V5;
        updatedTrucks[2].location.lat = data.V7;
        updatedTrucks[2].location.lng = data.V8;

        const trucksWithAddresses = await fetchTruckAddresses(
          updatedTrucks,
          useGetLocation
        );

        setTrucks(trucksWithAddresses);
      };

      updateTrucksWithLocation();
    }
  }, [data, isLoading, trucks]);

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
