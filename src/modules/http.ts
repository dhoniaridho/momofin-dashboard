import { AuthService } from '~/features/auth/auth.service'
import axios from 'axios'
import type { App } from 'vue'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    const token = AuthService.token
    if (token && config.headers) {
      config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const install = (app: App) => {
  app.provide('http', http)
}
export default install
