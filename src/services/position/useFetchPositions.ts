import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPositions = () => {
  return useQuery({
    queryFn: async () => {
      const positionResponse = await axiosInstance.get("/v1/position");
      return positionResponse;
    },
    queryKey: ["fetch.position"],
  });
};
