import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'

const ACTIONS = [
  {
    label: 'Verifikasi Pengguna',
    key: 'verification',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="ic:outline-verified" />
        </NIcon>
      )
    },
  },
  {
    label: 'Kirim Ulang Link',
    key: 'resend',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="eva:link-fill" />
        </NIcon>
      )
    },
  },
  {
    label: 'Hapus Pengguna',
    key: 'delete',
    icon: () => {
      return (
        <NIcon>
          <Icon icon="heroicons:trash" />
        </NIcon>
      )
    },
  },
]

export const OPTIONS = (status: string) => {
  return ACTIONS.filter((option) => {
    if (status == 'Verified') {
      return !['verification', 'resend'].includes(option.key)
    } else return option
  })
}

export const SORT = [
  {
    label: 'Last 1 days',
    value: 'Last 1 days',
  },
  {
    label: 'Last 7 days',
    value: 'Last 7 days',
  },
  {
    label: 'Last 1 month',
    value: 'Last 1 month',
  },
  {
    label: 'Last 1 year',
    value: 'Last 1 year',
  },
  {
    label: 'Last 5 year',
    value: 'Last 1 year',
  },
]

export const STATUS = (text: string) => {
  switch (text) {
    case 'Verified':
      return 'success'
    case 'Registered':
      return 'primary'
    case 'Unregistered':
      return 'default'
  }
}
