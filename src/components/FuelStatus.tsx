import { Card } from "./UI/card";
import { AlertTriangle, Droplet } from "lucide-react";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#191f2b",
  },
  [`& .${linearProgressClasses.bar}`]: {
    // borderRadius: 5,
    backgroundColor: "#9B4DE3",
  },
}));

export const FuelStatus = () => {
  const fuelLevel = 0.2;
  const isLowFuel = fuelLevel < 0.25 ? true : false;

  return (
    <Card className="glass-card p-6 animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Fuel Status</p>
        <Droplet
          className={`${isLowFuel ? "text-destructive" : "text-primary"}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Fuel Level</p>
        <p className="text-sm">{fuelLevel * 100}%</p>
      </div>
      <BorderLinearProgress variant="determinate" value={fuelLevel * 100} />
      {isLowFuel && (
        <div className="flex items-center gap-2 text-destructive animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Low Fuel Warning</span>
        </div>
      )}
    </Card>
  );
};
