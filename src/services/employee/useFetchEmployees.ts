import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchEmployees = () => {
  return useQuery({
    queryFn: async () => {
      const employeeResponse = await axiosInstance.get("/v1/employee");
      return employeeResponse;
    },
    queryKey: ["fetch.employee"],
  });
};
