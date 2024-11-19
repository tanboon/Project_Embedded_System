import * as React from "react";
import { TruckData } from "../../types/truck";
import { AlertTriangle, CheckCircle, Truck, TruckIcon } from "lucide-react";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));

interface TruckCardProps {
  truck: TruckData;
  selectedTruck: TruckData | null;
  onTruckSelect: (truck: TruckData) => void;
  onTruckClick: (truckId: string) => void;
}

export const TruckCard = ({
  truck,
  selectedTruck,
  onTruckClick,
  onTruckSelect,
}: TruckCardProps) => {
  const getStatusIcon = (status: TruckData["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "inactive":
        return <Truck className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card
      key={truck.id}
      className={`glass-card p-4 cursor-pointer transition-all hover:scale-[1.02] 
        hover:ring-1 hover:ring-primary
      `}
      onClick={() => {
        onTruckSelect(truck);
        onTruckClick(truck.id);
      }}
    >
      <div className="flex items-center gap-4">
        <div className="p-2 text-primary">
          <TruckIcon className="h-6 w-6" />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{truck.name}</h3>
            {getStatusIcon(truck.status)}
          </div>
          <p className="text-sm text-muted-foreground">
            Driver: {truck.driverName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {truck.location.address}
          </p>
        </div>
      </div>
    </Card>
  );
};
