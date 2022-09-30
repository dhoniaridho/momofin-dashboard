import { appConfig } from '~/config/app.config'
import cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import router from '~/router'

export class AuthService {
  private static readonly key = appConfig.cookie.storage_key
  static signIn(token: string, remember: boolean) {
    if (remember) {
      cookie.set(this.key, token, {
        expires: 10,
        path: '/',
        secure: appConfig.cookie.secure,
        sameSite: 'strict',
      })
    } else {
      cookie.set(this.key, token, {
        path: '/',
        secure: appConfig.cookie.secure,
        sameSite: 'strict',
      })
    }
  }
  static signOut() {
    cookie.remove(this.key)
    router.push('/login')
  }
  static get token() {
    return cookie.get(this.key)
  }
  private static decodeToken(token: string) {
    const decoded = jwt_decode(token)
    return decoded
  }
}
