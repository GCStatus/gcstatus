import { Box, Link, Typography } from '@mui/material'
import { format } from 'date-fns'

import { Criticable } from '@/types'

interface CriticsProps {
  criticable: Criticable
}

function Critics(props: CriticsProps) {
  const { criticable } = props

  return (
    <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg duration-500 relative flex items-center gap-4 sm:flex-row flex-col sm:text-left text-center">
      <img
        src={criticable.critic.logo}
        alt={criticable.critic.name}
        className="w-16 h-16 object-contain rounded-full shadow-md"
      />
      <Box>
        <Typography
          variant="h2"
          className="sm:text-2xl text-xl font-bold dark:text-white text-black">
          {criticable.critic.name}
        </Typography>
        <Typography
          component="p"
          className="dark:text-gray-300 text-gray-700">
          Rate: {criticable.rate}
        </Typography>
        <Typography
          component="p"
          className="dark:text-gray-300 text-gray-700">
          Date: {format(new Date(criticable.posted_at), 'LLL, dd yyyy')}
        </Typography>
        <Link
          href={criticable.url}
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
