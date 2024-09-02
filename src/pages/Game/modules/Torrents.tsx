import { Box, Link, Typography } from '@mui/material'
import { format } from 'date-fns'

import { Torrent } from '@/types'

interface TorrentsProps {
  torrent: Torrent
}

function Torrents(props: TorrentsProps) {
  const { torrent } = props

  return (
    <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg duration-500 relative flex items-center gap-4 sm:flex-row flex-col sm:text-left text-center">
      <Box className="flex flex-col gap-4 w-full">
        <Box className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-4">
          <Typography
            variant="h2"
            className="font-bold sm:text-2xl text-xl ">
            <Link href={torrent.url} target="_blank" className="underline">
              {torrent.provider.name}
            </Link>
          </Typography>
          <Typography
            component="p"
            className="dark:text-gray-300 text-gray-700">
            Posted at:{' '}
            {format(new Date(torrent.posted_in), 'LLL, dd yyyy')}
          </Typography>
        </Box>
        <Link
          href={torrent.url}
          className="text-theme-red-900 underline hover:opacity-70 transition-opacity duration-300 hover:text-red-500"
          target="_blank"
          rel="noopener noreferrer">
          Go to torrent
        </Link>
      </Box>
    </Box>
  )
}

export default Torrents
