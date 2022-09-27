<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
  import { startOfDay } from 'date-fns'
  import { DateTime } from 'luxon'

  const showPopover = ref(false)
  const dropdownValue = ref('')
  const activeValue = ref('')
  const dateRange = ref([Date.now(), Date.now()])
  const timeFrom = ref(Date.now())
  const timeEnd = ref(Date.now())

  const d = 86400000

  const dateStart = computed(() => dateRange.value[0])
  const dateEnd = computed(() => dateRange.value[1])

  const formatDate = (dt: number, tm: number) => {
    const date = DateTime.fromMillis(dt).toFormat('yyyy-MM-dd')
    const time = DateTime.fromMillis(tm).toFormat('hh:mm:ss')
    return DateTime.fromISO(date + 'T' + time).toUnixInteger()
  }

  const valueModel = computed(() => {
    if (activeValue.value == 'custom')
      return [
        formatDate(dateStart.value, timeFrom.value),
        formatDate(dateEnd.value, timeEnd.value),
      ].join(',')
    return dropdownValue
  })

  defineProps(['modelValue'])
  const emits = defineEmits(['update:modelValue'])

  watchEffect(() => {
    if (valueModel) {
      emits('update:modelValue', valueModel.value)
    }
  })

  const isRangeDateDisabled = (
    ts: number,
    type: 'start' | 'end',
    range: [number, number] | null
  ) => {
    if (ts > Date.now()) return true
    if (type === 'start' && range !== null) {
      return startOfDay(range[1]).valueOf() - startOfDay(ts).valueOf() > d * 30
    }
    if (type === 'end' && range !== null) {
      return startOfDay(ts).valueOf() - startOfDay(range[0]).valueOf() > d * 30
    }
    return false
  }

  const options = [
    {
      label: 'Semua',
      value: '',
    },
    {
      label: '7 hari terakhir',
      value: '7d',
    },
    {
      label: '30 hari terakhir',
      value: '30d',
    },
    {
      label: 'Custom',
      value: 'custom',
    },
  ]

  const changeValue = (value: string) => {
    dropdownValue.value = value
    activeValue.value = value
  }

  const getLabel = computed(() => {
    switch (activeValue.value) {
      case '':
        return 'Sort'
      case '7d':
        return '7 hari terakhir'
      case '30d':
        return '30 hari terakhir'
      case 'custom':
        return 'Custom'

      default:
        return dropdownValue.value
    }
  })

  const onClose = () => {
    emits('update:modelValue', valueModel.value)
    showPopover.value = false
  }
</script>

<template>
  <n-popover
    placement="bottom-end"
    trigger="click"
    :show="showPopover"
    class="popover-filter"
  >
    <template #trigger>
      <n-button block @click="showPopover = !showPopover">
        {{ getLabel }}
      </n-button>
    </template>
    <n-space :wrap-item="false" class="filter__wrapper">
      <n-space vertical item-style="width: 100%" class="filter__item">
        <n-button
          v-for="option in options"
          :key="option.value"
          block
          :type="activeValue == option.value ? 'primary' : ''"
          @click="changeValue(option.value)"
        >
          {{ option.label }}
        </n-button>
      </n-space>
      <n-space
        v-if="activeValue == 'custom'"
        style="flex: 1; height: 100%"
        :wrap-item="false"
      >
        <n-date-picker
          v-model:value="dateRange"
          class="single"
          type="daterange"
          panel
          :actions="[]"
          :is-date-disabled="isRangeDateDisabled"
        />
        <n-form class="form__wrapper">
          <n-space
            vertical
            :wrap-item="false"
            align="items-center"
            style="height: 100%"
            justify="between"
          >
            <n-space style="flex: 1" vertical>
              <n-form-item label="From">
                <n-time-picker
                  v-model:value="timeFrom"
                  style="width: 100%"
                  :default-value="Date.now()"
                />
              </n-form-item>
              <n-form-item label="To">
                <n-time-picker
                  v-model:value="timeEnd"
                  style="width: 100%"
                  :default-value="Date.now()"
                />
              </n-form-item>
            </n-space>
            <n-space justify="end">
              <n-button size="tiny" type="primary" @click="onClose">
                Konfirmasi
              </n-button>
            </n-space>
          </n-space>
        </n-form>
      </n-space>
    </n-space>
  </n-popover>
</template>

<style lang="postcss" scoped>
  .filter__wrapper {
    @apply flex-col md:flex-row max-w-xs md:max-w-max;
  }
  .filter__item {
    @apply w-full sm:w-auto;
  }
  .popover-filter {
    @apply max-w-[80%] ml-auto sm:max-w-full;
  }
  .form__wrapper {
    @apply w-full md:w-auto;
  }
</style>
