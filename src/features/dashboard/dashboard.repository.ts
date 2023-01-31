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
      period: filter.period
        ? [
            +filter.period.split(',')[0] / 1000,
            +filter.period.split(',')[1] / 1000,
          ].join(',')
        : '',
    },
  })
  return response
}

export const getChartLineData = async (filter: any) => {
  const {
    data: { data: response },
  } = await http.get<ChartLineResponse.RootObject>('dashboard/chart-line', {
    params: {
      ...filter,
    },
  })
  return response
}
