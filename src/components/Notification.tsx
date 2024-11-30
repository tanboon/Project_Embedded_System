import { useEffect, useState } from "react";
import { Card } from "./UI/card";
import { AlertTriangleIcon, Bell } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EventEntry, EventsResponse } from "../hooks/useEvents";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

dayjs.extend(relativeTime);

const getAlertCard = (event: EventEntry) => {
  switch (event.field2) {
    case "1":
      return (
        <div
          key={event.entry_id}
          className="flex items-center p-4 bg-primary/10  border border-primary/40 rounded-lg"
        >
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

    default:
      return (
        <div
          key={event.entry_id}
          className="flex items-center p-4 bg-primary/10  border border-primary/40 rounded-lg"
        >
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
  }
};

interface NotificationProps {
  events: EventsResponse;
}

export const Notification = ({ events }: NotificationProps) => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventEntry[]>([]);

  const eventFilter = (data: EventEntry[]) => {
    switch (id) {
      case "T001":
        return data.filter((value) => value.field1 === "70-3910");

      case "T002":
        return data.filter((value) => value.field1 === "70-3917");

      case "T003":
        return data.filter((value) => value.field1 === "703919");

      default:
        break;
    }
  };

  useEffect(() => {
    const filteredEvents = eventFilter(events.feeds);
    if (filteredEvents) {
      const sortedEvents = filteredEvents.sort((a, b) =>
        dayjs(b.created_at).diff(dayjs(a.created_at))
      );
      setEvent(sortedEvents);
    }
  }, [events]);

  if (!event) {
    return <CircularProgress />;
  }

  return (
    <Card className="glass-card p-6 text-left animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-primary" />
          <p className="text-xl font-medium">Critical Alerts</p>
        </div>
        <div className="flex bg-primary/70 px-2 py-0.5 rounded-2xl text-sm font-medium">
          {event.length}
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
        {event.map((value) => getAlertCard(value))}
      </div>
    </Card>
  );
};
