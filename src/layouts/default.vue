<script lang="ts" setup>
  import DEFAULT_AVATAR from '~/assets/images/avatar.png'
  import { Icon } from '@iconify/vue'
  import {
    mainMenuOptions,
    altMenuOptions,
    profileMenuOptions,
    collapsedMenuOptions,
  } from '~/constants/menus'
  import Icons from '../components/Icons.vue'
  import useAuthStore from '@features/auth/auth.store'

  const auth = useAuthStore()

  const clientWidth = ref(document.body.clientWidth)
  const activeKey = ref(null)
  const collapsed = computed(() => {
    return clientWidth.value < 1024
  })
  onMounted(async () => {
    document.body.onresize = () => {
      clientWidth.value = document.body.clientWidth
    }
  })
  onUnmounted(() => {
    document.body.onresize = null
  })
</script>

<template>
  <n-layout :has-sider="!collapsed" position="absolute">
    <!-- sidebar -->
    <n-layout-sider v-if="!collapsed" bordered content-style="height: 100vh;">
      <n-space vertical justify="space-between" style="height: 100%">
        <n-space vertical>
          <n-space
            vertical
            style="padding: 0 16px; height: 5rem"
            :size="0"
            :wrap-item="false"
            align="center"
            justify="center"
          >
            <!-- logo -->

            <router-link to="/" style="text-decoration: none">
              <Icons width="200" height="37" name="logo" />
              <n-space justify="end">
                <n-text style="text-align: end">
                  Dashboard Tele Sales eMET
                </n-text>
              </n-space>
            </router-link>
          </n-space>
          <n-scrollbar style="height: 50%">
            <n-menu
              v-model:value="activeKey"
              :root-indent="20"
              :indent="12"
              :options="mainMenuOptions"
            />
          </n-scrollbar>
        </n-space>

        <n-menu :root-indent="20" :indent="12" :options="altMenuOptions" />
      </n-space>
    </n-layout-sider>

    <n-layout>
      <!-- header -->
      <n-scrollbar>
        <n-layout-header
          position="absolute"
          bordered
          style="z-index: 1; height: 64px"
        >
          <n-space
            align="center"
            justify="space-between"
            style="padding: 0 24px; height: 64px"
          >
            <n-space align="center">
              <n-popover
                v-if="collapsed"
                placement="bottom-start"
                trigger="click"
                style="padding: 0"
              >
                <template #trigger>
                  <n-button size="large" quaternary circle>
                    <template #icon>
                      <n-icon size="24">
                        <Icon icon="heroicons-outline:menu-alt-1" />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                <n-menu
                  accordion
                  :root-indent="16"
                  :indent="0"
                  :options="collapsedMenuOptions"
                />
              </n-popover>
            </n-space>
            <n-space align="center">
              <n-popover
                placement="bottom-end"
                trigger="click"
                style="padding: 0"
              >
                <template #trigger>
                  <n-button
                    round
                    quaternary
                    style="padding-left: 0; padding-right: 12px"
                  >
                    <n-space align="center">
                      <n-avatar
                        v-if="DEFAULT_AVATAR"
                        round
                        :src="DEFAULT_AVATAR"
                        :size="32"
                      />
                      <n-avatar v-else round :src="DEFAULT_AVATAR" :size="32" />
                      {{ auth.user.fullname }}
                      <n-icon><Icon icon="heroicons:chevron-down" /> </n-icon>
                    </n-space>
                  </n-button>
                </template>
                <n-menu
                  :root-indent="16"
                  :indent="0"
                  :options="profileMenuOptions"
                />
              </n-popover>
            </n-space>
          </n-space>
        </n-layout-header>

        <!-- content -->
        <n-layout-content>
          <n-space
            vertical
            :size="0"
            style="padding-inline: 2rem; padding-block: 5rem; min-height: 100vh"
          >
            <router-view />
          </n-space>
        </n-layout-content>
      </n-scrollbar>
    </n-layout>
  </n-layout>
</template>
