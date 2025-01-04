import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cre8ify-backend-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
