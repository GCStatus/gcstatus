import { Box, Link, Typography } from '@mui/material'

import { GameStore } from '@/types'

interface AvailablesProps {
  gameStore: GameStore
}

function Availables(props: AvailablesProps) {
  const { gameStore } = props

  return (
    <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg duration-500 relative flex items-center gap-4 sm:flex-row flex-col sm:text-left text-center">
      <img
        src={gameStore.store.logo}
        alt={gameStore.store.name}
        className="w-16 h-16 object-contain rounded-full shadow-md"
      />
      <Box className="flex sm:justify-between justify-center sm:text-left text-center sm:gap-0 gap-4 sm:flex-row flex-col items-center w-full">
        <Box>
          <Typography
            variant="h2"
            className="font-bold sm:text-2xl text-xl ">
            <Link
              target="_blank"
              href={`/companies/${gameStore.store.slug}`}
              className="dark:text-white text-black">
              {gameStore.store.name}
            </Link>
          </Typography>
          <Typography
            component="p"
            className="dark:text-gray-300 text-gray-700">
            Price:{' '}
            {(gameStore.price / 100).toLocaleString('en-US', {
              currency: 'USD',
              style: 'currency',
            })}
          </Typography>
        </Box>
        <Link
          href={gameStore.url}
          className="text-theme-red-900 underline hover:opacity-70 transition-opacity duration-300 hover:text-red-500"
          target="_blank"
          rel="noopener noreferrer">
          Buy Now
        </Link>
      </Box>
    </Box>
  )
}

export default Availables
