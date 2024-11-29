import React from "react";
import { Card } from "./UI/card";
import { AlertTriangleIcon, Bell } from "lucide-react";
import { TruckEvent } from "../types/truck";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const mockAlerts: TruckEvent[] = [
  {
    created_at: "2024-11-20T05:02:00Z",
    entry_id: 34,
    field1: "70-3910",
    field2: "1",
  },
  {
    created_at: "2024-11-20T05:02:21Z",
    entry_id: 35,
    field1: "70-3910",
    field2: "2",
  },
  {
    created_at: "2024-11-20T05:02:41Z",
    entry_id: 36,
    field1: "70-3910",
    field2: "1",
  },
];

const getAlertCard = (event: TruckEvent) => {
  switch (event.field2) {
    case "1":
      return (
        <div className="flex items-center p-4 bg-primary/10  border border-primary/40 rounded-lg">
          <div className="flex items-center gap-4">
            <AlertTriangleIcon className="text-primary w-5 h-5" />
            <div className="flex-1 items-center space-y-1">
              <p className="text-sm md:text-base font-medium">
                Rapid fuel decrease detected - Potential theft
              </p>
              <p className="text-sm  text-gray-400">
                {dayjs(event.created_at).format("MMM D YYYY [at] h:mm A")}
              </p>
            </div>
          </div>
        </div>
      );
      break;

    default:
      return (
        <div className="flex items-center p-4 bg-primary/10  border border-primary/40 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangleIcon className="text-primary w-5 h-5" />
            <div className="flex-1 items-center space-y-1">
              <p className="text-sm md:text-base font-medium">
                Driver drowsiness detected - Rest needed
              </p>
              <p className="text-sm  text-gray-400">
                {dayjs(event.created_at).format("MMM D YYYY [at] h:mm A")}
              </p>
            </div>
          </div>
        </div>
      );
      break;
  }
};

export const Notification = () => {
  return (
    <Card className="glass-card p-6 text-left animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-primary" />
          <p className="text-xl font-medium">Critical Alerts</p>
        </div>
        <div className="flex bg-primary/70 px-2 py-0.5 rounded-2xl text-sm font-medium">
          {mockAlerts.length}
        </div>
      </div>
      <div
        className="flex-1 space-y-4 overflow-y-scroll h-[300px] pr-2 
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-track]:rounded-lg
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-lg
        [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
        dark:[&::-webkit-scrollbar-track]:bg-gray-800
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
        dark:[&::-webkit-scrollbar-thumb]:hover:bg-gray-500"
      >
        {mockAlerts.map((alert) => getAlertCard(alert))}
      </div>
    </Card>
  );
};
