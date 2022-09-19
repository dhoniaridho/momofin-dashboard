export const STATUS = (text: string) => {
  switch (text) {
    case 'paid':
      return 'success'
    case 'expired':
      return 'error'
    case 'pending':
      return 'warning'
  }
}
