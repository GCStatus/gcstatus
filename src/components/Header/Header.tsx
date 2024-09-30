import { Box } from '@mui/material'

import { MOCK_HOME } from '@/mocks'
import { useGetNotificationsQuery } from '@/services/api'

import { HeaderCarousel, Navbar } from './modules'

interface HeaderProps {
  withCarousel: boolean
}

function Header(props: HeaderProps) {
  const { withCarousel } = props
  const { notifications, isLoading } = useGetNotificationsQuery(
    undefined,
    {
      selectFromResult: ({ data = [], isLoading, isFetching }) => ({
        notifications: data,
        isLoading: isLoading || isFetching,
      }),
    },
  )

  const home = MOCK_HOME

  return (
    <Box component="header">
      <Navbar
        notifications={notifications}
        withCarousel={withCarousel}
        loadingNotifications={isLoading}
      />

      {withCarousel ? (
        <HeaderCarousel banners={home.banners} />
      ) : (
        <Box className="pb-28 dark:bg-theme-dark-900 bg-white" />
      )}
    </Box>
  )
}

export default Header
