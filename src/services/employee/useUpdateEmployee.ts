import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useUpdateEmployee = ({
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
      const employeeResponse = await axiosInstance.put(
        `/v1/employee/${id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return employeeResponse;
    },
    onSuccess,
    onError,
  });
};
