import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Unified interface for processed data
interface ProcessedLocationsResponse {
  V1: number;
  V2: number;
  V3: number;
  V4: number;
  V5: number;
  V6: number;
  V7: number;
  V8: number;
  V9: number;
}

export const useLocations = () => {
  const fetchLocations = async (): Promise<ProcessedLocationsResponse> => {
    const { data } = await axios.get(
      "https://blynk.cloud/external/api/get?token=d4N5NP2Ewo233kS38s5SaPgaW0K2FL1R&V1&V2&V3&V4&V5&V6&V7&V8&V9"
    );
    return data;
  };

  return useQuery<ProcessedLocationsResponse, Error>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
