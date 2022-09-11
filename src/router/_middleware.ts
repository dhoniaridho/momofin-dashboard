import { AuthService } from '~/features/auth/auth.service'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default function middleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const AUTHENTICATED = AuthService.token
  if (to.path == '/logout') {
    AuthService.signOut()
    next({ name: 'login' })
  }
  if (to.meta.requiresAuth) {
    if (!AUTHENTICATED) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (!to.meta.requiresAuth && AUTHENTICATED) {
      next()
    } else {
      logoutMiddleware(to, from, next)
    }
  }
}

function logoutMiddleware(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (to.path == '/logout') {
    AuthService.signOut()
    next({ name: 'login' })
  } else {
    next()
  }
}
