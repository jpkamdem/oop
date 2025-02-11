export type SuccessResponse<T> = {
  error: null;
  code: number;
  data: T;
};
