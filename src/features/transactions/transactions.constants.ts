export const STATUS = (text: string) => {
  switch (text.toLowerCase()) {
    case 'paid':
      return 'success'
    case 'expired':
      return 'error'
    case 'pending':
      return 'warning'
  }
}

export const SORT = [
  {
    label: '30 hari terakhir',
    value: '30d',
  },
  {
    label: '7 hari terakhir',
    value: '7d',
  },
  {
    label: 'Custom',
    value: 'custom',
  },
]

export { getKycStatus } from '@features/users/users.constant'
