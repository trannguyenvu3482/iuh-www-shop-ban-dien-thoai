import instance from './axios/instance'

const BASE_URL = '/orders'
export const createOrder = async (data) => {
  return await instance.post(`${BASE_URL}`, {
    ...data,
  })
}

export const putOrderStatus = async (id, vnpay) => {
  const status = vnpay == '00' ? 'CONFIRMED' : 'CANCELLED'
  return await instance.put(`${BASE_URL}/${id}`, {
    status,
  })
}

