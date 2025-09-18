import axios from "axios";

// Create axios instance with base URL and JWT support
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django backend API base
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
