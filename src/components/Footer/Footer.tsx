import { IoPlayCircleOutline } from 'react-icons/io5'
import { Box, Divider, Link, Stack, Typography } from '@mui/material'

import { Logo } from '..'

function Footer() {
  return (
    <Box component="footer" className="bg-white dark:bg-theme-dark-900">
      <Stack className="container px-6 py-8 mx-auto">
        <Box className="flex flex-col items-center text-center">
          <Link href="#">
            <Logo />
          </Link>

          <Typography className="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">
            A real game website.
          </Typography>

          <Box className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
            <button className="flex items-center justify-center order-1 w-full px-2 py-2 gap-1 mt-3 text-sm tracking-wide text-gray-600 capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 dark:border-gray-400 dark:text-gray-300 sm:mt-0 sm:w-auto hover:bg-gray-50 focus:outline-none focus:ring dark:hover:bg-zinc-900 focus:ring-gray-300 focus:ring-opacity-40">
              <IoPlayCircleOutline size={20} />

              <Typography component="span" className="mx-1">
                Lorem ipsum
              </Typography>
            </button>

            <button className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Lorem ipsum
            </button>
          </Box>
        </Box>

        <Divider className="my-8 border-gray-200 dark:border-gray-700" />

        <Box className="flex flex-col items-center sm:flex-row sm:justify-between">
          <Typography
            variant="subtitle1"
            className="text-sm text-gray-500">
            © Copyright 2024. All Rights Reserved.
          </Typography>

          <Box className="flex mt-3 -mx-2 sm:mt-0">
            <Link
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300">
              Teams
            </Link>

            <Link
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300">
              Privacy
            </Link>

            <Link
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300">
              Cookies
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default Footer
