export type Stage<T = any> = {
  loading: boolean;
  data: T | null;
  error: string | null;
  status: boolean;
};
