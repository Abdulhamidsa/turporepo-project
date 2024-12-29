import axios from "axios";
import { z, ZodSchema } from "zod";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// Helper to handle responses
const handleResponse = <T>(response: { data: ApiResponse<T> }): T => {
  if (!response.data.success) {
    throw new Error(response.data.message || "An unknown error occurred");
  }
  return response.data.data as T; // Safely cast the data to the expected type
};

// Helper to handle Axios errors
const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error details:", error.response?.data);
    const status = error.response?.status;
    if (error.response?.data?.message) {
      throw new Error(`[${status}] ${error.response.data.message}`);
    }
    throw new Error(`[${status}] Unexpected Axios error occurred.`);
  }
  console.error("Non-Axios error:", error);
  throw new Error("An unexpected error occurred.");
};

// Generic request handler

export const request = async <T, P = undefined>(
  method: "GET" | "POST",
  url: string,
  data?: P,
  schema?: ZodSchema<T> // Accept a Zod schema for validation
): Promise<T | undefined> => {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>({
      method,
      url,
      data,
    });

    const parsedData = handleResponse(response);

    // Validate the response data if a schema is provided
    if (schema) {
      const validationResult = schema.safeParse(parsedData);
      if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error);
        throw new Error("Validation failed for the API response.");
      }
      return validationResult.data; // Return validated data
    }

    return parsedData; // If no schema, return as is
  } catch (error) {
    handleAxiosError(error);
    return undefined; // This line is unreachable, but TypeScript requires it
  }
};

// Wrapper fetcher for SWR

export const swrFetcher = async <T>(url: string, schema: z.ZodType<T>, defaultValue: T): Promise<T> => {
  try {
    const response = await request<T>("GET", url);
    const validationResult = schema.safeParse(response);

    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error);
      return defaultValue; // Fallback to defaultValue
    }

    return validationResult.data; // Return validated data
  } catch (error) {
    console.error("Fetcher error:", error);
    return defaultValue; // Return default profile in case of error
  }
};

export class AppError extends Error {
  constructor(
    public message: string,
    public code?: number
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
    if (error.response?.data?.message) {
      return error.response.data.message; // Backend-provided error message
    }
    return `HTTP Error: ${error.response?.statusText || "Unknown error"}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
};

export default axiosInstance;
