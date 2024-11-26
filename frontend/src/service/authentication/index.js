import instance from '../axios'

const BASE_URL = '/auth'
const login = async (email, password) => {
  return await instance.post(`${BASE_URL}/login`, {
    username: email,
    password: password,
  })
}

const logout = async () => {
  return await instance.get(`${BASE_URL}/logout`)
}
const getAccount = async () => {
  return await instance.get(`${BASE_URL}/account`)
}

export { login, logout, getAccount }
