import { http } from '~/modules/http'
import { defineStore } from 'pinia'
import type {
  ProfileResponse,
  DomainVerificationResponse,
} from './auth.interface'

interface IState {
  user: any
  isKycVerified: boolean
  company: DomainVerificationResponse.Data
}

const useAuthStore = defineStore('useAuthStore', {
  state: (): IState => ({
    user: {},
    isKycVerified: false,
    company: {
      address: '',
      company_name: '',
      domain: '',
      logo: '',
      nib: '',
    },
  }),
  actions: {
    async getAuthenticatedUser() {
      const { data: response } = await http.get<ProfileResponse.Profile>(
        `/auth/users/profile`
      )
      return response.data
    },
    async fetchKycVerified() {
      const { data: response } = await http.get(`/auth/users/new_kyc_status`)

      if (Array.isArray(response?.data)) {
        const data: any = response?.data[0]
        this.isKycVerified = data.isKyc
      } else {
        this.isKycVerified = false
      }
    },
    async checkDomain() {
      const { data: response } =
        await http.get<DomainVerificationResponse.RootObject>(
          'auth/check_subdomain'
        )
      this.company = response.data
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
