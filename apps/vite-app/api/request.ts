// src/api/request.ts
import { ZodSchema } from "zod";
import axiosInstance from "./axiosClient";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function request<T>(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", url: string, data?: unknown, schema?: ZodSchema<T>): Promise<T> {
  const response = await axiosInstance.request<ApiResponse<T>>({ method, url, data });
  const { success, data: responseData, message } = response.data;

  if (!success) {
    throw new Error(message || "Unknown error");
  }

  if (schema) {
    const parseResult = schema.safeParse(responseData);
    if (!parseResult.success) {
      console.error("Zod Validation Error:", parseResult.error);
      throw new Error("API response validation failed");
    }
    return parseResult.data;
  }

  return responseData;
}
