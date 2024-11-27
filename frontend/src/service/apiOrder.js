import instance from "./axios/instance";

const BASE_URL = "/order";
export const createOrder = async (amount, orderInfo) => {
  return await instance.post(`${BASE_URL}`, {
    amount: amount,
    orderInfo: orderInfo,
  });
};
