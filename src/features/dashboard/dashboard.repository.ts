import { DateTime } from 'luxon'
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
      period:
        filter.period ||
        [0, DateTime.now().plus({ day: 1 }).toMillis()].join(','),
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
