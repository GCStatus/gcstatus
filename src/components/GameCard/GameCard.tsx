import {
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoNotificationsOutline,
} from 'react-icons/io5'

import { GameList } from '@/types'
import { mapCrack } from '@/utils'

import { HeartButton, HeartsUp } from '..'

export interface GameCardProps {
  game: GameList
  view: 'list' | 'grid'
}

function GameCard(props: GameCardProps) {
  const { game, view } = props
  const [heartPops, setHeartPops] = useState<number[]>([])
  const [hearts, setHearts] = useState<number>(game.hearts_count)

  return (
    <>
      <Box className="fixed inset-0 pointer-events-none z-50">
        {heartPops.map((delay, index) => (
          <HeartsUp
            key={index}
            delay={delay}
            setHeartPops={setHeartPops}
          />
        ))}
      </Box>

      <Stack
        className={`${
          view === 'grid' ? 'w-full' : 'w-full flex flex-col sm:flex-row'
        } dark:bg-theme-dark-900 bg-gray-50 text-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 relative group`}
        style={{
          border: '2px solid #333',
          boxShadow: '0 0 20px rgba(0,0,0,0.8)',
        }}>
        <Box
          position="relative"
          className={`${view === 'list' ? 'sm:w-1/3' : ''} flex-shrink-0`}>
          {game.condition && game.condition !== 'commom' && (
            <Chip
              label={game.condition}
              className="absolute top-2 left-2 z-10 bg-gradient-to-r from-theme-red-900 to-yellow-500 text-sm font-bold text-white"
              style={{
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
              }}
            />
          )}
          <Box className="relative h-full overflow-hidden">
            <img
              loading="lazy"
              src={game.cover}
              alt={game.title}
              className={`object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ${view === 'grid' ? 'max-h-72' : 'sm:h-full h-auto'}`}
            />
            <Box className="absolute bottom-0 left-0 w-full px-4 py-2 flex md:flex-row flex-col md:text-left text-center justify-between items-center backdrop-blur-sm bg-gradient-to-r from-red-400 via-black to-black opacity-85">
              <Link href={`/games/${game.slug}`}>
                <Typography
                  variant="h6"
                  className="text-lg font-bold text-white transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-white hover:to-red-600 hover:bg-clip-text hover:text-transparent">
                  {game.title}
                </Typography>
              </Link>
              <Box className="flex items-center sm:flex-row flex-col sm:gap-2 gap-0">
                <Box display="flex" alignItems="center">
                  <HeartButton
                    type="icon"
                    setHearts={setHearts}
                    heartable_id={game.id}
                    heartable_type="games"
                    isHearted={game.is_hearted}
                    setHeartPops={setHeartPops}
                  />
                  <Typography variant="caption">{hearts}</Typography>
                </Box>
                <Box className="flex items-center gap-1">
                  <IoEyeOutline className="text-white" />
                  <Typography variant="caption">
                    {game.views_count}
                  </Typography>
                </Box>
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
          className={`flex flex-col justify-between ${
            view === 'list' ? 'sm:w-2/3' : ''
          } h-full gap-4`}>
          <Box className="flex flex-col flex-grow">
            <Typography variant="body2" className="text-gray-400">
              Release Date:{' '}
              {format(new Date(game.release_date), 'yyyy-MM-dd')}
            </Typography>
            <Box className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center my-2 sm:gap-1 gap-2 w-full">
              {game.platforms.map((platform) => (
                <Link
                  href={`/games/platforms/${platform.slug}`}
                  className="dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-400 bg-gray-300 dark:text-white text-black px-3 py-1 rounded-full sm:w-auto w-full text-center transition-colors duration-300"
                  key={platform.id}>
                  <Typography
                    component="span"
                    fontSize={13}
                    fontWeight="bold">
                    {platform.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>

          <Box className="flex flex-wrap gap-2 my-2 w-full mt-auto">
            {game.genres.map((genre) => (
              <Link href={`/games/genres/${genre.slug}`} key={genre.id}>
                <Chip
                  className="font-bold border border-theme-red-900 dark:text-gray-300 text-gray-700 sm:w-auto w-full hover:bg-theme-red-900 hover:text-white hover:border-none hover:outline-none"
                  label={genre.name}
                  variant="outlined"
                />
              </Link>
            ))}
          </Box>

          {game.crack ? (
            <Box className="flex flex-col gap-2 relative">
              {['cracked', 'cracked-oneday'].includes(
                game.crack.status.name,
              ) &&
                game.crack.cracker && (
                  <Box className="flex items-center gap-2">
                    <Typography
                      variant="body2"
                      className="font-bold text-gray-600 dark:text-gray-300"
                      style={{
                        transition: 'color 0.3s ease-in-out',
                      }}>
                      Cracked by:
                    </Typography>
                    <Typography
                      variant="body2"
                      className="font-bold dark:text-white text-gray-800">
                      <Link
                        href={`/crackers/${game.crack.cracker.slug}`}
                        className="hover:text-theme-red-900 transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer">
                        {game.crack.cracker.name}
                      </Link>
                    </Typography>
                  </Box>
                )}

              {game.crack.protection && (
                <Box className="flex items-center gap-2">
                  <Typography
                    variant="body2"
                    className="font-bold text-gray-600 dark:text-gray-300">
                    Protection:
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-bold dark:text-white text-gray-800">
                    <Link
                      href={`/games/protections/${game.crack.protection.slug}`}
                      className="hover:text-theme-red-900 transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer">
                      {game.crack.protection.name}
                    </Link>
                  </Typography>
                </Box>
              )}

              <Chip
                label={mapCrack[game.crack.status.name]}
                icon={
                  game.crack.status.name === 'uncracked' ? (
                    <IoCloseCircleOutline className="text-white" />
                  ) : (
                    <IoCheckmarkCircleOutline className="text-white" />
                  )
                }
                className={`font-bold px-3 py-1 rounded-md text-white ${
                  game.crack.status.name === 'uncracked'
                    ? 'bg-theme-red-900 animate-pulse'
                    : 'bg-green-500'
                }`}
                style={{
                  boxShadow: `0 4px 10px ${
                    game.crack.status.name === 'uncracked'
                      ? 'rgba(255, 77, 77, 0.5)'
                      : 'rgba(76, 175, 80, 0.5)'
                  }`,
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
            </Box>
          ) : (
            <Chip
              label="Crack not available yet"
              icon={<IoCloseCircleOutline className="text-white" />}
              className="font-bold px-3 py-1 rounded-md text-white bg-theme-red-900 animate-pulse"
              style={{
                boxShadow: '0 1px 4px rgba(255, 77, 77, 0.5)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          )}

          <Button
            fullWidth
            className="bg-theme-red-900 dark:bg-opacity-10 dark:hover:bg-opacity-40 bg-opacity-60 hover:bg-opacity-80 text-white transition-all"
            href={`/games/${game.slug}`}
            data-qa="more-btn">
            View more
          </Button>
        </Box>

        <Box
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, #ff1b6b, #45caff)',
            opacity: 0.1,
            transition: 'opacity 0.5s',
          }}
        />
      </Stack>
    </>
  )
}

export default GameCard
