import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");
//       try {
//         const { data } = await axiosInstance.post("/auth/refresh-token", {
//           token: refreshToken,
//         });
//         localStorage.setItem("token", data.accessToken);
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Handle token refresh error (e.g., redirect to login)
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
