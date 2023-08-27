import { http } from '~/modules/http'
import { defineStore } from 'pinia'
import type { ProfileResponse } from './auth.interface'

interface IState {
  user?: {
    role: string
    _id: string
    firstName: string
    lastName: string
    email: string
    fullName: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

const useAuthStore = defineStore('useAuthStore', {
  state: (): IState => ({
    user: undefined,
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
