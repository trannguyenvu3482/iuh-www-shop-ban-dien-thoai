import instance from "./axios/instance";

const BASE_URL = "/auth";
const login = async (email, password) => {
  return await instance.post(`${BASE_URL}/login`, {
    username: email,
    password: password,
  });
};

const logout = async () => {
  return await instance.get(`${BASE_URL}/logout`);
};

const getAccount = async () => {
  return await instance.get(`${BASE_URL}/account`);
};

const getNewToken = async () => {
  return await instance.get(`${BASE_URL}/refresh-token`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer ",
    },
    withCredentials: true,
  });
};

export { getAccount, getNewToken, login, logout };
