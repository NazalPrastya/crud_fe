import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useCreatePerformance = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (response: AxiosResponse<unknown>, variables: unknown) => void;
  onError?: (
    error: AxiosError<{ message?: string }>,
    variables: unknown
  ) => void;
}) => {
  return useMutation({
    mutationFn: async (body) => {
      const performanceResponse = await axiosInstance.post(
        "/v1/performance",
        body
      );

      return performanceResponse;
    },
    onSuccess,
    onError,
  });
};
