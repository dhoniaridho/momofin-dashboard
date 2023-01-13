import type { App } from 'vue'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      mutations: {},
    },
  },
}

const install = (app: App) => {
  app.use(VueQueryPlugin, vueQueryPluginOptions)
}

export default install
