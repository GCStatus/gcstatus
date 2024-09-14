import { Box } from '@mui/material'

import { MOCK_HOME } from '@/mocks'

import { HeaderCarousel, Navbar } from './modules'

interface HeaderProps {
  withCarousel: boolean
}

function Header(props: HeaderProps) {
  const { withCarousel } = props

  const home = MOCK_HOME

  return (
    <Box component="header">
      <Navbar
        notifications={home.notifications}
        withCarousel={withCarousel}
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
