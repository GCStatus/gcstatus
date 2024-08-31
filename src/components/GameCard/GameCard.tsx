import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { IoHeartOutline, IoNotificationsOutline } from 'react-icons/io5'

interface GameCardProps {
  thumbnail: string
  title: string
  price: string
  release: string
  platforms: string[]
  tags: string[]
  sale?: boolean
  badge: string
  isHot?: boolean
  hearts: number
  view: 'grid' | 'list'
}

function GameCard(props: GameCardProps) {
  const {
    thumbnail,
    title,
    price,
    release,
    platforms,
    tags,
    sale = false,
    badge,
    hearts = 0,
    view,
  } = props

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
        {badge && (
          <Chip
            label={badge}
            className="absolute top-2 left-2 z-10 bg-gradient-to-r from-theme-red-900 to-yellow-500 text-sm font-bold"
            style={{
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
            }}
          />
        )}
        <Box position="relative" className="overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            width={view === 'grid' ? 500 : 300}
            height={view === 'grid' ? 300 : 200}
            className={`object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ${view === 'grid' ? 'max-h-64' : 'max-h-80'}`}
          />
          <Box className="absolute bottom-0 left-0 w-full px-4 py-2 flex justify-between items-center backdrop-blur-sm bg-gradient-to-r from-black via-black to-red-400 opacity-85">
            <Typography
              variant="h6"
              className="text-lg font-bold text-white">
              {title}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton aria-label="heart" color="primary" size="small">
                <IoHeartOutline className="text-white" />
              </IconButton>
              <Typography variant="caption">{hearts}</Typography>
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
            Release Date: {release}
          </Typography>
          <Box className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center my-2 sm:gap-1 gap-2 w-full">
            {platforms.map((platform, i) => (
              <Box
                component="span"
                className="bg-gray-800 px-3 py-1 rounded-full sm:w-auto w-full text-center"
                fontSize={13}
                key={i}>
                {platform}
              </Box>
            ))}
          </Box>

          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold">
              {sale ? (
                <div className="flex flex-col">
                  <span className="text-red-500 line-through">
                    {price}
                  </span>
                  <span className="text-white">{price}</span>
                </div>
              ) : (
                price
              )}
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-wrap gap-2 my-2 w-full mt-auto">
          {tags.map((tag) => (
            <Chip
              className="font-bold border border-theme-red-900 text-theme-red-900 sm:w-auto w-full"
              key={tag}
              label={tag}
              variant="outlined"
            />
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
