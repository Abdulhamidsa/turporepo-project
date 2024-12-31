// src/api/axiosClient.ts
// import axios, { AxiosError } from "axios";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor for 401
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
