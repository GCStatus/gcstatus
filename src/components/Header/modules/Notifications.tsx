import {
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { formatRelative } from 'date-fns'
import { useState } from 'react'
import { IoClose, IoMail, IoMailOpen } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { Button, Icon } from '@/components'
import { Icons } from '@/components/Icon/Icon'
import { useSuccess } from '@/hooks'
import {
  useDeleteAllNotificationsMutation,
  useDeleteNotificationMutation,
  useMarkAllNotificationsReadMutation,
  useMarkAllNotificationsUnreadMutation,
  useMarkNotificationReadMutation,
  useMarkNotificationUnreadMutation,
} from '@/services/api'
import { Notification } from '@/types'
import { formatRelativeDateOnly as f, shortenString as s } from '@/utils'

import { useGroupedNotifications } from './helpers'

interface NotificationsProps {
  open: boolean
  toggle: () => void
  notifications: Notification[]
  loading: boolean
}

function Notifications(props: NotificationsProps) {
  const { open, toggle, notifications, loading } = props
  const go = useNavigate()
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean
  }>({})
  const [loadingRemoveStates, setLoadingRemoveStates] = useState<{
    [key: number]: boolean
  }>({})
  const [read, { data: readData, isSuccess: successRead }] =
    useMarkNotificationReadMutation()
  const [unread, { data: unreadData, isSuccess: successUnread }] =
    useMarkNotificationUnreadMutation()
  const [remove, { data: removeData, isSuccess: successRemove }] =
    useDeleteNotificationMutation()
  const [
    readAll,
    {
      data: unreadAllData,
      isLoading: loadingReadAll,
      isSuccess: successReadAll,
    },
  ] = useMarkAllNotificationsReadMutation()
  const [
    unreadAll,
    {
      data: readAllData,
      isLoading: loadingUnreadAll,
      isSuccess: successUnreadAll,
    },
  ] = useMarkAllNotificationsUnreadMutation()
  const [
    deleteAll,
    {
      data: deleteAllData,
      isLoading: loadingDeleteAll,
      isSuccess: successDeleteAll,
    },
  ] = useDeleteAllNotificationsMutation()

  const groupedNotifications = useGroupedNotifications(notifications)

  const handleMarkAsRead = async (notification: Notification) => {
    setLoadingStates((prev) => ({ ...prev, [notification.id]: true }))
    await read(notification.id)
    setLoadingStates((prev) => ({ ...prev, [notification.id]: false }))
  }

  const handleMarkAsUnread = async (notification: Notification) => {
    setLoadingStates((prev) => ({ ...prev, [notification.id]: true }))
    await unread(notification.id)
    setLoadingStates((prev) => ({ ...prev, [notification.id]: false }))
  }

  const handleDelete = async (notification: Notification) => {
    setLoadingRemoveStates((prev) => ({
      ...prev,
      [notification.id]: true,
    }))
    await remove(notification.id)
    setLoadingRemoveStates((prev) => ({
      ...prev,
      [notification.id]: false,
    }))
  }

  const handleReadAll = async () => {
    await readAll()
  }

  const handleUnreadAll = async () => {
    await unreadAll()
  }

  const handleDeleteAll = async () => {
    await deleteAll()
  }

  const handleOpenNotification = (notification: Notification) => {
    if (!notification.read_at) read(notification.id)

    toggle()

    if (notification.data.actionUrl.startsWith('https://')) {
      window.open(notification.data.actionUrl, '_blank')
      return
    }

    go(notification.data.actionUrl)
  }

  useSuccess(successRead, readData?.message)
  useSuccess(successUnread, unreadData?.message)
  useSuccess(successRemove, removeData?.message)
  useSuccess(successReadAll, readAllData?.message)
  useSuccess(successUnreadAll, unreadAllData?.message)
  useSuccess(successDeleteAll, deleteAllData?.message)

  const renderEmptyState = () => (
    <Box className="flex flex-col items-center justify-center text-center p-4 mt-4 rounded-lg border border-gray-300 dark:border-gray-600">
      <Typography
        variant="h6"
        className="font-bold text-gray-600 dark:text-gray-300">
        It's so cold here... 🥶
      </Typography>
      <Typography
        variant="body1"
        className="mt-2 text-gray-500 dark:text-gray-400">
        No notifications yet. Stay tuned for updates!
      </Typography>
      <div className="mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-12 h-12 dark:text-blue-200 text-blue-400">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v20m-10-10h20m-15-5l5 5-5 5m10-10l-5 5 5 5"
          />
        </svg>
      </div>
    </Box>
  )

  const renderNotificationActions = (notification: Notification) => (
    <Box>
      {loadingStates[notification.id] ? (
        <CircularProgress size={14} color="error" />
      ) : notification.read_at ? (
        <IconButton onClick={() => handleMarkAsUnread(notification)}>
          <IoMailOpen size={16} />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleMarkAsRead(notification)}>
          <IoMail size={16} />
        </IconButton>
      )}
      {loadingRemoveStates[notification.id] ? (
        <CircularProgress size={14} color="error" />
      ) : (
        <IconButton onClick={() => handleDelete(notification)}>
          <IoClose
            size={16}
            className="dark:text-gray-400 text-gray-600"
          />
        </IconButton>
      )}
    </Box>
  )

  const renderMarkAllAs = () => {
    if (notifications.some(({ read_at }) => !read_at)) {
      return (
        <Button
          className="mt-4"
          onClick={handleReadAll}
          isLoading={loadingReadAll}>
          Mark all as read
        </Button>
      )
    }

    return (
      <Button
        className="mt-4"
        onClick={handleUnreadAll}
        isLoading={loadingUnreadAll}>
        Mark all as unread
      </Button>
    )
  }

  const renderDeleteAll = () => {
    return (
      <Button
        className="mt-4"
        onClick={handleDeleteAll}
        isLoading={loadingDeleteAll}>
        Remove all
      </Button>
    )
  }

  return (
    <Stack
      className={`fixed top-0 right-0 h-full lg:w-1/3 w-full dark:bg-zinc-900 bg-white shadow-lg z-50 transform transition-transform duration-300 opacity-90 p-8 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <Box className="flex items-center justify-between">
        <Typography className="text-2xl font-semibold leading-6 dark:text-gray-300 text-gray-800">
          Notifications
        </Typography>
        <IconButton onClick={toggle}>
          <IoClose className="dark:text-gray-400 text-gray-600" />
        </IconButton>
      </Box>

      {loading ? (
        <LinearProgress color="error" />
      ) : (
        <>
          {notifications.length > 0 ? (
            <>
              <Box className="grid grid-cols-2 gap-4 xs:grid-cols-1">
                {renderMarkAllAs()}
                {renderDeleteAll()}
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
                      className={`w-full p-4 mt-4 dark:bg-theme-dark-900 bg-gray-100 rounded flex items-center border-l-2 ${notification.read_at ? 'border-green-500' : 'border-theme-red-900'}`}
                      key={notification.id}>
                      <Box
                        className={`focus:outline-none w-8 h-8 border rounded-full dark:border-gray-200 border-gray-700 flex items-center flex-shrink-0 justify-center ${!notification.read_at ? 'animate-pulse' : ''}`}>
                        <Icon
                          name={
                            notification.data.icon as keyof typeof Icons
                          }
                          className="dark:text-gray-400 text-gray-900"
                        />
                      </Box>
                      <Box className="pl-3 w-full flex items-center justify-between">
                        <Box
                          component="span"
                          className="focus:outline-none text-sm leading-none flex flex-col gap-2">
                          <Tooltip title={notification.data.title}>
                            <Link
                              onClick={() =>
                                handleOpenNotification(notification)
                              }
                              className="dark:text-gray-300 text-gray-900 hover:text-yellow-400 transition-colors duration-300 hover:animate-pulse cursor-pointer">
                              {s(notification.data.title, 70)}
                            </Link>
                          </Tooltip>
                          <Typography
                            variant="subtitle2"
                            component="span"
                            className="dark:text-gray-400 text-gray-600 text-xs">
                            {formatRelative(
                              notification.created_at,
                              new Date(),
                            )}
                          </Typography>
                        </Box>
                        {renderNotificationActions(notification)}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))}
            </>
          ) : (
            renderEmptyState()
          )}
        </>
      )}
    </Stack>
  )
}

export default Notifications
