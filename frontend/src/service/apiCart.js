import instance from "./axios/instance";

const BASE_URL = "/cart";

export const increaseCartItem = async (productId, productVariantId) => {
  return await instance.post(`${BASE_URL}/increase`, {
    productId,
    productVariantId,
  });
};

export const decreaseCartItem = async (productId, productVariantId) => {
  return await instance.post(`${BASE_URL}/decrease`, {
    productId,
    productVariantId,
  });
};

export const getCart = async () => {
  return await instance.get(`${BASE_URL}`);
};

// export const deleteCartItem = async (productId, productVariantId) => {
//   return await instance.delete(`${BASE_URL}/${productId}/${productVariantId}`);
// };
