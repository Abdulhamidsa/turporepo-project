import axios from "axios";

export class AppError extends Error {
  constructor(
    public message: string,
    public code?: string | number
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;
    if (backendMessage) {
      return `[${status}] ${backendMessage}`;
    }
    return `HTTP Error: ${error.response?.statusText || "Unknown error"}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
};
