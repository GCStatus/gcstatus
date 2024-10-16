import {
  Box,
  Chip,
  IconButton,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { IoEyeOutline, IoHeart, IoHeartOutline } from 'react-icons/io5'

import { HeartsUp } from '@/components'
import { GameDetails } from '@/types'
import { mapCrack } from '@/utils'

interface MainDetailsProps {
  game: GameDetails
}

function MainDetails(props: MainDetailsProps) {
  const { game } = props
  const [hearts, setHearts] = useState<number>(game.hearts_count)
  const [isHearted, setIsHearted] = useState<boolean>(game.is_hearted)
  const [heartPops, setHeartPops] = useState<number[]>([])

  const handleHeartClick = () => {
    setIsHearted((prev) => !prev)

    setHearts(hearts + (isHearted ? -1 : 1))

    if (!isHearted) {
      const newHearts = Array.from({ length: 10 }, (_, i) => i * 10)

      setHeartPops((prev) => [...prev, ...newHearts])
    }
  }

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

      <Box
        component="span"
        className="flex flex-col md:flex-row relative sm:gap-4 gap-4 mb-4">
        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-bold mb-4 dark:text-white text-black">
            Short Description
          </Typography>
          <Typography className="leading-relaxed dark:text-gray-300 text-gray-700">
            {game.short_description}
          </Typography>
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Box className="flex sm:flex-row flex-col justify-between">
            <Typography
              variant="h2"
              className="sm:text-2xl text-xl sm:text-left text-center font-bold mb-4 dark:text-white text-black">
              Info
            </Typography>
            <Box className="flex sm:flex-row flex-col sm:mb-0 mb-4 items-center gap-1">
              <Typography component="span">
                <IoEyeOutline size={24} />
              </Typography>
              {game.views_count}
            </Box>
          </Box>
          <Box className="flex flex-col gap-4">
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography
                component="span"
                className="inline-block font-bold dark:text-white text-black">
                Website:
              </Typography>
              <Tooltip title="Go to game official website">
                <Link
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Typography className="text-theme-red-900 underline hover:opacity-70 transition-opacity duration-300 hover:text-red-500 break-all">
                    {game.website}
                  </Typography>
                </Link>
              </Tooltip>
            </Box>
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography
                component="span"
                className="inline-block font-bold dark:text-white text-black">
                Age Rating:
              </Typography>
              <Typography
                component="span"
                className={`px-2 py-1 ${game.age > 0 ? 'bg-red-500' : 'bg-green-500'} text-white rounded-full`}>
                {game.age > 0 ? `${game.age}+` : 'G'}
              </Typography>
            </Box>
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography
                component="span"
                className="inline-block font-bold dark:text-white text-black">
                Protection:
              </Typography>
              <Typography component="span" className="text-lg">
                {game.crack ? game.crack.protection.name : 'Not available'}
              </Typography>
            </Box>
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography
                component="span"
                className="inline-block font-bold dark:text-white text-black">
                Status:
              </Typography>
              {game.crack ? (
                <Chip
                  label={mapCrack[game.crack.status]}
                  className={`${game.crack.status === 'cracked' || game.crack.status === 'cracked-oneday' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                />
              ) : (
                <Chip
                  label="Crack not available"
                  className="bg-red-500 text-white"
                />
              )}
            </Box>
            {game.crack && game.crack.by && (
              <Box className="flex sm:flex-row flex-col items-center gap-1">
                <Typography
                  component="span"
                  className="inline-block font-bold dark:text-white text-black">
                  Cracked By:
                </Typography>
                <Typography component="span" className="text-lg">
                  {game.crack.by.name}
                </Typography>
              </Box>
            )}
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <IconButton sx={{ padding: 0.5 }} onClick={handleHeartClick}>
                {isHearted ? (
                  <IoHeart
                    className="text-theme-red-900 animate-pulse"
                    size={28}
                  />
                ) : (
                  <IoHeartOutline className="text-white" size={28} />
                )}
              </IconButton>
              {hearts}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="span"
        className="flex flex-col md:flex-row relative sm:gap-4 gap-4 mb-4">
        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-bold mb-4 dark:text-white text-black">
            Platforms
          </Typography>
          {game.platforms.length > 0 ? (
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.platforms.map((platform) => (
                <ListItem disableGutters disablePadding key={platform.id}>
                  <Link
                    href={`/platforms/${platform.slug}`}
                    target="_blank"
                    className="dark:text-gray-200 text-black">
                    {platform.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No one genre related.</Typography>
          )}
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 dark:text-white text-black">
            Genres
          </Typography>
          {game.genres.length > 0 ? (
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.genres.map((genre) => (
                <ListItem disableGutters disablePadding key={genre.id}>
                  <Link
                    href={`/genres/${genre.slug}`}
                    target="_blank"
                    className="dark:text-gray-200 text-black">
                    {genre.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No one genre related.</Typography>
          )}
        </Box>
      </Box>

      <Box
        component="span"
        className="flex flex-col md:flex-row relative sm:gap-4 gap-4 mb-4">
        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-bold mb-4 dark:text-white text-black">
            Tags
          </Typography>
          {game.tags.length > 0 ? (
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.tags.map((tag) => (
                <ListItem disableGutters disablePadding key={tag.id}>
                  <Link
                    href={`/tags/${tag.slug}`}
                    target="_blank"
                    className="dark:text-gray-200 text-black">
                    {tag.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No one tag related.</Typography>
          )}
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 dark:text-white text-black">
            Categories
          </Typography>
          {game.categories.length > 0 ? (
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.categories.map((category) => (
                <ListItem disableGutters disablePadding key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    target="_blank"
                    className="dark:text-gray-200 text-black">
                    {category.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No one category related.</Typography>
          )}
        </Box>
      </Box>

      <Box
        component="span"
        className="flex flex-col md:flex-row relative sm:gap-4 gap-4 mb-4">
        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl font-bold mb-4 dark:text-white text-black">
            Publishers
          </Typography>
          {game.publishers.length > 0 ? (
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.publishers.map((publisher) => (
                <ListItem disableGutters disablePadding key={publisher.id}>
                  {publisher.name}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No one publisher related.</Typography>
          )}
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 dark:text-white text-black">
            Developers
          </Typography>
          {game.developers.length > 0 ? (
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.developers.map((developer) => (
                <ListItem disableGutters disablePadding key={developer.id}>
                  {developer.name}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No one developer related.</Typography>
          )}
        </Box>
      </Box>

      {game.support && (
        <Box component="span" className="mb-4">
          <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
            <Typography
              variant="h2"
              className="sm:text-2xl text-xl font-bold mb-4 dark:text-white text-black">
              Support
            </Typography>
            <List
              disablePadding
              className="dark:text-gray-300 text-black"
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}>
              {game.support.email && (
                <ListItem disableGutters disablePadding>
                  Email:{' '}
                  <Link
                    href={`mailto:${game.support.email}`}
                    className="underline text-red-500 hover:opacity-70 transition-all duration-300">
                    {game.support.email}
                  </Link>
                </ListItem>
              )}
              {game.support.url && (
                <ListItem disableGutters disablePadding>
                  Website:{' '}
                  <Link
                    href={game.support.url}
                    className="underline text-red-500 hover:opacity-70 transition-all duration-300">
                    {game.support.url}
                  </Link>
                </ListItem>
              )}
            </List>
          </Box>
        </Box>
      )}

      <Box
        component="section"
        className="text-lg leading-relaxed text-center animate-fade-in w-full flex flex-col items-center gap-2"
        dangerouslySetInnerHTML={{ __html: game.about }}
      />
    </>
  )
}

export default MainDetails
