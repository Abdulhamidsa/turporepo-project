import { ZodSchema } from "zod";
import axiosInstance from "./axiosClient";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function request<T>(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", url: string, data?: unknown, schema?: ZodSchema<T>): Promise<T> {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>({
      method,
      url,
      data,
    });

    const { success, data: responseData, message } = response.data;

    if (!success) {
      throw new Error(message || "Unknown error occurred");
    }

    if (schema) {
      const parseResult = schema.safeParse(responseData);
      if (!parseResult.success) {
        console.error(parseResult.error);
        throw new Error("API response validation failed");
      }
      return parseResult.data;
    }

    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Extract error message from Axios response if available
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }

    // Log the error and rethrow for debugging purposes
    console.error("Request Error:", error);

    // Rethrow generic error if no specific message is found
    throw error;
  }
}
