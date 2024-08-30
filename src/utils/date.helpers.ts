import { formatRelative } from 'date-fns'

export const formatRelativeDateOnly = (
  date: Date | string,
  baseDate: Date = new Date(),
) => {
  const relativeString = formatRelative(date, baseDate)

  const [relativeDate] = relativeString.split(' at ')

  return relativeDate
}
