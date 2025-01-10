// import axiosInstance from "./axiosClient";
// import { ZodSchema } from "zod";

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export async function request<T>(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", url: string, data?: unknown, schema?: ZodSchema<T>): Promise<T> {
//   try {
//     const response = await axiosInstance.request<ApiResponse<T>>({
//       method,
//       url,
//       data,
//     });

//     const { success, data: responseData, message } = response.data;

//     if (!success) {
//       throw new Error(message || "Unknown error occurred");
//     }

//     if (schema) {
//       const parseResult = schema.safeParse(responseData);
//       if (!parseResult.success) {
//         console.error(parseResult.error);
//         throw new Error("API response validation failed");
//       }
//       return parseResult.data;
//     }

//     return responseData;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     if (error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     }
//     // console.error("Request Error:", error);
//     throw error;
//   }
// }

// src/utils/request.ts
import axios from "axios";
import { ZodSchema } from "zod";
import axiosInstance from "./axiosClient";
import { AppError } from "./errors";

/** Expected shape of your API responses */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * A generic request function that:
 *  - uses `axiosInstance` for requests
 *  - checks for `{ success: boolean, data, message }`
 *  - optionally validates `data` using a Zod schema
 *  - throws `AppError` if anything goes wrong
 */
export async function request<T>(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", url: string, data?: unknown, schema?: ZodSchema<T>): Promise<T> {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>({
      method,
      url,
      data,
    });

    const { success, data: responseData, message } = response.data;

    // If the API returned success=false, we treat it as an error
    if (!success) {
      throw new AppError(message || "Unknown error occurred", response.status);
    }

    // If we have a Zod schema, validate the response data
    if (schema) {
      const parseResult = schema.safeParse(responseData);
      if (!parseResult.success) {
        console.error("Zod validation error:", parseResult.error);
        throw new AppError("API response validation failed", response.status);
      }
      return parseResult.data;
    }

    return responseData;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // If it’s an AxiosError, transform it into an AppError
    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message || "Something went wrong";
      const status = error.response?.status;
      throw new AppError(backendMessage, status);
    }

    // If it’s already an AppError, just rethrow
    if (error instanceof AppError) {
      throw error;
    }

    // Otherwise, wrap in a generic AppError
    throw new AppError(error.message || "An unknown error occurred");
  }
}
