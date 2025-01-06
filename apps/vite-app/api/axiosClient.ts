import axios from "axios";
const IGNORED_ENDPOINTS = ["/internal/logged-user"];

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies with requests
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const isIgnoredEndpoint = IGNORED_ENDPOINTS.some((endpoint) => error.config?.url?.includes(endpoint));
      if (!isIgnoredEndpoint) {
        console.warn("Unauthorized: Redirecting to authentication.");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
