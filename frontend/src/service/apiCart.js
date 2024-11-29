import instance from './axios/instance'

const BASE_URL = '/cart'

export const putToggleCartItem = async (
  productId,
  productVariantId,
  quantity,
  type,
) => {
  return await instance.put(`${BASE_URL}/${type}`, {
    productId,
    productVariantId,
    quantity,
  })
}

export const deleteCartItem = async (productId, productVariantId) => {
  return await instance.delete(
    `${BASE_URL}/delete?productId=${productId}&productVariantId=${productVariantId}`,
  )
}

export const getCart = async () => {
  return await instance.get(`${BASE_URL}`)
}

// export const deleteCartItem = async (productId, productVariantId) => {
//   return await instance.delete(`${BASE_URL}/${productId}/${productVariantId}`);
// };
