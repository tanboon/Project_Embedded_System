import React from "react";
import { Card } from "./UI/card";
import { AlertTriangle, Coffee } from "lucide-react";
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

export const DriverStatus = () => {
  const drowsiness = 0.8;
  const isDrowsiness = drowsiness > 0.6 ? true : false;

  return (
    <Card className="glass-card p-6 animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Driver Status</p>
        <Coffee
          className={`${isDrowsiness ? "text-destructive" : "text-primary"}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Drowsiness Level</p>
        <p className="text-sm">{drowsiness * 100}%</p>
      </div>
      <BorderLinearProgress variant="determinate" value={drowsiness * 100} />
      {isDrowsiness && (
        <div className="flex items-center gap-2 text-destructive animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Driver Drowsiness Alert</span>
        </div>
      )}
    </Card>
  );
};
