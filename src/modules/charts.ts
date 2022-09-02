import type { App } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const install = (app: App) => {
  return app.use(VueApexCharts)
}

export default install
