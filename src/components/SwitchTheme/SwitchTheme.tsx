import { useEffect } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { IoSunnyOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'

import { useTheme } from '@/hooks'
import { toggle } from '@/store/themeSlice'

function SwitchTheme() {
  const mode = useTheme()
  const dispatch = useDispatch()
  const html = document.documentElement

  const handleToggleTheme = (theme: 'light' | 'dark') => {
    dispatch(toggle(theme))
  }

  useEffect(() => {
    if (mode === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [mode, html])

  return (
    <Box className="flex items-center gap-3 mt-4 md:flex-row flex-col">
      <Tooltip title="Change theme to light">
        <button
          onClick={() => handleToggleTheme('light')}
          className="flex items-center justify-center px-4 py-2 gap-2 transition duration-300 border rounded-md focus:outline-none hover:opacity-60 md:w-auto w-full dark:border-gray-400 border-black">
          <IoSunnyOutline />
          <Typography variant="subtitle2" fontWeight={600}>
            Light
          </Typography>
        </button>
      </Tooltip>

      <Tooltip title="Change theme to dark">
        <button
          onClick={() => handleToggleTheme('dark')}
          className="flex items-center justify-center px-4 py-2 gap-2 transition duration-300 border rounded-md focus:outline-none hover:opacity-60 md:w-auto w-full dark:border-gray-400 border-black">
          <IoSunnyOutline />
          <Typography variant="subtitle2" fontWeight={600}>
            Dark
          </Typography>
        </button>
      </Tooltip>
    </Box>
  )
}

export default SwitchTheme
