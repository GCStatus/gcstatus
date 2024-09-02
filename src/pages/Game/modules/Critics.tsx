import { Box, Link, Typography } from '@mui/material'
import { format } from 'date-fns'

import { Critic } from '@/types'

interface CriticsProps {
  critic: Critic
}

function Critics(props: CriticsProps) {
  const { critic } = props

  return (
    <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg duration-500 relative flex items-center gap-4">
      <img
        src={critic.logo}
        alt={critic.name}
        className="w-16 h-16 object-contain rounded-full shadow-md"
      />
      <Box>
        <Typography
          variant="h2"
          className="sm:text-2xl text-xl font-bold dark:text-white text-black">
          {critic.name}
        </Typography>
        <Typography
          component="p"
          className="dark:text-gray-300 text-gray-700">
          Rate: {critic.rate}
        </Typography>
        <Typography
          component="p"
          className="dark:text-gray-300 text-gray-700">
          Date: {format(new Date(critic.created_at), 'LLL, dd yyyy')}
        </Typography>
        <Link
          href={critic.url}
          className="text-theme-red-900 underline hover:opacity-70 transition-opacity duration-300 hover:text-red-500"
          target="_blank"
          rel="noopener noreferrer">
          Read Critic
        </Link>
      </Box>
    </Box>
  )
}

export default Critics
