// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // Interceptor to handle unauthorized responses
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (axios.isAxiosError(error) && error.response?.status === 401) {
//       console.warn("Unauthorized: Redirecting to authentication.");
//       window.location.href = "/auth"; // Adjust this to your auth page route
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
