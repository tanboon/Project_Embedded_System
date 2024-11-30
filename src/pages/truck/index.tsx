import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StatusCard } from "../../components/StatusCard";
import { Droplet, Gauge } from "lucide-react";
import { LocationMap } from "../../components/LocationMap";
import { TruckData } from "../../types/truck";
import { FuelChart } from "../../components/FuelChart";
import { Header } from "../../components/Header";
import { Notification } from "../../components/Notification";
import { useFuel } from "../../hooks/useFuel";
import { useLocation } from "../../hooks/useLocation";
import { CircularProgress } from "@mui/material";
import { useEvents } from "../../hooks/useEvents";

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

  let index = null;
  switch (id) {
    case "T001":
      index = 0;
      break;
    case "T002":
      index = 1;
      break;
    case "T003":
      index = 2;
      break;
    default:
      index = -1;
      break;
  }

  const selectedTruck = trucks.filter((truck) => truck.id === id);
  const { data: locationData, isLoading } = useLocation(index);
  useEffect(() => {
    if (locationData && !isLoading) {
      selectedTruck[0].location.lat = locationData.V1;
      selectedTruck[0].location.lng = locationData.V2;
      // const FetchAddress = async () => {
      //   const result = await useGetLocation(locationData.V1, locationData.V2);
      //   if (result)
      //     selectedTruck[0].location.address =
      //       result.results[11].formatted_address || "";
      // };
      // FetchAddress();
    }
  }, [locationData, isLoading, selectedTruck]);

  const { data: fuelData } = useFuel(index);
  const { data: eventData } = useEvents();

  if (!fuelData || !locationData || !eventData) {
    return <CircularProgress />;
  }
  const fuelRatio =
    (parseFloat(fuelData.feeds[fuelData.feeds.length - 1].field1) / 4000) * 100;

  return (
    <div className="min-h-screen bg-background">
      <main className="container p-4 space-y-6">
        <Header truck={selectedTruck[0]} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-1 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FuelChart data={fuelData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <StatusCard
                className="col-span-1"
                title="Velocity"
                value={`${locationData.V3}`}
                suffix="km/h"
                icon={<Gauge />}
              />
              <StatusCard
                className="col-span-1"
                title={"Fuel"}
                value={`${fuelRatio.toPrecision(3)}%`}
                suffix="remaining"
                icon={<Droplet />}
              />
            </div>
          </div>
          <div className="col-span-1 space-y-6">
            <LocationMap truck={selectedTruck[0]} />
            <Notification events={eventData} />
          </div>
        </div>
      </main>
    </div>
  );
};
