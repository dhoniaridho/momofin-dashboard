import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

export const isDark = useDark({
  storageKey: 'theme',
})

export const useTheme = defineStore('theme', {
  actions: {
    setTheme(theme: string) {
      isDark.value = theme == 'dark' ? true : false
    },
    toggleTheme() {
      this.setTheme(isDark.value ? 'light' : 'dark')
    },
  },
  getters: {
    currentTheme() {
      return isDark.value
    },
  },
})
