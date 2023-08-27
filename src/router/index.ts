import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  routes,
  history: createWebHistory(),
})

const modules = import.meta.glob('../middlewares/*.ts', {
  eager: true,
})
Object.values(modules).forEach((module: any) => {
  return router.beforeEach(module?.default)
})

export default router
