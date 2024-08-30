import { parseISO } from 'date-fns'
import { useMemo } from 'react'

import { Notification } from '@/types'

interface GroupedNotifications {
  date: Date
  notifications: Notification[]
}

export const useGroupedNotifications = (
  notifications: Notification[] | undefined,
) => {
  return useMemo(() => {
    if (!notifications) return []

    return notifications
      .reduce((acc, notification) => {
        const notificationDate = parseISO(notification.created_at)

        const lastGroup = acc[acc.length - 1]

        if (
          lastGroup &&
          lastGroup.date.toDateString() === notificationDate.toDateString()
        ) {
          lastGroup.notifications.push(notification)
        } else {
          acc.push({
            date: parseISO(notification.created_at),
            notifications: [notification],
          })
        }

        return acc
      }, [] as GroupedNotifications[])
      .sort((a, b) => {
        const aDate = new Date(a.date.getTime())
        const bDate = new Date(b.date.getTime())

        return bDate.getTime() - aDate.getTime()
      })
  }, [notifications])
}
