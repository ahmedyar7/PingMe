import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://localhost:8000/api/v1" ||
    `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/v1`,
  withCredentials: true,
});

export { axiosInstance };
