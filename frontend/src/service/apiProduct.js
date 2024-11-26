import instance from './axios'

export const getProductById = async (id) => {
  return await instance.get(`/products/${id}`)
}

export const getProducts = async () => {
  return await instance.get('/products')
}

