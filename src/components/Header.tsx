import React from "react";
import { Card } from "./UI/card";
import { useNavigate } from "react-router-dom";
import { TruckData } from "../types/truck";
import {
  ArrowBigRight,
  ArrowBigRightDashIcon,
  ArrowLeft,
  Truck,
} from "lucide-react";

interface HeaderProps {
  truck: TruckData;
}

export const Header = ({ truck }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Card className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          className="border-1 border- px-2 py-2 rounded-lg hover:bg-white hover:text-background transition-colors"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Truck className="text-primary w-8 h-8" />
            <h1 className="text-3xl font-bold">Truck {truck.id}</h1>
          </div>
          <div>
            <p className="text-left text-muted-foreground">
              Driver: {truck.driverName}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
