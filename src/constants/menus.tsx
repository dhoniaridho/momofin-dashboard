import { RouterLink, type RouterLinkProps } from 'vue-router'

import { NIcon, type MenuOption } from 'naive-ui'
import { useTheme } from '~/store/theme'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import Icons from '@components/Icons.vue'

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
          <Icons name="dashboard" />
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
          <Icons name="users" />
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
          <Icons name="transactions" />
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
          <Icons name="document-text" />
        </NIcon>
      )
    },
  },
  // {
  //   label: () => {
  //     return <RouterLink to="/settings">Pengaturan</RouterLink>
  //   },
  //   key: 'settings',
  //   icon: () => {
  //     return (
  //       <NIcon>
  //         <Icons name="gear" />
  //       </NIcon>
  //     )
  //   },
  // },
]

export const altMenuOptions: MenuOption[] = [
  {
    label: () => {
      return <RouterLink to="/logout">Logout</RouterLink>
    },
    icon: () => {
      return (
        <NIcon>
          <Icons name="logout" rotate="180deg" />
        </NIcon>
      )
    },
    key: 'logout',
  },
]

export const profileMenuOptions: MenuOption[] = [
  {
    label: () => {
      const theme = useTheme()
      return <div onClick={theme.toggleTheme}>Ubah Tema</div>
    },
    key: 'change theme',
    icon: () => {
      const theme = useTheme()
      if (!theme.currentTheme) {
        return <MoonIcon onClick={theme.toggleTheme} />
      }
      return <SunIcon onClick={theme.toggleTheme} />
    },
  },
  {
    icon: () => <Icons name="logout" />,
    label: renderRoute({ to: '/logout' }, 'Logout'),
    key: 'logout',
  },
]

export const collapsedMenuOptions: MenuOption[] = [
  ...mainMenuOptions,
  ...altMenuOptions,
]
