<!-- eslint-disable vue/require-prop-types -->
<script setup lang="ts">
  import { DateTime } from 'luxon'

  const showPopover = ref(false)
  const dropdownValue = ref('')
  const dateRange = ref([Date.now(), Date.now()])
  const timeFrom = ref(Date.now())
  const timeEnd = ref(Date.now())

  const dateStart = computed(() => dateRange.value[0])
  const dateEnd = computed(() => dateRange.value[1])

  const formatDate = (dt: number, tm: number) => {
    const date = DateTime.fromMillis(dt).toFormat('yyyy-MM-dd')
    const time = DateTime.fromMillis(tm).toFormat('hh:mm:ss')
    return DateTime.fromISO(date + 'T' + time).toUnixInteger()
  }

  const valueModel = computed(() => {
    if (dropdownValue.value == 'custom')
      return [
        formatDate(dateStart.value, timeFrom.value),
        formatDate(dateEnd.value, timeEnd.value),
      ].join(',')
    return dropdownValue
  })

  defineProps(['modelValue'])
  const emits = defineEmits(['update:modelValue'])

  watchEffect(() => {
    if (dropdownValue) {
      emits('update:modelValue', valueModel)
    }
  })

  const disablePreviousDate = (ts: number) => {
    return ts > Date.now()
  }
</script>

<template>
  <div label-placement="left">
    <n-popover placement="bottom" trigger="click" :show="showPopover">
      <template #trigger>
        <div @click="showPopover = !showPopover">
          <n-button size="small" style="grid-area: 1 / 3 / 2 / 4">
            Sort
          </n-button>
        </div>
      </template>
      <n-space :wrap-item="false" class="filter__wrapper">
        <n-space vertical item-style="width: 100%" class="filter__item">
          <n-button
            block
            :type="dropdownValue == '' ? 'primary' : ''"
            @click="dropdownValue = ''"
          >
            Semua
          </n-button>
          <n-button
            block
            :type="dropdownValue == '7d' ? 'primary' : ''"
            @click="dropdownValue = '7d'"
          >
            7 hari terakhir
          </n-button>
          <n-button
            block
            :type="dropdownValue == '30d' ? 'primary' : ''"
            @click="dropdownValue = '30d'"
          >
            30 hari terakhir
          </n-button>
          <n-button
            block
            :type="dropdownValue == 'custom' ? 'primary' : ''"
            @click="dropdownValue = 'custom'"
          >
            Custom
          </n-button>
        </n-space>
        <n-space
          v-if="dropdownValue == 'custom'"
          style="flex: 1; height: 100%"
          :wrap-item="false"
        >
          <n-date-picker
            v-model:value="dateRange"
            class="single"
            type="daterange"
            panel
            :actions="[]"
            :is-date-disabled="disablePreviousDate"
          />
          <n-form>
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
                    :default-value="Date.now()"
                  />
                </n-form-item>
                <n-form-item label="To">
                  <n-time-picker
                    v-model:value="timeEnd"
                    :default-value="Date.now()"
                  />
                </n-form-item>
              </n-space>
              <n-space justify="end">
                <n-button
                  size="tiny"
                  type="primary"
                  @click="showPopover = false"
                >
                  Konfirmasi
                </n-button>
              </n-space>
            </n-space>
          </n-form>
        </n-space>
      </n-space>
    </n-popover>
  </div>
</template>

<style lang="postcss">
  .filter__wrapper {
    @apply flex-col md:flex-row max-w-xs md:max-w-max;
  }
  .filter__item {
    @apply w-full sm:w-auto;
  }
</style>
