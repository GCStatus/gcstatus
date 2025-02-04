import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { CookieConsent, Footer, Header } from '@/components'
import { useSidebar } from '@/hooks'

import { ScrollToTop, Sidebar } from './modules'

interface DefaultLayoutProps {
  withCarousel: boolean
}

function DefaultLayout(props: DefaultLayoutProps) {
  const { withCarousel } = props
  const enabled = useSidebar()

  return (
    <Box>
      <Header withCarousel={withCarousel} />
      {enabled === 'yes' && <Sidebar />}
      <Box
        component="main"
        className="dark:bg-zinc-900 bg-white min-h-screen">
        <Outlet />
      </Box>
      <ScrollToTop />
      <CookieConsent />
      <Footer />
    </Box>
  )
}

export default DefaultLayout
