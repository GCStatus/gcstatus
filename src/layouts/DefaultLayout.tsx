import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Footer, Header } from '@/components'

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
      <Footer />
    </Box>
  )
}

export default DefaultLayout
