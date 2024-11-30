import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface EventEntry {
  created_at: string;
  entry_id: number;
  field1: string; // TruckID
  field2: string | null; // Event
}

interface EventChannel {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
}

export interface EventsResponse {
  channel: EventChannel;
  feeds: EventEntry[];
}

const fetchEvents = async (): Promise<EventsResponse> => {
  const { data } = await axios.get(
    "https://api.thingspeak.com/channels/2753402/feeds.json?results=20"
  );
  return data;
};

export const useEvents = () => {
  return useQuery<EventsResponse, Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
