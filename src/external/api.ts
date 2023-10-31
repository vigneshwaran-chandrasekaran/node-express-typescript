import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: "https://api.example.com", // Your API's base URL
  timeout: 5000, // Request timeout in milliseconds
});

// Request interceptor (e.g., for adding headers)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Modify the request config as needed (e.g., add headers)
    config.headers["Authorization"] = "Bearer your-token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (e.g., for handling errors globally)
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data as needed
    return response;
  },
  (error) => {
    // Handle and log errors globally
    console.error("Request failed:", error);
    return Promise.reject(error);
  }
);

export default api;
