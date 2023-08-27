import type { App } from 'vue'
import { abilitiesPlugin } from '@casl/vue'
import { defineAbility } from '@casl/ability'

export const ability = defineAbility(() => {
  // can('manage', 'all')
})

const install = (app: App) => {
  return app.use(abilitiesPlugin, ability)
}

export default install
