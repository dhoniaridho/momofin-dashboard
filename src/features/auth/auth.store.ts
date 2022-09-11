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
      const { data: response } = await http.get<ProfileResponse.Profile>(
        `/profile`
      )
      return response.data
    },
  },
  getters: {
    getUser(state) {
      return state.user
    },
  },
})

export default useAuthStore
