// lib/utils/fetchWithErrorHandling.ts
import { ReactElement } from "react";
import Unauthorized401 from "../../components/error/error-401";
import Forbidden403 from "../../components/error/error-403";
import ServerError500 from "@/components/error/error-500";

export async function fetchWithErrorHandling<T>(
  fetchFn: () => Promise<T>,
): Promise<T | ReactElement> {
  try {
    const response = await fetchFn();

    if (
      response &&
      typeof response === "object" &&
      "status" in response &&
      (response as any).status === false
    ) {
      const errorCode = (response as any).error?.code || 500;

      switch (errorCode) {
        case 404:
          return <Unauthorized401 />;
        case 403:
          return <Forbidden403 />;
        case 500:
        default:
          return <ServerError500 />;
      }
    }

    return response;
  } catch {
    return <ServerError500 />;
  }
}
