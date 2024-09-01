import { Box } from '@mui/material'

import { MOCK_HOME } from '@/mocks'

import { HeaderCarousel, Navbar } from './modules'

function Header() {
  const home = MOCK_HOME

  return (
    <Box component="header">
      <Navbar notifications={home.notifications} />

      <HeaderCarousel banners={home.banners} />
    </Box>
  )
}

export default Header
