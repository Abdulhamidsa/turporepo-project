import axios from "axios";
import axiosInstance from "../utils/axiosConfige";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export const request = async <T, P = undefined>(method: "GET" | "POST", url: string, data?: P): Promise<T> => {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>({
      method,
      url,
      data,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "An unknown error occurred");
    }

    return response.data.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Unexpected error occurred");
    }
    console.error("Unexpected Error:", error);
    throw new Error("An unknown error occurred");
  }
};
