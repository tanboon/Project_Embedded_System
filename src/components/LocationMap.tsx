import { MapPin } from "lucide-react";
import { Card } from "./UI/card";
import React from "react";
import { TruckData } from "../types/truck";
import { useApiIsLoaded, Map, Marker } from "@vis.gl/react-google-maps";
import { CircularProgress } from "@mui/material";
import { mapStyles } from "./UI/map";

interface LocationMapProps {
  truck: TruckData;
}

export const LocationMap = ({ truck }: LocationMapProps) => {
  const isLoaded = useApiIsLoaded();
  if (!isLoaded) return <CircularProgress color="secondary" />;

  return (
    <Card className="glass-card p-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Truck Location</p>
          <MapPin className="text-primary" />
        </div>
        <div
          style={{
            aspectRatio: 16 / 9,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Map
            styles={mapStyles}
            defaultZoom={15}
            defaultCenter={truck.location}
            disableDefaultUI={true}
          >
            <Marker
              key={truck.id || 0}
              position={truck.location}
              icon={{
                url: "https://maps.google.com/mapfiles/kml/shapes/truck.png",
                scaledSize: new window.google.maps.Size(32, 32),
                anchor: new window.google.maps.Point(16, 16),
              }}
              title={truck.name || `Truck 1`}
            />
          </Map>
        </div>
        <div className="text-left">
          <p className="text-sm text-muted-foreground">Current Location</p>
          <p className="text-sm font-medium">{truck.location.address}</p>
        </div>
      </div>
    </Card>
  );
};
