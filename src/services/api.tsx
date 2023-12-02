import axios from 'axios'

import { AppError } from '../utils/AppError'

const api = axios.create({
  baseURL: 'http://192.168.0.121:3333/api',
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(new AppError('Internal server error'))
    }
  },
)

export { api }
