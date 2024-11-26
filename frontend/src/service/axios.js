import axios from 'axios'

const BASE_URL = [
  'http://localhost:8080/api/v1',
  'http://192.168.0.104:8080/api/v1',
]

const instance = axios.create({
  baseURL: BASE_URL[1],
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    console.log()

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
