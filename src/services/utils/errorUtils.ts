import { AxiosError } from "axios";

interface ErrorResponseData {
  message?: string;
}

export const handleError = (error: any): string => {
  return (
    (error as AxiosError<ErrorResponseData>)?.response?.data?.message ??
    "Error fetching authorities"
  );
};
