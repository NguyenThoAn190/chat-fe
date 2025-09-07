import { AxiosInstance, AxiosError } from "axios";

interface ErrorResponseData {
  message?: string;
}

const applyResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponseData>) => {
      if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data?.message ?? "Unknown error occurred";
        console.error(`HTTP Error: ${status} - ${errorMessage}`);
        const errorMessages: Record<number, string> = {
          401: "Unauthorized - Please log in to access this resource.",
          403: "Access Forbidden - You do not have permission to access this resource.",
          404: "Not Found - The requested resource could not be found.",
          408: "Request Timeout - The server took too long to respond.",
          500: "Internal Server Error - Please try again later or contact support.",
          503: "Service Unavailable - The server is currently unable to handle the request.",
        };

        const customMessage = errorMessages[status];
        if (customMessage) {
          return Promise.reject(new Error(customMessage));
        }
      }

      return Promise.reject(error);
    }
  );
};

export default applyResponseInterceptor;
