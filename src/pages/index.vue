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

  const chartDataLines: ChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Registrasi',
        borderColor: '#0067D6',
        backgroundColor: '#0067D6',
        data: [90, 430, 90, 40, 430, 80, 400],
      },
      {
        label: 'Verifikasi',
        borderColor: '#008060',
        backgroundColor: '#008060',
        data: [60, 430, 90, 40, 400, 80, 40],
      },
      {
        label: 'Transaction',
        borderColor: '#D03E34',
        backgroundColor: '#D03E34',
        data: [300, 430, 400, 40, 430, 80, 40],
      },
      {
        label: 'Meterai Used',
        borderColor: '#51B2C9',
        backgroundColor: '#51B2C9',
        data: [40, 430, 330, 200, 430, 80, 40],
      },
      {
        label: 'Documents Uploaded',
        borderColor: '#E4762F',
        backgroundColor: '#E4762F',
        data: [40, 430, 90, 400, 39, 80, 40],
      },
    ],
  }

  const chartData: ChartData = {
    labels: [
      'EMET 5',
      'BUNDLING 5',
      'ESGN 10',
      'ESGN 10',
      'BUNDLING 1',
      'BUNDLING 10',
      'Lainnya',
    ],
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
        data: [90, 430, 90, 40, 430, 80, 400],
      },
    ],
  }

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

  const statistics = [
    {
      label: 'Registrasi',
      value: 100,
    },
    {
      label: 'Verifikasi',
      value: 80,
    },
    {
      label: 'e-KYC',
      value: 50,
    },
    {
      label: 'Users with Full First Cycle (Sign/Met)',
      value: 122,
    },
    {
      label: 'In App Review',
      value: 63,
    },
    {
      label: 'Number of Transaction',
      value: 72,
    },
    {
      label: 'Meterai Used',
      value: 21,
    },
    {
      label: 'PERURI Sign Used',
      value: 194,
    },
    {
      label: 'Documents Uploaded',
      value: 39,
    },
    {
      label: 'Documents Completed',
      value: 28,
    },
    {
      label: 'Jumlah Top Up',
      value: 72,
    },
    {
      label: 'Total Top Up Value',
      value: 21,
    },
    {
      label: 'Unique User Top Up',
      value: 194,
      colspan: 4,
    },
  ]
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
            <n-date-picker
              type="datetimerange"
              :default-value="[Date.now(), Date.now()]"
              clearable
              default-time="16:00:00"
            />
          </n-form-item>
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
    <n-grid cols="1 500:2 900:4" :x-gap="20" :y-gap="20">
      <n-grid-item
        v-for="item in statistics"
        :key="item.label"
        :span="item?.colspan"
      >
        <n-card style="text-align: center" :title="item.label" hoverable>
          {{ item.value }}
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>
