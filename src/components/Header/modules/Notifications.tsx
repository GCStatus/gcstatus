import {
  Badge,
  Box,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { Fragment, useState } from 'react'
import { IoClose, IoNotifications } from 'react-icons/io5'

import { Backdrop, Icon } from '@/components'
import { Icons } from '@/components/Icon/Icon'
import { Notification } from '@/types'
import { formatRelativeDateOnly as f, shortenString as s } from '@/utils'

import { useGroupedNotifications } from './helpers'

interface NotificationsProps {
  notifications: Notification[]
}

function Notifications(props: NotificationsProps) {
  const { notifications } = props
  const [open, setOpen] = useState<boolean>(false)

  const toggleNotification = () => {
    setOpen((current) => !current)
  }

  const groupedNotifications = useGroupedNotifications(notifications)

  return (
    <Fragment>
      <IconButton
        className="relative bg-transparent group"
        onClick={toggleNotification}>
        <Badge badgeContent={notifications.length} color="warning">
          <IoNotifications className="text-white group-hover:text-yellow-500 transition-colors duration-300" />
        </Badge>
      </IconButton>

      <Backdrop open={open} toggleBackdrop={toggleNotification} />

      <Box
        className={`fixed top-0 right-0 h-full md:w-1/3 w-full bg-zinc-900 shadow-lg z-50 transform transition-transform duration-300 opacity-90 p-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <Box className="flex items-center justify-between">
          <Typography className="text-2xl font-semibold leading-6 text-gray-300">
            Notifications
          </Typography>
          <IconButton onClick={toggleNotification}>
            <IoClose className="text-gray-400" />
          </IconButton>
        </Box>

        {groupedNotifications.map(({ date, notifications }) => (
          <Box key={date.toISOString()}>
            <Typography
              component="h2"
              className="text-sm leading-normal pt-8 border-b pb-2 border-gray-600 text-gray-300">
              {f(date, new Date())}
            </Typography>
            {notifications.map((notification) => (
              <Box
                className="w-full p-4 mt-4 bg-theme-dark-900 rounded flex items-center"
                key={notification.id}>
                <Box className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center flex-shrink-0 justify-center">
                  <Icon
                    name={notification.icon as keyof typeof Icons}
                    className="text-gray-400"
                  />
                </Box>
                <Box className="pl-3 w-full flex items-center justify-between">
                  <Box
                    component="span"
                    className="focus:outline-none text-sm leading-none flex flex-col gap-2">
                    <Tooltip title={notification.title}>
                      <Link
                        href={notification.actionUrl}
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:animate-pulse">
                        {s(notification.title, 80)}
                      </Link>
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      className="text-gray-400 text-xs">
                      {formatRelative(notification.created_at, new Date())}
                    </Typography>
                  </Box>
                  <IconButton>
                    <IoClose className="text-gray-400" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Fragment>
  )
}

export default Notifications
