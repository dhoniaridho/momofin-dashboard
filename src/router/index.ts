import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import middleware from './_middleware'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(middleware)

export default router
