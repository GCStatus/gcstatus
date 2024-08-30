import { Box, IconButton, Link, Stack } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { IoClose, IoMenu, IoSearch } from 'react-icons/io5'

import { Backdrop } from '@/components'
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
        <Box className="container mx-auto px-4 py-8 flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold">
            GCStatus
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

          <Box className="flex items-center gap-2">
            <Notifications notifications={notifications} />

            <IconButton onClick={toggleMenu} className="group">
              <IoMenu className="text-gray-200 group-hover:text-yellow-500 transition-colors duration-300" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Stack
        className={`fixed top-0 right-0 h-full md:w-1/3 w-full bg-zinc-900 shadow-lg z-50 transform transition-transform duration-300 opacity-90 p-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <Box className="flex items-center justify-between">
          <Link
            href="/"
            className="focus:outline-none text-2xl font-semibold leading-6 text-gray-300">
            GCStatus
          </Link>
          <IconButton onClick={toggleMenu}>
            <IoClose className="text-gray-400" />
          </IconButton>
        </Box>

        <Stack className="text-white py-6" spacing={0.5}>
          <Box className="hidden md:flex items-center relative w-full mb-3">
            <input
              type="text"
              className="w-full p-2 px-4 border-2 border-zinc-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all outline-none duration-300"
              placeholder="Search..."
            />
            <IconButton className="absolute right-2">
              <IoSearch className="text-gray-400 w-5" />
            </IconButton>
          </Box>
          <Link
            href="#"
            className="block py-2 px-4 hover:bg-zinc-800 rounded-lg transition duration-200">
            Home
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 hover:bg-zinc-800 rounded-lg transition duration-200">
            Profile
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 hover:bg-zinc-800 rounded-lg transition duration-200">
            Settings
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 hover:bg-zinc-800 rounded-lg transition duration-200">
            Logout
          </Link>
        </Stack>
      </Stack>

      <Backdrop open={open} toggleBackdrop={toggleMenu} />
    </Fragment>
  )
}

export default Navbar
