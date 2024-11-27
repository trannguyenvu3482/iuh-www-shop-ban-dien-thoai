import axios from "axios";
import { useUserStore } from "../../zustand/userStore";
import { getNewToken } from "../apiAuthentication";
const BASE_URL = [
  "http://localhost:8080/api/v1",
  "http://192.168.0.104:8080/api/v1",
];

const instance = axios.create({
  baseURL: BASE_URL[0],
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().accessToken;

    console.log(config.headers["Authorization"]);

    if (config.headers["Authorization"] !== "Bearer ") {
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
    if (error.response.data && error.response.data.statusCode === -1) {
      try {
        const { data } = await getNewToken();

        const accessToken = data.access_token;
        const setAccessToken = useUserStore.getState().setAccessToken;
        setAccessToken(accessToken);

        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;

        return instance(error.config);
      } catch (error) {
        window.location.href = "/login";
      }
    }

    console.log(error.response.data);

    return error && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
