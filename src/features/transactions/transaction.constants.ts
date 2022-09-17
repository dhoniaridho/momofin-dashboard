export const STATUS = (text: string) => {
  switch (text) {
    case 'paid':
      return 'primary'
    case 'expired':
      return 'error'
    case 'pending':
      return 'warning'
  }
}
