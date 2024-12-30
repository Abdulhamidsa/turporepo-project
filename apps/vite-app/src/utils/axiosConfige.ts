import axios from "axios";
import { z, ZodSchema } from "zod";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Utility to extract `friendlyId` from the token
export const getFriendlyId = (): string | undefined => {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.error("accessToken is missing from cookies.");
    return undefined;
  }

  try {
    const payload = jwtDecode<{ friendlyId: string }>(token);
    console.log("Decoded Token Payload:", payload); // Debug log
    return payload.friendlyId;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return undefined;
  }
};

// Request interceptor to optionally append `friendlyId` to URLs
axiosInstance.interceptors.request.use(
  (config) => {
    const friendlyId = getFriendlyId();

    if (friendlyId && config.url && config.url.includes("$friendlyId")) {
      config.url = config.url.replace("$friendlyId", friendlyId);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return it
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.warn("Unauthorized: Redirecting to authentication.");
      // Redirect to the login/auth page
      window.location.href = "/auth"; // Adjust this to your auth page route
    }
    return Promise.reject(error); // Let the error propagate
  }
);

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
