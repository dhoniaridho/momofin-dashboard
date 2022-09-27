<script setup lang="ts">
  import { darkThemeOvverides, lightThemeOvverides } from './themes/main'
  import { darkTheme, dateIdID, idID } from 'naive-ui'
  import { useTheme } from './store/theme'
  import { UseOnline } from '@vueuse/components'

  const theme = useTheme()
</script>

<template>
  <n-config-provider
    :theme-overrides="
      useTheme().currentTheme ? darkThemeOvverides : lightThemeOvverides
    "
    :date-locale="dateIdID"
    :locale="idID"
    :theme="useTheme().currentTheme ? darkTheme : null"
  >
    <n-message-provider>
      <UseOnline v-slot="{ isOnline }">
        <router-view v-if="isOnline" />
        <n-card
          v-else
          embedded
          :bordered="false"
          style="min-height: 100vh; padding: 0"
          :wrap-item="false"
        >
          <n-button
            style="position: absolute; right: 1rem"
            circle
            @click="theme.toggleTheme"
          >
            <span v-if="theme.currentTheme"> 🌞 </span>
            <span v-else> 🌒 </span>
          </n-button>
          <n-space justify="center" align="center" style="min-height: 100vh">
            <div style="text-align: center">
              <n-h1 style="font-size: 7rem">🛰️</n-h1>
              <n-h2 style="margin-bottom: 0.3rem">
                Connect to the internet
              </n-h2>
              <n-h3 style="margin-top: 0.3rem">
                You're offline. Check your connection.
              </n-h3>
            </div>
          </n-space>
        </n-card>
      </UseOnline>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
  .n-date-panel:is(.single) .n-date-panel-calendar--end {
    display: none;
  }
</style>
