import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '@/components'

import { ScrollToTop } from './modules'

function DefaultLayout() {
  const array: string[] = []

  for (let index = 0; index < 200; index++) {
    array[index] = 'Home'
  }

  return (
    <Box>
      <Header />
      {array.map((string, i) => (
        <p key={i}>{string}</p>
      ))}
      <Box component="main">
        <Outlet />
      </Box>
      <ScrollToTop />
      <Footer />
    </Box>
  )
}

export default DefaultLayout
