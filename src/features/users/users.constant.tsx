import { Icon } from '@iconify/vue'
import { NDatePicker, NIcon } from 'naive-ui'

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

export const SORT = (onDateChange: any) => [
  {
    label: '30 hari terakhir',
    key: '30d',
  },
  {
    label: '7 hari terakhir',
    key: '7d',
  },
  {
    label: 'Custom',
    key: 'custom',
    children: [
      {
        key: 'custom',
        props: {
          onClick: () => {
            console.log('c')
          },
        },
        label: () => {
          return (
            <div>
              <NDatePicker
                onConfirm={onDateChange}
                type="daterange"
                class="single"
                panel
              />
            </div>
          )
        },
      },
    ],
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
