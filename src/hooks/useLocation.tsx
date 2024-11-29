import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Unified interface for processed data
interface ProcessedLocationResponse {
  V1: number;
  V2: number;
  V3: number;
}

const endpoint: string[] = [
  "https://blynk.cloud/external/api/get?token=d4N5NP2Ewo233kS38s5SaPgaW0K2FL1R&V1&V2&V3",
  "https://blynk.cloud/external/api/get?token=d4N5NP2Ewo233kS38s5SaPgaW0K2FL1R&V4&V5&V6",
  "https://blynk.cloud/external/api/get?token=d4N5NP2Ewo233kS38s5SaPgaW0K2FL1R&V7&V8&V9",
];

export const useLocation = (index: number) => {
  const fetchLocation = async (): Promise<ProcessedLocationResponse> => {
    const { data } = await axios.get(endpoint[index]);
    let processedData: ProcessedLocationResponse;
    switch (index) {
      case 1:
        processedData = { V1: data.V4, V2: data.V5, V3: data.V6 };
        break;
      case 2:
        processedData = { V1: data.V7, V2: data.V8, V3: data.V9 };
        break;
      default:
        processedData = { V1: data.V1, V2: data.V2, V3: data.V3 };
        break;
    }
    return processedData;
  };

  return useQuery<ProcessedLocationResponse, Error>({
    queryKey: ["location", index],
    queryFn: fetchLocation,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
