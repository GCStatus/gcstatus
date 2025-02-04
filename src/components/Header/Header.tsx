import { Box } from '@mui/material'
import { useEffect } from 'react'

import { useAccount } from '@/hooks'
import {
  useLazyGetHomeQuery,
  useLazyGetNotificationsQuery,
} from '@/services/api'

import { LoadingScreen } from '..'
import { HeaderCarousel, Navbar } from './modules'

interface HeaderProps {
  withCarousel: boolean
}

function Header(props: HeaderProps) {
  const { withCarousel } = props
  const { user } = useAccount()
  const [trigger, { notifications, isLoading }] =
    useLazyGetNotificationsQuery({
      selectFromResult: ({ data = [], isLoading, isFetching }) => ({
        notifications: data,
        isLoading: isLoading || isFetching,
      }),
    })
  const [getHome, { home, loadingHome }] = useLazyGetHomeQuery({
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      home: data,
      loadingHome: isLoading || isFetching,
    }),
  })

  useEffect(() => {
    if (user) trigger()
  }, [user])

  useEffect(() => {
    if (withCarousel) getHome()
  }, [withCarousel])

  if (loadingHome) return <LoadingScreen />

  const renderCarousel = () => {
    if (!withCarousel || !home || home.banners.length === 0) {
      return <Box className="pb-28 dark:bg-theme-dark-900 bg-white" />
    }

    return <HeaderCarousel banners={home.banners} />
  }

  return (
    <Box component="header">
      <Navbar
        notifications={notifications}
        withCarousel={withCarousel}
        loadingNotifications={isLoading}
      />

      {renderCarousel()}
    </Box>
  )
}

export default Header
