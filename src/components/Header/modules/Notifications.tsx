import {
  Box,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { IoClose } from 'react-icons/io5'

import { Icon } from '@/components'
import { Icons } from '@/components/Icon/Icon'
import { Notification } from '@/types'
import { formatRelativeDateOnly as f, shortenString as s } from '@/utils'

import { useGroupedNotifications } from './helpers'

interface NotificationsProps {
  open: boolean
  toggle: () => void
  notifications: Notification[]
}

function Notifications(props: NotificationsProps) {
  const { open, toggle, notifications } = props

  const groupedNotifications = useGroupedNotifications(notifications)

  return (
    <Stack
      className={`fixed top-0 right-0 h-full md:w-1/3 w-full dark:bg-zinc-900 bg-white shadow-lg z-50 transform transition-transform duration-300 opacity-90 p-8 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <Box className="flex items-center justify-between">
        <Typography className="text-2xl font-semibold leading-6 dark:text-gray-300 text-gray-800">
          Notifications
        </Typography>
        <IconButton onClick={toggle}>
          <IoClose className="dark:text-gray-400 text-gray-600" />
        </IconButton>
      </Box>

      {groupedNotifications.map(({ date, notifications }) => (
        <Box key={date.toISOString()}>
          <Typography
            component="h2"
            className="text-sm leading-normal pt-8 border-b pb-2 dark:border-gray-600 border-gray-800 dark:text-gray-300 text-gray-900">
            {f(date, new Date())}
          </Typography>
          {notifications.map((notification) => (
            <Box
              className="w-full p-4 mt-4 dark:bg-theme-dark-900 bg-gray-100 rounded flex items-center"
              key={notification.id}>
              <Box className="focus:outline-none w-8 h-8 border rounded-full dark:border-gray-200 border-gray-700 flex items-center flex-shrink-0 justify-center">
                <Icon
                  name={notification.icon as keyof typeof Icons}
                  className="dark:text-gray-400 text-gray-900"
                />
              </Box>
              <Box className="pl-3 w-full flex items-center justify-between">
                <Box
                  component="span"
                  className="focus:outline-none text-sm leading-none flex flex-col gap-2">
                  <Tooltip title={notification.title}>
                    <Link
                      href={notification.actionUrl}
                      className="dark:text-gray-300 text-gray-900 hover:text-yellow-400 transition-colors duration-300 hover:animate-pulse">
                      {s(notification.title, 80)}
                    </Link>
                  </Tooltip>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    className="dark:text-gray-400 text-gray-600 text-xs">
                    {formatRelative(notification.created_at, new Date())}
                  </Typography>
                </Box>
                <IconButton>
                  <IoClose className="dark:text-gray-400 text-gray-600" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Stack>
  )
}

export default Notifications
