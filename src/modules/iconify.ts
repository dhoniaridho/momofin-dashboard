import { Icon } from '@iconify/vue'
import type { App } from 'vue'

const install = (app: App) => {
  return app.component('Icon', Icon)
}

export default install
