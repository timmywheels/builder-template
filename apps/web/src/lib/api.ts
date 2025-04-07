import axios from "axios";

// API client with default configurations
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases here (e.g., 401 unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      // If we have a router, we could redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Error response type
export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

// Convert axios error to a consistent format
export const getApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      message: error.response.data?.message || error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
  return {
    message: error instanceof Error ? error.message : "An unknown error occurred",
    status: 500,
  };
};
