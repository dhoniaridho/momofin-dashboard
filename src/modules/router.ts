import type { App } from 'vue'
import router from '~/router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const install = (app: App) => {
  router.beforeResolve((to, from, next) => {
    Nprogress.start()
    next()
  })

  router.afterEach(() => {
    Nprogress.done()
  })
  return app.use(router)
}

export default install
