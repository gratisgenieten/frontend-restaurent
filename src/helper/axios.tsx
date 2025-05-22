// lib/axios.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const baseURL: string =
  process.env.NEXT_PUBLIC_API_URL || "https://api.gratisgenieten.nl/api/vi/";

const service = axios.create({
  baseURL,
  // Optional: timeout can be added
  // timeout: 10000,
});

// Request Interceptor
service.interceptors.request.use(
  (config: any): any => {
    if (typeof window !== "undefined") {
      const authToken = Cookies.get("token");
      if (authToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${authToken}`,
        };
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: any): Promise<AxiosError> => {
    if (typeof window !== "undefined") {
      const message = error?.response?.data?.message;
      if (message === "Unauthenticated.") {
        Cookies.remove("token");
        console.warn("🔒 Token removed due to unauthenticated response.")
      }
    }

    return Promise.reject(error);
  }
);

export default service;
