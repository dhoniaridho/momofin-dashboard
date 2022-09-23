import type { App } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const install = (app: App) => {
  return app.component('Datepicker', Datepicker)
}

export default install
