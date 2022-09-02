import { RouterLink, type RouterLinkProps } from 'vue-router'

import { NIcon, type MenuOption } from 'naive-ui'
import { useTheme } from '~/store/theme'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { Icon } from '@iconify/vue'

function renderRoute(route: RouterLinkProps, label: string) {
  return () => {
    return <RouterLink to={route.to}>{label}</RouterLink>
  }
}

export const mainMenuOptions: MenuOption[] = [
  {
    label: () => {
      return <RouterLink to="/">Dashboard</RouterLink>
    },
    key: 'dashboard',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="ph:activity" />
        </NIcon>
      )
    },
  },
  {
    label: () => {
      return <RouterLink to="/users">Pengguna</RouterLink>
    },
    key: 'users',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="majesticons:users-line" />
        </NIcon>
      )
    },
  },
  {
    label: () => {
      return <RouterLink to="/transactions">Transaksi</RouterLink>
    },
    key: 'transactions',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="icon-park-outline:transaction-order" />
        </NIcon>
      )
    },
  },
  {
    label: () => {
      return <RouterLink to="/documents">Dokumen</RouterLink>
    },
    key: 'documents',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="fe:document" />
        </NIcon>
      )
    },
  },
  {
    label: () => {
      return <RouterLink to="/settings">Pengaturan</RouterLink>
    },
    key: 'settings',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="octicon:gear-16" />
        </NIcon>
      )
    },
  },
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
