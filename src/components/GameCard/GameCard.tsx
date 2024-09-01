import {
  Box,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { IoHeartOutline, IoNotificationsOutline } from 'react-icons/io5'

import { GameList } from '@/types'

interface GameCardProps {
  game: GameList
  view: 'list' | 'grid'
}

function GameCard(props: GameCardProps) {
  const { game, view } = props

  return (
    <Stack
      className={`${
        view === 'grid' ? 'w-full' : 'w-full flex flex-col sm:flex-row'
      } dark:bg-theme-dark-900 bg-gray-50 text-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative group`}
      style={{
        border: '2px solid #333',
        boxShadow: '0 0 20px rgba(0,0,0,0.8)',
      }}>
      <Box
        position="relative"
        className={view === 'list' ? 'sm:w-1/3' : ''}>
        {game.badge && (
          <Chip
            label={game.badge}
            className="absolute top-2 left-2 z-10 bg-gradient-to-r from-theme-red-900 to-yellow-500 text-sm font-bold"
            style={{
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
            }}
          />
        )}
        <Box position="relative" className="overflow-hidden">
          <img
            src={game.cover}
            alt={game.title}
            width={view === 'grid' ? 500 : 300}
            height={view === 'grid' ? 300 : 200}
            className={`object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ${view === 'grid' ? 'max-h-64' : 'max-h-80'}`}
          />
          <Box className="absolute bottom-0 left-0 w-full px-4 py-2 flex justify-between items-center backdrop-blur-sm bg-gradient-to-r from-black via-black to-red-400 opacity-85">
            <Link href={`games/${game.slug}`}>
              <Typography
                variant="h6"
                className="text-lg font-bold text-white hover:text-theme-red-900 transition duration-500">
                {game.title}
              </Typography>
            </Link>
            <Box display="flex" alignItems="center">
              <IconButton aria-label="heart" color="primary" size="small">
                <IoHeartOutline className="text-white" />
              </IconButton>
              <Typography variant="caption">
                {game.hearts_count}
              </Typography>
            </Box>
          </Box>
          <IconButton
            aria-label="notifications"
            className="absolute top-1 right-1 z-10">
            <IoNotificationsOutline
              className="animate-pulse text-white"
              size={24}
            />
          </IconButton>
        </Box>
      </Box>

      <Box
        padding={2}
        className={`flex flex-col justify-between ${view === 'list' ? 'sm:w-2/3' : ''} h-full gap-4`}>
        <Box className="flex flex-col flex-grow">
          <Typography variant="body2" className="text-gray-400">
            Release Date: {game.release}
          </Typography>
          <Box className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center my-2 sm:gap-1 gap-2 w-full">
            {game.platforms.map((platform) => (
              <Link
                href={`platforms/${platform.slug}`}
                className="bg-gray-800 px-3 py-1 rounded-full sm:w-auto w-full text-center"
                key={platform.id}>
                <Typography component="span" fontSize={13}>
                  {platform.name}
                </Typography>
              </Link>
            ))}
          </Box>

          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold">
              {game.sale ? (
                <div className="flex flex-col">
                  <span className="text-red-500 line-through">
                    {game.best_price}
                  </span>
                  <span className="text-white">{game.best_price}</span>
                </div>
              ) : (
                game.best_price
              )}
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-wrap gap-2 my-2 w-full mt-auto">
          {game.genres.map((genre) => (
            <Link href={`genres/${genre.slug}`} key={genre.id}>
              <Chip
                className="font-bold border border-theme-red-900 text-theme-red-900 sm:w-auto w-full"
                label={genre.name}
                variant="outlined"
              />
            </Link>
          ))}
        </Box>
      </Box>

      <Box
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, #ff1b6b, #45caff)',
          opacity: 0.1,
          transition: 'opacity 0.5s',
        }}></Box>
    </Stack>
  )
}

export default GameCard
