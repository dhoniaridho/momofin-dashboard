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
    case 'completed':
      return 'success'
    case 'draft':
      return 'info'
    case 'processing':
      return 'primary'
  }
}
