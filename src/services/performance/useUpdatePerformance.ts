import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useUpdatePerformance = ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess?: (response: AxiosResponse<unknown>, variables: unknown) => void;
  onError?: (
    error: AxiosError<{ message?: string }>,
    variables: unknown
  ) => void;
}) => {
  return useMutation({
    mutationFn: async (body) => {
      const performanceResponse = await axiosInstance.put(
        `/v1/performance/${id}`,
        body
      );

      return performanceResponse;
    },
    onSuccess,
    onError,
  });
};
