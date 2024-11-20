import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusCard } from "../../components/StatusCard";
import { Navigation, Truck } from "lucide-react";

export const TruckIndex = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="container p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Truck {id} Details</h1>
          <button
            className="font-medium text-sm border-2 border-input px-4 py-2 rounded-lg hover:bg-white hover:text-background transition-colors"
            onClick={() => navigate("/")}
          >
            Back to Overview
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <StatusCard
                className="col-span-1"
                title="Distance"
                value="234 km"
                icon={<Navigation />}
              />
              <StatusCard
                className="col-span-1"
                title="Status"
                value="Active"
                icon={<Truck />}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
