<script setup lang="ts">
  import { Line, Doughnut } from 'vue-chartjs'
  import { appConfig } from '~/config/app.config'
  import { useDashboardFeature } from '@features/dashboard/dashboard.module'

  const {
    chartData,
    chartDataLines,
    chartOptions,
    chartOptionsLine,
    dataUpdatedAt,
    maxDate,
    filter,
    statistics,
  } = useDashboardFeature()

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
          <n-space>
            <n-form-item label="Rentang waktu">
              <Datepicker
                v-model="filter.range"
                :max-date="maxDate"
                range
                placeholder="Pilih Rentang waktu"
              />
            </n-form-item>
          </n-space>
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
            <n-number-animation :from="0" :to="item.value" />
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
            <n-number-animation
              v-if="typeof item.value == 'number'"
              :from="0"
              :to="item.value"
            />
            <span v-else>{{ item.value }}</span>
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
