import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useDeletePerformance = ({
  onSuccess,
}: {
  id: string;
  onSuccess?: (response: AxiosResponse<unknown>, variables: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async (id) => {
      const performanceResponse = await axiosInstance.delete(
        `/v1/performance/${id}`
      );

      return performanceResponse;
    },
    onSuccess: (response, variables) => {
      onSuccess?.(response, variables);
    },
  });
};
