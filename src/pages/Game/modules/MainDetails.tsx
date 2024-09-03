import {
  Box,
  Chip,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { IoEyeOutline, IoHeartOutline } from 'react-icons/io5'

import { GameDetails } from '@/types'

interface MainDetailsProps {
  game: GameDetails
}

function MainDetails(props: MainDetailsProps) {
  const { game } = props

  return (
    <>
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
          <Typography
            variant="h2"
            className="sm:text-2xl text-xl sm:text-left text-center font-bold mb-4 dark:text-white text-black">
            Info
          </Typography>
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
                className="px-2 py-1 bg-red-500 text-white rounded-full">
                {game.age}+
              </Typography>
            </Box>
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography
                component="span"
                className="inline-block font-bold dark:text-white text-black">
                Protection:
              </Typography>
              <Typography component="span" className="text-lg">
                {game.crack.protection.name}
              </Typography>
            </Box>
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography
                component="span"
                className="inline-block font-bold dark:text-white text-black">
                Status:
              </Typography>
              <Chip
                label={game.crack.status}
                className={`${game.crack.status === 'Cracked' ? 'bg-green-500' : 'bg-red-500'} text-white`}
              />
            </Box>
            {game.crack.torrent && (
              <Box className="flex sm:flex-row flex-col items-center gap-1">
                <Typography
                  component="span"
                  className="inline-block font-bold dark:text-white text-black">
                  Torrent:
                </Typography>
                <Typography component="span" className="text-lg">
                  {game.crack.torrent}
                </Typography>
              </Box>
            )}
            {game.crack.by && (
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
              <Typography component="span">
                <IoHeartOutline
                  className="text-theme-red-900 animate-pulse"
                  size={28}
                />
              </Typography>
              {game.hearts_count}
            </Box>
            <Box className="flex sm:flex-row flex-col items-center gap-1">
              <Typography component="span">
                <IoEyeOutline size={28} />
              </Typography>
              {game.views_count}
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
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 dark:text-white text-black">
            Genres
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
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 dark:text-white text-black">
            Categories
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
        </Box>

        <Box className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] duration-500 relative">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 dark:text-white text-black">
            Developers
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
            {game.developers.map((developer) => (
              <ListItem disableGutters disablePadding key={developer.id}>
                {developer.name}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box
        component="section"
        className="text-lg leading-relaxed text-center animate-fade-in w-full flex flex-col items-center gap-2"
        dangerouslySetInnerHTML={{ __html: game.about }}
      />
    </>
  )
}

export default MainDetails
