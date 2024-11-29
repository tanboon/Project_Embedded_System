import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface FeedEntry {
  created_at: string;
  entry_id: number;
  field1: string;
}

interface Channel {
  created_at: string;
  field1: string;
  id: number;
  last_entry_id: number;
  latitude: string;
  longitude: string;
  name: string;
  updated_at: string;
}

export interface FuelsResponse {
  channel: Channel;
  feeds: FeedEntry[];
}

const endpoint: string[] = [
  "https://api.thingspeak.com/channels/2754419/feeds.json?results=10",
  "https://api.thingspeak.com/channels/2754422/feeds.json?results=10",
  "https://api.thingspeak.com/channels/2754423/feeds.json?results=10",
];

export const useFuel = (index: number) => {
  const fetchFuels = async (): Promise<FuelsResponse> => {
    const { data } = await axios.get(endpoint[index]);
    return data;
  };

  return useQuery<FuelsResponse, Error>({
    queryKey: ["fuels", index],
    queryFn: fetchFuels,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
