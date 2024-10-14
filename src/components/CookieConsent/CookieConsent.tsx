import { Box, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

import Logo from '../Logo'

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cookies, setCookie] = useCookies(['_gc_accept_cookies'])

  useEffect(() => {
    if (!cookies._gc_accept_cookies) {
      setIsVisible(true)
    }
  }, [cookies])

  const acceptCookies = () => {
    setCookie('_gc_accept_cookies', '1', {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    })
    setIsVisible(false)
  }

  return isVisible ? (
    <Stack className="fixed bottom-3 left-3 md:bottom-5 md:left-5 w-[90%] md:w-1/3 max-w-md p-6 bg-gray-100 dark:bg-theme-dark-900 text-gray-900 dark:text-gray-200 rounded-lg shadow-xl z-50 border border-gray-300 dark:border-theme-red-900 transition-all animate-slide-in">
      <Box className="flex flex-col items-center">
        <Typography
          variant="h2"
          className="text-2xl md:text-3xl font-bold mb-4 animate-pulse text-theme-red-900 dark:text-theme-red-900">
          We Need Cookies!
        </Typography>

        <Typography className="text-center mb-6 text-gray-700 dark:text-gray-300">
          To provide the best experience, we use cookies. Do you accept?
        </Typography>

        <Box className="flex sm:flex-row flex-col justify-center gap-4 w-full">
          <Button
            onClick={acceptCookies}
            variant="contained"
            color="success"
            className="bg-theme-red-900 dark:bg-theme-red-900 hover:bg-red-600 text-white font-bold transform hover:scale-105 transition-all"
            startIcon={<IoCheckmarkCircleOutline />}
            fullWidth>
            Accept
          </Button>

          <Button
            variant="outlined"
            color="error"
            className="border border-theme-red-900 text-theme-red-900 dark:text-theme-red-900 hover:bg-red-600 dark:hover:text-white hover:text-white font-bold transform hover:scale-105 transition-all"
            fullWidth
            onClick={acceptCookies}>
            Decline
          </Button>
        </Box>
        <Box className="mt-6 flex justify-center items-center">
          <Logo width="max-w-48 w-full animate-bounce" />
        </Box>
      </Box>
    </Stack>
  ) : null
}

export default CookieConsent
