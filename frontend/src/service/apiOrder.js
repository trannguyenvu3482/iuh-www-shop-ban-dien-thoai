import instance from './axios/instance'

const BASE_URL = '/orders'
export const createOrder = async (data) => {
  return await instance.post(`${BASE_URL}`, {
    ...data,
  })
}
