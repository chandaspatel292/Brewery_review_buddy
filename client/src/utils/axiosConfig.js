// src/utils/axiosConfig.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api",
  /* withCredentials: true, */
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers["x-auth-token"] = token;
  return config;
});

export default axiosInstance;
