import { RouterLink, type RouterLinkProps } from 'vue-router'

import { NIcon, type MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { useTheme } from '~/store/theme'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'

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
    label: 'Dokumen',
    key: 'dokumen',
    children: [
      {
        label: renderRoute({ to: '/document' }, 'Unggah Dokumen'),
        key: 'unggah-dokumen',
      },
      {
        label: renderRoute({ to: '/document/inbound' }, 'Dokumen Masuk'),
        key: 'dokumen-masuk',
      },
      {
        label: renderRoute({ to: '/document/outbound' }, 'Dokumen Terkirim'),
        key: 'dokumen-terkirim',
      },
      {
        label: renderRoute({ to: '/document/draft' }, 'Draft'),
        key: 'draft',
      },
      {
        label: renderRoute({ to: '/document/trash' }, 'Sampah'),
        key: 'sampah',
      },
    ],
  },
  { type: 'divider' },
]

export const altMenuOptions: MenuOption[] = [
  {
    label: () => {
      return (
        <a href="https://momofin.com/about" target="_blank" rel="norefferer">
          <span>Tentang</span>
        </a>
      )
    },
    key: 'tentang',
  },
  {
    label: () => {
      return (
        <a
          target="_blank"
          rel="norefferer"
          href="https://momofin.com/terms-conditions"
        >
          Syarat dan Ketentuan
        </a>
      )
    },
    key: 'terms',
  },
  {
    label: () => {
      return (
        <a
          target="_blank"
          rel="norefferer"
          href="https://momofin.com/privacy-policy"
        >
          Kebijakan Privasi
        </a>
      )
    },
    key: 'privacy',
  },
  { type: 'divider' },
  {
    label: () => {
      return <RouterLink to="/logout">Logout</RouterLink>
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
