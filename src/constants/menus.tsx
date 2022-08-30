import { RouterLink, type RouterLinkProps } from 'vue-router'

import { NIcon, type MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { useTheme } from '~/store/theme'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { Icon } from '@iconify/vue'

function renderIcon(icon: Component) {
  return () => {
    return <NIcon>{icon}</NIcon>
  }
}

function renderRoute(route: RouterLinkProps, label: string) {
  return () => {
    return <RouterLink to={route.to}>{label}</RouterLink>
  }
}

export const mainMenuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="ph:activity" />
        </NIcon>
      )
    },
  },
  { type: 'divider' },
  {
    label: 'Pengguna',
    key: 'users',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="majesticons:users-line" />
        </NIcon>
      )
    },
  },
  { type: 'divider' },
  {
    label: 'Transaksi',
    key: 'transactions',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="icon-park-outline:transaction-order" />
        </NIcon>
      )
    },
  },
  { type: 'divider' },
  {
    label: 'Dokumen',
    key: 'documents',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="fe:document" />
        </NIcon>
      )
    },
  },
  { type: 'divider' },
  {
    label: 'Settings',
    key: 'documents',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="octicon:gear-16" />
        </NIcon>
      )
    },
  },
  { type: 'divider' },
]

export const altMenuOptions: MenuOption[] = [
  {
    label: () => {
      return <RouterLink to="/logout">Logout</RouterLink>
    },
    icon: () => {
      return (
        <NIcon>
          <Icon icon="tabler:logout" rotate="180deg" />
        </NIcon>
      )
    },
    key: 'logout',
  },
]

export const profileMenuOptions: MenuOption[] = [
  {
    label: renderRoute({ to: '/profile' }, 'Profil'),
    key: 'profil',
  },
  {
    label: () => {
      const theme = useTheme()
      return <div onClick={theme.toggleTheme}>Ganti Tema</div>
    },
    key: 'change theme',
    icon: () => {
      const theme = useTheme()
      if (!theme.currentTheme) {
        return <MoonIcon />
      }
      return <SunIcon />
    },
  },
  {
    label: renderRoute({ to: '/logout' }, 'Logout'),
    key: 'logout',
  },
]

export const collapsedMenuOptions: MenuOption[] = [
  ...mainMenuOptions,
  ...altMenuOptions,
]
