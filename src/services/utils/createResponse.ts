// utils/responseUtils.ts
import { Stage } from "../types/stage.type";

export const createResponse = <T>(
  data: T | null,
  status: boolean,
  error: string | null = null
): Stage<T | null> => ({
  loading: false,
  data,
  error,
  status,
});
