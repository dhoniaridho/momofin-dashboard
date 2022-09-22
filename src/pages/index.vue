<script setup lang="ts">
  import { Line, Doughnut } from 'vue-chartjs'

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
  import { useQuery } from 'vue-query'
  import { getDashboardData } from '@features/dashboard/dashboard.repository'
  import { toIdr } from '~/helpers'
  import { appConfig } from '~/config/app.config'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { useTheme } from '~/store/theme'

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
    range: [Date.now(), Date.now()],
  })

  const theme = useTheme()

  const filterComputed = computed(() => {
    return {
      start_date: filter.value.range[0],
      end_date: filter.value.range[1],
    }
  })

  function useDashboard() {
    return useQuery(
      ['dashboard', filter],
      () => {
        return getDashboardData(filterComputed.value)
      },
      {
        refetchInterval: 30000,
        onSuccess(data) {
          chartData.value.labels = data.products.sales.map((item) => item.name)
        },
      }
    )
  }

  const { data: dashboard, dataUpdatedAt } = useDashboard()

  const chartDataLines = computed<ChartData>(() => {
    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Registrasi',
          borderColor: '#0067D6',
          backgroundColor: '#0067D6',
          data: [dashboard.value?.users.new_register as number],
        },
        {
          label: 'Verifikasi',
          borderColor: '#008060',
          backgroundColor: '#008060',
          data: [dashboard.value?.users.verified_user as number],
        },
        {
          label: 'Transaction',
          borderColor: '#D03E34',
          backgroundColor: '#D03E34',
          data: [dashboard.value?.products.total_sales as number],
        },
        {
          label: 'Meterai Used',
          borderColor: '#51B2C9',
          backgroundColor: '#51B2C9',
          data: [dashboard.value?.token.emet_used as number],
        },
        {
          label: 'Documents Uploaded',
          borderColor: '#E4762F',
          backgroundColor: '#E4762F',
          data: [dashboard.value?.documents.doc_uploaded as number],
        },
      ],
    }
  })

  const chartData = computed<ChartData>(() => {
    return {
      labels: dashboard.value?.products.sales.map((item) => {
        return item.name
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
        value: dashboard.value?.documents.doc_uploaded,
      },
      {
        label: 'Documents Completed',
        value: dashboard.value?.documents.doc_completed,
      },
      {
        label: 'Number of Paid Topup',
        value: dashboard.value?.topup.topup_count,
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

  useHead({
    title: `Dashboard - ${appConfig.app.name}`,
  })
</script>

<template>
  <n-space vertical style="gap: 3rem">
    <n-page-header>
      <template #title>
        <n-h2> Dashboard </n-h2>
      </template>
      <template #extra>
        <n-form label-placement="left">
          <n-form-item label="Rentang waktu" path="textareaValue">
            <Datepicker
              v-model="filter.range"
              :max-date="maxDate"
              range
              :dark="theme.currentTheme"
              placeholder="Pilih Rentang waktu"
            ></Datepicker>
          </n-form-item>
          <n-space justify="end">
            <n-text v-if="dataUpdatedAt">
              Terakhir di update <n-time :time="dataUpdatedAt"> </n-time
            ></n-text>
          </n-space>
        </n-form>
      </template>
    </n-page-header>

    <n-grid cols="1 400:1 600:2" :x-gap="40">
      <n-grid-item>
        <Line
          :chart-data="(chartDataLines as any)"
          :chart-options="chartOptionsLine"
        />
      </n-grid-item>
      <n-grid-item>
        <Doughnut
          :chart-data="(chartData as any)"
          :chart-options="chartOptions"
        />
      </n-grid-item>
    </n-grid>
    <n-grid cols="1 500:2 900:5" :x-gap="20" :y-gap="20">
      <n-grid-item
        v-for="item in statistics.slice(0, 10)"
        :key="item.label"
        :span="item?.colspan"
        align="self-stretch"
      >
        <n-card
          style="text-align: center; height: 100%"
          :title="item.label"
          hoverable
        >
          <n-h5>
            {{ item.value }}
          </n-h5>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-grid cols="1 500:2 900:3" :x-gap="20" :y-gap="20">
      <n-grid-item
        v-for="item in statistics.slice(10, statistics.length)"
        :key="item.label"
      >
        <n-card style="text-align: center" :title="item.label" hoverable>
          <n-h5>
            {{ item.value }}
          </n-h5>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
