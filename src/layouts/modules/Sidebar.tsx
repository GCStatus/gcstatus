import { IconButton, Tooltip } from '@mui/material'
import { useEffect } from 'react'
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitch,
  IoLogoYoutube,
} from 'react-icons/io5'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { useTheme } from '@/hooks'
import { toggle } from '@/store/themeSlice'

function Sidebar() {
  const mode = useTheme()
  const dispatch = useDispatch()
  const html = document.documentElement

  const handleToggleTheme = () => {
    dispatch(toggle(mode === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    if (mode === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [mode, html])

  return (
    <div className="flex flex-col rounded-3xl">
      <div className="backdrop-blur-sm text-sm border bg-black/5 rounded-2xl p-4 fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col z-40">
        <div className="flex flex-col items-center">
          <Tooltip
            title={`Change to ${mode === 'light' ? 'dark' : 'light'} theme`}>
            <IconButton onClick={handleToggleTheme}>
              {mode === 'light' ? (
                <MdDarkMode className="dark:text-white text-gray-400" />
              ) : (
                <MdLightMode className="dark:text-white text-gray-400" />
              )}
            </IconButton>
          </Tooltip>

          <div className="flex flex-col gap-1">
            <IconButton>
              <IoLogoGithub className="dark:text-white text-gray-400" />
            </IconButton>

            <IconButton>
              <IoLogoLinkedin className="dark:text-white text-gray-400" />
            </IconButton>

            <IconButton>
              <IoLogoInstagram className="dark:text-white text-gray-400" />
            </IconButton>

            <IconButton>
              <IoLogoTwitch className="dark:text-white text-gray-400" />
            </IconButton>

            <IconButton>
              <IoLogoYoutube className="dark:text-white text-gray-400" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
