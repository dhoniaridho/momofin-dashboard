import { http } from '~/modules/http'
import type { DashboardResponse } from './dashboard.interface'
export const getDashboardData = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<DashboardResponse.RootObject>('dashboard', {
    params: {
      ...filter,
    },
  })
  return response
}
