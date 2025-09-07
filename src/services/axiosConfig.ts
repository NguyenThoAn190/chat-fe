import axios from "axios";
import applyRequestInterceptor from "./interceptors/request.interceptor";
import applyResponseInterceptor from "./interceptors/response.interceptor";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
applyRequestInterceptor(apiClient);
applyResponseInterceptor(apiClient);

export default apiClient;
