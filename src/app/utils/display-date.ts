const monthMap = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec'
]

const getDisplayDateEN = (date: Date): string => {
  const m = monthMap[date.getMonth()]
  const d = date.getDate()
  const y = date.getFullYear()
  return `${m} ${d}, ${y}`
}

const getDisplayDateJA = (date: Date): string => {
  const m = date.getMonth() + 1
  const d = date.getDate()
  const y = date.getFullYear()
  return `${y}年${m}月${d}日`
}

export const getDisplayDate = (unixtime: number, locale: string): string => {
  const date = new Date(unixtime * 1000)

  if (locale === 'en') {
    return getDisplayDateEN(date)
  }
  if (locale === 'ja') {
    return getDisplayDateJA(date)
  }
  return ''
}
