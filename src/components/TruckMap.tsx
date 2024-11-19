import { MapPin } from "lucide-react";
import React from "react";
import { TruckData } from "../types/truck";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface TruckMapProps {
  trucks: TruckData[];
  selectedTruck: TruckData | null;
  setSelectedTruck: (truck: TruckData) => void;
}

export const TruckMap = ({
  trucks,
  selectedTruck,
  setSelectedTruck,
}: TruckMapProps) => {
  const center = () => {
    let latitude = 0;
    let longtitude = 0;
    trucks.map(
      (truck) => (
        (latitude = latitude + truck.location.lat),
        (longtitude = longtitude + truck.location.lng)
      )
    );
    latitude = latitude / trucks.length;
    longtitude = longtitude / trucks.length;
    return { lat: latitude, lng: longtitude };
  };

  return (
    <div className="relative h-full rounded-lg bg-muted flex items-center justify-center">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
          }}
          zoom={10}
          center={center()}
        >
          {trucks.map(
            (truck, index) =>
              truck.location.lat &&
              truck.location.lng && (
                <Marker
                  key={truck.id || index}
                  position={{
                    lat: truck.location.lat,
                    lng: truck.location.lng,
                  }}
                  title={truck.name || `Truck ${index + 1}`}
                />
              )
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
