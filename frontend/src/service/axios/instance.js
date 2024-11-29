import axios from "axios";
import axiosRetry from "axios-retry";
import { useUserStore } from "../../zustand/userStore";

const BASE_URL = [
  "http://localhost:8080/api/v1",
  "http://192.168.0.114:8080/api/v1",
];

const instance = axios.create({
  baseURL: BASE_URL[1],
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response && response.data ? response.data : response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.data.statusCode === -1 &&
      error.response.status === 401
    ) {
      const setAccessToken = useUserStore.getState().setAccessToken;
      setAccessToken(null);
      const response = await instance.get("/auth/refresh-token");
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + accessToken;
      return instance(originalRequest);
    } else if (
      error.response.data.statusCode === 400 &&
      error.response.data.error == "Bạn không có refresh_token ở cookies"
    ) {
      const logout = useUserStore.getState().logout;
      logout();
      window.location.href = "/login";
    }
    return error && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

axiosRetry(instance, { retries: 3 });

export default instance;
