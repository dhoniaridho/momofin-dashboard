import { defineStore } from 'pinia'
import { appConfig } from '~/config/app.config'

interface IState {
  theme: 'dark' | 'light'
}

export const useConfig = defineStore('useConfig', {
  state: (): IState => ({
    ...appConfig,
    theme: 'light',
  }),
  actions: {
    themeToggle() {
      this.$state.theme = this.$state.theme == 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', this.$state.theme)
    },
  },
  getters: {
    getTheme(state) {
      return state.theme
    },
  },
})
