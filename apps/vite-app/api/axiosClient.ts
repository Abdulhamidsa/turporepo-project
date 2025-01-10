import axios from "axios";
import { BASE_URL } from "@repo/api/endpoints";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // to include cookies with requests
});
// const IGNORED_ENDPOINTS = ["/logged-user"];
export default axiosInstance;
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (axios.isAxiosError(error) && error.response?.status === 401) {
//       const isIgnoredEndpoint = IGNORED_ENDPOINTS.some((endpoint) => error.config?.url?.includes(endpoint));
//       if (!isIgnoredEndpoint) {
//         console.warn("Unauthorized: Redirecting to authentication.");
//         window.location.href = "/auth";
//       }
//     }
//     return Promise.reject(error);
//   }
// );
