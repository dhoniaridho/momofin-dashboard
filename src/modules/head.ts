import { createHead } from '@vueuse/head'
import type { App } from 'vue'

const install = (app: App) => {
  const head = createHead()
  return app.use(head)
}

export default install
