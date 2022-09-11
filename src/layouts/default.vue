<script lang="ts" setup>
  import DEFAULT_AVATAR from '~/assets/images/avatar.png'
  import DEFAULT_LOGO from '~/assets/images/logo.png'
  import { Icon } from '@iconify/vue'
  import {
    mainMenuOptions,
    altMenuOptions,
    profileMenuOptions,
    collapsedMenuOptions,
  } from '~/constants/menus'
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
            style="padding: 0 16px"
            :size="0"
            :wrap-item="false"
          >
            <!-- logo -->

            <router-link to="/document">
              <n-image
                object-fit="contain"
                preview-disabled
                height="64"
                :src="DEFAULT_LOGO"
                :img-props="{ style: { width: '100%' } }"
                style="width: 100%"
              />
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
                    <n-icon size="24"> <Icon name="dashboard" /> </n-icon>
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
                    eMET
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
    </n-layout>
  </n-layout>
</template>
