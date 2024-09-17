import { Box, IconButton, Link, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'

import { Logo, SwitchSidebar, SwitchTheme } from '@/components'
import { useSuccess } from '@/hooks'
import { useLogoutMutation } from '@/services/api'
import { User } from '@/types'

interface MenuProps {
  open: boolean
  search: string
  user: User | null
  toggle: () => void
  handleSearch: () => void
  setSearch: Dispatch<SetStateAction<string>>
}

function Menu(props: MenuProps) {
  const { user, open, toggle, search, setSearch, handleSearch } = props
  const [out, { data, isSuccess }] = useLogoutMutation()

  const handleLogout = () => out().unwrap()

  useSuccess(isSuccess, data?.message)

  return (
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
        <IconButton onClick={toggle}>
          <IoClose className="dark:text-gray-400 text-gray-800" />
        </IconButton>
      </Box>

      <Stack className="dark:text-white text-gray-800 py-6" spacing={0.5}>
        {user && (
          <Typography variant="h5">Welcome, {user.name}!</Typography>
        )}
        <Box className="hidden md:flex items-center relative w-full my-3">
          <input
            type="text"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            className="w-full p-2 px-4 border-2 dark:border-zinc-600 border-zinc-900 bg-transparent dark:text-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-theme-red-900 transition-all outline-none duration-300"
            placeholder="Search..."
          />
          <IconButton onClick={handleSearch} className="absolute right-2">
            <IoSearch className="text-gray-400 w-5" />
          </IconButton>
        </Box>
        <Link
          href="/"
          className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
          Home
        </Link>
        <Link
          href="/blogs"
          className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
          Blog
        </Link>
        <Link
          href="/news"
          className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
          News
        </Link>
        {user ? (
          <>
            <Link
              href="/profile"
              className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
              Profile
            </Link>
            <Link
              role="button"
              className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800"
              onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <Link
            href="/login"
            className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
            Login
          </Link>
        )}
        <Link
          href="/releases/calendar"
          className="block py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-100 rounded-lg transition duration-200 dark:text-gray-300 text-zinc-800">
          Release Calendar
        </Link>
        <SwitchTheme />
        <SwitchSidebar />
      </Stack>
    </Stack>
  )
}

export default Menu
