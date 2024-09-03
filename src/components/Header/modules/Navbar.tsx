import { Box, IconButton, Link, Stack, Tooltip } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { IoCalendar, IoClose, IoMenu, IoSearch } from 'react-icons/io5'

import { Backdrop, Logo, SwitchSidebar, SwitchTheme } from '@/components'
import { Notification } from '@/types'

import { Notifications } from '.'

interface NavbarProps {
  notifications: Notification[]
}

function Navbar(props: NavbarProps) {
  const { notifications } = props
  const [open, setOpen] = useState<boolean>(false)
  const [navbarSticky, setNavbarSticky] = useState<boolean>(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavbarSticky(true)

      return
    }

    setNavbarSticky(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setOpen((current) => !current)
  }

  return (
    <Fragment>
      <Box
        component="nav"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          navbarSticky ? 'bg-theme-dark-900 shadow-md' : 'bg-transparent'
        }`}>
        <Box className="container mx-auto px-4 py-8 flex items-center sm:justify-between justify-center sm:flex-row flex-col">
          <Link href="/" className="text-white text-2xl font-bold">
            <Logo />
          </Link>

          <Box className="hidden md:flex items-center relative w-full max-w-[40rem]">
            <input
              type="text"
              className="w-full p-2 px-4 border-2 border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all outline-none duration-300"
              placeholder="Search..."
            />
            <IconButton className="absolute right-2">
              <IoSearch className="text-gray-400 w-5" />
            </IconButton>
          </Box>

          <Box className="flex items-center gap-1">
            <Tooltip title="Go to calendar">
              <IconButton href="/releases/calendar" className="group">
                <IoCalendar className="text-gray-200 group-hover:text-yellow-500 transition-colors duration-300" />
              </IconButton>
            </Tooltip>

            <Notifications notifications={notifications} />

            <Tooltip title="Open menu">
              <IconButton onClick={toggleMenu} className="group">
                <IoMenu className="text-gray-200 group-hover:text-yellow-500 transition-colors duration-300" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Stack
        className={`fixed top-0 right-0 h-full md:w-1/3 w-full dark:bg-zinc-900 bg-white shadow-lg z-50 transform transition-transform duration-300 opacity-90 p-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <Box className="flex items-center justify-between">
          <Link
            href="/"
            className="focus:outline-none text-2xl font-semibold leading-6 dark:text-gray-300 text-gray-800">
            <Logo height="max-h-12" />
          </Link>
          <IconButton onClick={toggleMenu}>
            <IoClose className="dark:text-gray-400 text-gray-800" />
          </IconButton>
        </Box>

        <Stack
          className="dark:text-white text-gray-800 py-6"
          spacing={0.5}>
          <Box className="hidden md:flex items-center relative w-full mb-3">
            <input
              type="text"
              className="w-full p-2 px-4 border-2 dark:border-zinc-600 border-zinc-900 bg-transparent dark:text-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all outline-none duration-300"
              placeholder="Search..."
            />
            <IconButton className="absolute right-2">
              <IoSearch className="text-gray-400 w-5" />
            </IconButton>
          </Box>
          <Link
            href="/"
            className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
            Home
          </Link>
          <Link
            href="/releases/calendar"
            className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
            Release Calendar
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
            Profile
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
            Settings
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
            Logout
          </Link>
          <SwitchTheme />
          <SwitchSidebar />
        </Stack>
      </Stack>

      <Backdrop open={open} toggleBackdrop={toggleMenu} />
    </Fragment>
  )
}

export default Navbar
