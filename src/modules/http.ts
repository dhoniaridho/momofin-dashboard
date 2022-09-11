import { AuthService } from './../features/auth/auth.service'
import axios from 'axios'
import type { App } from 'vue'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    token: AuthService.token,
  },
})

export const install = (app: App) => {
  app.provide('http', http)
}
export default install
