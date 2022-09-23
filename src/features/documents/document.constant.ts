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

export const STATUS = (text: string) => {
  switch (text) {
    case 'completed':
      return 'success'
    case 'draft':
      return 'info'
    case 'processing':
      return 'primary'
  }
}
