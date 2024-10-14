import { Box } from '@mui/material'
import { useEffect } from 'react'

import { useAccount } from '@/hooks'
import {
  useGetHomeQuery,
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
  const { home, loadingHome } = useGetHomeQuery(undefined, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      home: data,
      loadingHome: isLoading || isFetching,
    }),
  })

  useEffect(() => {
    if (user) trigger()
  }, [user])

  if (loadingHome) return <LoadingScreen />

  return (
    <Box component="header">
      <Navbar
        notifications={notifications}
        withCarousel={withCarousel}
        loadingNotifications={isLoading}
      />

      {withCarousel ? (
        home && <HeaderCarousel banners={home.banners} />
      ) : (
        <Box className="pb-28 dark:bg-theme-dark-900 bg-white" />
      )}
    </Box>
  )
}

export default Header
