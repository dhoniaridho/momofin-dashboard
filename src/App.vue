<script setup lang="ts">
  import { darkThemeOvverides, lightThemeOvverides } from './themes/main'
  import { darkTheme, dateIdID, idID } from 'naive-ui'
  import { useTheme } from './store/theme'
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
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>
