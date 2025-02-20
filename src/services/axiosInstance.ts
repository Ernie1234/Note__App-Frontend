import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// Intercept requests to add the Bearer token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace with your method to get the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Default export of the axios instance
export default axiosInstance;
