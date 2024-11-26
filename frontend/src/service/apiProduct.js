import instance from './axios'

const BASE_URL = '/products'

export const getProductById = async (id) => {
  return await instance.get(`${BASE_URL}/${id}`)
}
export const getProdyctBySlug = async (slug) => {
  return await instance.get(`${BASE_URL}/slug/${slug}`)
}

export const getProducts = async () => {
  return await instance.get('/products')
}
