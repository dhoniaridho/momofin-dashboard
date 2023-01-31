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
    filter,
    statistics,
    isLoading,
  } = useDashboardFeature()

  useHead({
    title: `Dashboard - ${appConfig.app.name}`,
  })
</script>

<template>
  <n-space vertical style="gap: 2rem">
    <n-page-header>
      <template #title>
        <n-h2> Dashboard </n-h2>
      </template>
      <template #extra>
        <n-form label-placement="left">
          <n-space justify="end" align="end" vertical>
            <div class="filter__search">
              <m-datatable-filter v-model="filter.period" />
            </div>
          </n-space>
        </n-form>
      </template>
    </n-page-header>

    <n-space justify="end">
      <n-text v-if="!!dataUpdatedAt">
        Terakhir di update <n-time :time="dataUpdatedAt"> </n-time
      ></n-text>
    </n-space>

    <n-grid cols="1 400:1 600:2" :x-gap="40" :y-gap="30">
      <n-grid-item>
        <Line
          :chart-data="(chartDataLines as any)"
          :chart-options="chartOptionsLine"
        />
      </n-grid-item>
      <n-grid-item class="filter__search_sm">
        <div>
          <m-datatable-filter v-model="filter.period" />
        </div>
      </n-grid-item>
      <n-grid-item>
        <n-spin :show="isLoading">
          <Doughnut
            :chart-data="(chartData as any)"
            :chart-options="chartOptions"
          />
        </n-spin>
      </n-grid-item>
    </n-grid>
    <n-spin :show="isLoading">
      <n-space vertical style="gap: 20px">
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
                <n-number-animation
                  :from="0"
                  :to="parseInt(item.value?.toString() ?? '0')"
                />
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
    </n-spin>
  </n-space>
</template>

<style scoped lang="postcss">
  .filter__search {
    @apply w-full md:w-fit hidden sm:block;
  }
  .filter__search_sm {
    @apply w-full md:w-fit block sm:hidden;
  }
</style>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
