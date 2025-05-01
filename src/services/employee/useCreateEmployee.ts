import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useCreateEmployee = ({
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
      const employeeResponse = await axiosInstance.post("/v1/employee", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return employeeResponse;
    },
    onSuccess,
    onError,
  });
};
