type Data = {
  name: string
  email: string
  status: string
}

export function exportUsers(
  data: Data[],
  range?: { start?: string; end?: string }
): void {
  const headers = ['name', 'email', 'status']

  let str = ''

  str += headers.map((item) => item.replace('_', ' ')).join(',')

  str += '\n'

  const item = data.map(({ name, email, status }) => {
    return [name, email, status].join(', ')
  })
  str += item.join('\n')

  const blob = new Blob([str], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  if (!!range && !!range.start && !!range.end) {
    link.download = `users ${range.start}-${range.end}.csv`
  } else {
    link.download = `users.csv`
  }
  link.click()
}
