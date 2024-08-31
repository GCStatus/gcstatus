import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { useSidebar } from '@/hooks'
import { Footer, Header } from '@/components'

import { ScrollToTop, Sidebar } from './modules'

function DefaultLayout() {
  const enabled = useSidebar()

  return (
    <Box>
      <Header />
      {enabled === 'yes' && <Sidebar />}
      <Box component="main" className="py-8 dark:bg-zinc-900 bg-white">
        <Outlet />
      </Box>
      <ScrollToTop />
      <Footer />
    </Box>
  )
}

export default DefaultLayout
