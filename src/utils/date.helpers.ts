import { differenceInYears, formatRelative, parseISO } from 'date-fns'
import { enUS as locale } from 'date-fns/locale'

export const formatRelativeDateOnly = (
  date: Date | string,
  baseDate: Date = new Date(),
) => {
  const relativeString = formatRelative(date, baseDate, { locale })

  const [relativeDate] = relativeString.split(' at ')

  return relativeDate
}

export const isOlderThan14Years = (dateString: string) => {
  const date = parseISO(dateString)
  const today = new Date()

  return differenceInYears(today, date) >= 14
}
