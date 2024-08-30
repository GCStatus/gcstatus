import { Box } from '@mui/material'

import { MOCK_BANNERS, MOCK_NOTIFICATIONS } from './mocks'
import { HeaderCarousel, Navbar } from './modules'

function Header() {
  return (
    <Box component="header">
      <Navbar notifications={MOCK_NOTIFICATIONS} />

      <HeaderCarousel banners={MOCK_BANNERS} />
    </Box>
  )
}

export default Header
