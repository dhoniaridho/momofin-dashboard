import type { ILoginPayload, LoginResponse } from './auth.interface'
import { http } from '~/modules/http'

export class AuthRepository {
  static async login(payload: ILoginPayload) {
    try {
      const {
        data: { data: response },
      } = await http.post<LoginResponse.RootObject>('/login', payload)
      return response
    } catch (error: any) {
      console.log(error)

      return Promise.reject(error.response?.data)
    }
  }
  static async forgotPassword(email: string) {
    const { data: response } = await http.post('auth/forgot-password', {
      email,
    })
    if (!response.success) return Promise.reject(response)
    return Promise.resolve(response)
  }
}
