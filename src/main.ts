import { createApp } from 'vue'
import 'virtual:svg-icons-register'

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

app.component('Iconify', Icon)

app.mount('#app')
