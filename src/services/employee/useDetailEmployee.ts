import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useDetailEmployee = ({ id }: { id: string }) => {
  return useQuery({
    queryFn: async () => {
      const employeeResponse = await axiosInstance.get(`/v1/employee/${id}`);
      return employeeResponse;
    },
    queryKey: ["fetch.employee", id],
  });
};
