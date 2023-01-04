import type { TransactonExport } from './transactions.interface'

export function exportToCSV(
  data: TransactonExport.Transaction[],
  range?: { start?: string; end?: string }
): void {
  const headers = [
    'buyer_email',
    'invoice_code',
    'order_datetime',
    'payment_channel',
    'product_name',
    'status',
    'total_price',
    'payment_channel_detail',
  ]

  let str = ''

  str += headers.map((item) => item.replace('_', ' ')).join(',')

  str += '\n'

  const item = data.map(
    ({
      buyer_email,
      invoice_code,
      order_datetime,
      payment_channel,
      product_name,
      status,
      total_price,
      payment_channel_detail,
    }) => {
      return [
        buyer_email,
        invoice_code,
        order_datetime,
        payment_channel,
        product_name,
        status,
        total_price,
        payment_channel_detail,
      ].join(', ')
    }
  )
  str += item.join('\n')

  const blob = new Blob([str], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  if (!!range && !!range.start && !!range.end) {
    link.download = `transactions ${range.start}-${range.end}.csv`
  } else {
    link.download = `transactions.csv`
  }
  link.click()
}
