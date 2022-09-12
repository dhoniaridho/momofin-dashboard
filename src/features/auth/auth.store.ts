import { http } from '~/modules/http'
import { defineStore } from 'pinia'
import type { ProfileResponse } from './auth.interface'

interface IState {
  user: any
}

const useAuthStore = defineStore('useAuthStore', {
  state: (): IState => ({
    user: {},
  }),
  actions: {
    async getAuthenticatedUser() {
      try {
        const {
          data: { data: response },
        } = await http.get<ProfileResponse.Profile>(`/profile`)
        this.$state.user = response
        return response
      } catch (e) {
        console.error(e)
      }
    },
  },
  getters: {
    getUser(state) {
      return state.user
    },
  },
})

export default useAuthStore
