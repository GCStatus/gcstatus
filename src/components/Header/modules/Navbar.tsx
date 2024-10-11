import { Badge, Box, IconButton, Link, Tooltip } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  IoCalendarOutline,
  IoLogInOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearch,
} from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'

import { Backdrop, Logo } from '@/components'
import { useAccount } from '@/hooks'
import { Notification } from '@/types'

import { Menu, Notifications } from '.'

interface NavbarProps {
  notifications: Notification[]
  withCarousel: boolean
  loadingNotifications: boolean
}

function Navbar(props: NavbarProps) {
  const { notifications, withCarousel, loadingNotifications } = props
  const go = useNavigate()
  const { user } = useAccount()
  const { query = '' } = useParams()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [notificationsOpen, setNotificationsOpen] =
    useState<boolean>(false)
  const [search, setSearch] = useState<string>(query)
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
    setMenuOpen((current) => !current)
  }

  const toggleNotification = () => {
    setNotificationsOpen((current) => !current)
  }

  const handleSearch = () => {
    if (!search.trim() || search.trim() === '') {
      toast.error('Please, provide any characters to search')

      return
    }

    go(`/search/${search}`)
  }

  useEffect(() => {
    if (query.trim() && query.trim() !== '') setSearch(query)
  }, [query])

  return (
    <Fragment>
      <Box
        component="nav"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          navbarSticky || !withCarousel
            ? 'backdrop-blur-sm bg-theme-dark-900/50 shadow-md'
            : ''
        }`}>
        <Box className="container mx-auto px-4 sm:py-8 py-2 flex items-center sm:justify-between justify-center sm:flex-row flex-col">
          <Link href="/" className="text-white text-2xl font-bold">
            <Logo color="dark:fill-gray-400 fill-gray-100" />
          </Link>

          <Box className="hidden md:flex items-center relative w-full max-w-[40rem]">
            <input
              type="text"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              className="w-full p-2 px-4 border-2 dark:border-gray-600 border-gray-300 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-theme-red-900 transition-all outline-none duration-300 dark:placeholder:text-gray-400 placeholder:text-white"
              placeholder="Search..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch()
              }}
            />
            <IconButton
              onClick={handleSearch}
              className="absolute right-2">
              <IoSearch className="dark:text-gray-400 text-gray-100 w-5" />
            </IconButton>
          </Box>

          <Box className="flex items-center gap-1">
            {!user && (
              <Tooltip title="Go to login">
                <IconButton href="/login" className="group">
                  <IoLogInOutline className="text-gray-200 group-hover:text-yellow-500 transition-colors duration-300" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Go to calendar">
              <IconButton href="/releases/calendar" className="group">
                <IoCalendarOutline className="text-gray-200 group-hover:text-yellow-500 transition-colors duration-300" />
              </IconButton>
            </Tooltip>

            {user && (
              <Tooltip title="Open notifications">
                <IconButton
                  className="relative bg-transparent group"
                  onClick={toggleNotification}>
                  <Badge
                    badgeContent={
                      notifications.filter(({ read_at }) => !read_at)
                        .length
                    }
                    color="warning">
                    <IoNotificationsOutline className="text-white group-hover:text-yellow-500 transition-colors duration-300" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Open menu">
              <IconButton onClick={toggleMenu} className="group">
                <IoMenuOutline className="text-gray-200 group-hover:text-yellow-500 transition-colors duration-300" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {user && (
        <Notifications
          open={notificationsOpen}
          toggle={toggleNotification}
          notifications={notifications}
          loading={loadingNotifications}
        />
      )}

      <Menu
        user={user}
        open={menuOpen}
        search={search}
        toggle={toggleMenu}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      <Backdrop open={menuOpen} toggleBackdrop={toggleMenu} />

      <Backdrop
        open={notificationsOpen}
        toggleBackdrop={toggleNotification}
      />
    </Fragment>
  )
}

export default Navbar
