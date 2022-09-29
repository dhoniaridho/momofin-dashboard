import { http } from '~/modules/http'
import type {
  ChartLineResponse,
  DashboardResponse,
} from './dashboard.interface'
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

export const getChartLineData = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<ChartLineResponse.RootObject>('dashboard/chart_line', {
    params: {
      ...filter,
    },
  })
  return response
}
