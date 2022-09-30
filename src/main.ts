import { appConfig } from '~/config/app.config'
import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import '~/assets/css/main.css'

import App from './App.vue'
import { Icon } from '@iconify/vue'

const app = createApp(App)
const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
})
Object.values(modules).forEach((module: any) => {
  app.use((app) => {
    return module?.default(app)
  })
})

if (appConfig.app.mode == 'production') {
  app.config.warnHandler = function () {
    return null
  }
  app.config.errorHandler = () => {
    return
  }
}

app.component('Iconify', Icon)

app.mount('#app')
