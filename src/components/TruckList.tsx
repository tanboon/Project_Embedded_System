import React from "react";
import { TruckData } from "../types/truck";
import { TruckCard } from "./UI/card";

interface TruckListProps {
  trucks: TruckData[];
  selectedTruck: TruckData | null;
  onTruckSelect: (truck: TruckData) => void;
  onTruckClick: (truckId: string) => void;
}

export const TruckList = ({
  trucks,
  selectedTruck,
  onTruckClick,
  onTruckSelect,
}: TruckListProps) => {
  return (
    <div>
      <h2 className="text-left text-lg font-semibold mb-2">
        Trucks ({trucks.length})
      </h2>
      <div className="space-y-3">
        {trucks.map((truck) => (
          <TruckCard
            truck={truck}
            selectedTruck={selectedTruck}
            onTruckClick={onTruckClick}
            onTruckSelect={onTruckSelect}
          />
        ))}
      </div>
    </div>
  );
};
