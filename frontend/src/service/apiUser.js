import instance from './axios/instance'

const BASE_URL = '/users'
const editUser = async (id, data) => {
  return await instance.put(`${BASE_URL}/${id}`, data)
}
const addUser = async (data) => {
  return await instance.post(`${BASE_URL}`, data)
}
const getUsers = async () => {
  return await instance.get(`${BASE_URL}`)
}
const getUser = async (id) => {
  return await instance.get(`${BASE_URL}/${id}`)
}

export const getOrdersByUser = async (id, sort = '', filter = '') => {
  return await instance.get(`${BASE_URL}/${id}/orders`, {
    params: {
      filter: filter,
      sort: sort,
    },
  })
}

export { addUser, editUser, getUser, getUsers }
