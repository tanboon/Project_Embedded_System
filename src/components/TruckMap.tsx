import { TruckData } from "../types/truck";
import { Map, Marker, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { mapStyles } from "./UI/map";

import { CircularProgress } from "@mui/material";

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

  const isLoaded = useApiIsLoaded();
  if (!isLoaded) return <CircularProgress color="secondary" />;

  return (
    <div className="relative h-full  flex items-center justify-center">
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Map
          defaultZoom={10}
          defaultCenter={center()}
          disableDefaultUI={true}
          key={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          {selectedTruck != null ? (
            <Marker
              key={selectedTruck.id || 0}
              position={selectedTruck.location}
              icon={{
                url: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
                scaledSize: new window.google.maps.Size(32, 32),
                anchor: new window.google.maps.Point(16, 16),
              }}
              title={selectedTruck.name || `Truck 1`}
            />
          ) : (
            trucks.map((truck, index) => (
              <Marker
                key={truck.id || index}
                position={truck.location}
                icon={{
                  url: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
                  scaledSize: new window.google.maps.Size(32, 32),
                  anchor: new window.google.maps.Point(16, 16),
                }}
                title={truck.name || `Truck ${index + 1}`}
              />
            ))
          )}
        </Map>
      </div>
    </div>
  );
};
