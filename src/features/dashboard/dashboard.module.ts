import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  type ChartData,
  ArcElement,
  type ChartOptions,
} from 'chart.js'
import { useQuery } from '@tanstack/vue-query'
import { getDashboardData } from '@features/dashboard/dashboard.repository'
import { toIdr } from '~/helpers'

export function useDashboardFeature() {
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    ArcElement
  )

  const filter = ref({
    period: '',
  })

  function useDashboard() {
    return useQuery(
      ['dashboard', filter],
      () => {
        return getDashboardData(filter.value)
      },
      {
        refetchInterval: 30000,
        onSuccess(data) {
          chartData.value.labels = data.products.sales.map((item) => item.name)
        },
      }
    )
  }

  // function useChartLine() {
  //   return useQuery(['line', filter], () => {
  //     return getChartLineData({
  //       period: [
  //         DateTime.now().minus({ month: 1 }).toMillis(),
  //         DateTime.now().toMillis(),
  //       ].join(','),
  //     })
  //   })
  // }

  const { data: dashboard, dataUpdatedAt } = useDashboard()
  // const { data: chartLine } = useChartLine()

  const chartDataLines = computed(() => {
    return {
      labels: dashboard.value?.chartLine.documentUploaded.map(
        (line) => line.date
      ),
      datasets: [
        {
          label: 'Registrasi',
          borderColor: '#0067D6',
          backgroundColor: '#0067D6',
          data: dashboard.value?.chartLine?.registration.map(
            (registration) => registration.total
          ),
        },
        {
          label: 'Verifikasi',
          borderColor: '#008060',
          backgroundColor: '#008060',
          data: dashboard.value?.chartLine?.verification.map(
            (verification) => verification.total
          ),
        },
        {
          label: 'Transaction',
          borderColor: '#D03E34',
          backgroundColor: '#D03E34',
          data: dashboard.value?.chartLine?.transactions.map(
            (transaction) => transaction.total
          ),
        },
        {
          label: 'Meterai Used',
          borderColor: '#51B2C9',
          backgroundColor: '#51B2C9',
          data: dashboard.value?.chartLine?.emetUsages.map(
            (emet) => emet.total
          ),
        },
        {
          label: 'Documents Uploaded',
          borderColor: '#E4762F',
          backgroundColor: '#E4762F',
          data:
            dashboard.value?.chartLine?.documentUploaded.map(
              (doc) => doc.total
            ) ?? [],
        },
      ],
    }
  })

  const chartData = computed<ChartData>(() => {
    return {
      labels: dashboard.value?.products.sales.map((item) => {
        const name = [...item.name]
        return name
          .map((item, index) => {
            if (index == 0) return item.toUpperCase()
            return item
          })
          .join('')
      }),
      datasets: [
        {
          backgroundColor: [
            '#0067D6',
            '#51B2C9',
            '#DD3093',
            '#E4762F',
            '#F2AC3C',
            '#88B252',
            '#008060',
          ],
          borderColor: [
            '#0067D6',
            '#51B2C9',
            '#DD3093',
            '#E4762F',
            '#F2AC3C',
            '#88B252',
            '#008060',
          ],
          data: dashboard.value?.products?.sales.map(
            (item) => item.percentage
          ) as number[],
        },
      ],
    }
  })

  const chartOptionsLine: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: (data) => {
            return `${data.label}: ( ${
              dashboard.value?.products?.sales[data.dataIndex].sales
            } ) ${Math.round(+data.formattedValue)}%`
          },
        },
      },
    },
  }

  const statistics = computed(() => {
    return [
      {
        label: 'Registrasi',
        value: dashboard.value?.users.new_register,
      },
      {
        label: 'Verifikasi',
        value: dashboard.value?.users.verified_user,
      },
      {
        label: 'e-KYC',
        value: dashboard.value?.users.ekyc_user,
      },
      {
        label: 'Users with Full First Cycle (Sign/Met)',
        value: dashboard.value?.users.first_full_cycle,
      },
      {
        label: 'In App Review',
        value: dashboard.value?.reviews.count,
      },
      {
        label: 'Number of Top-up',
        value: dashboard.value?.topup.topup_count,
      },
      {
        label: 'Meterai Used',
        value: dashboard.value?.token.emet_used,
      },
      {
        label: 'PERURI Sign Used',
        value: dashboard.value?.token.esgn_used,
      },
      {
        label: 'Documents Uploaded',
        value: dashboard.value?.documents.uploaded,
      },
      {
        label: 'Documents Completed',
        value: dashboard.value?.documents.completed,
      },
      {
        label: 'Number of Paid Topup',
        value: dashboard.value?.topup.paid_topup_count,
      },
      {
        label: 'Total Top Up Value',
        value: toIdr(dashboard.value?.topup.paid_topup_value ?? 0),
      },
      {
        label: 'Unique User Top Up',
        value: dashboard.value?.topup.paid_unique_user,
        colspan: 4,
      },
    ]
  })

  const maxDate = computed(() => {
    return new Date()
  })

  return {
    maxDate,
    statistics,
    chartOptions,
    chartOptionsLine,
    chartData,
    chartDataLines,
    dataUpdatedAt,
    filter,
  }
}
