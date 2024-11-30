import instance from './axios/instance'
const BASE_URL = '/products'

export const getProductById = async (id) => {
  return await instance.get(`${BASE_URL}/${id}`)
}
export const getProductBySlug = async (slug) => {
  return await instance.get(`${BASE_URL}/slug/${slug}`)
}

export const getProducts = async () => {
  return await instance.get('/products')
}

export const getProductsByCategory = async (categoryId) => {
  return await instance.get(`/categories/${categoryId}/products`)
}

export const getProductVariant = async (productId, capacityId, colorId) => {
  return await instance.get(
    `/products/variant/${productId}/${capacityId}/${colorId}`,
  )
}

export const getProductsByNameRelative = async (name) => {
  return await instance.get(`/products`, {
    params: {
      filter: `name~~'${name}'`,
    },
  })
}
