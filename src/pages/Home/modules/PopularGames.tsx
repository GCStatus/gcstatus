import {
  Box,
  Container,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { MdViewList, MdViewModule } from 'react-icons/md'

import { GameCard } from '@/components'
import { GameList } from '@/types'

import { filteredGamesFn } from './helper'

interface PopularGamesProps {
  games: GameList[]
}

function PopularGames(props: PopularGamesProps) {
  const { games } = props
  const [search, setSearch] = useState<string>('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const handleViewChange = (newView: 'grid' | 'list') => {
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 500)
  }

  const filteres = filteredGamesFn(games, search)

  return (
    <Container maxWidth="xl" className="relative p-6" component="section">
      <Box component="section">
        <Box className="absolute inset-0 pointer-events-none">
          <Box className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-theme-red-900 to-transparent rounded-full blur-2xl opacity-50 animate-pulse" />
          <Box className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-l from-yellow-500 to-transparent rounded-full blur-2xl opacity-50 animate-pulse" />
        </Box>

        <Box className="relative z-10 w-full flex justify-between items-center mb-10 md:flex-row flex-col md:gap-0 gap-8">
          <Link href="games/popular">
            <Typography
              variant="h4"
              className="text-white font-extrabold tracking-widest hot-neon-text relative animate-pulse">
              POPULAR GAMES
            </Typography>
          </Link>
          <Box className="flex items-center md:flex-row flex-col md:gap-0 gap-4 md:w-auto w-full">
            <input
              type="text"
              className="w-full p-2 px-4 border-2 border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-theme-red-900 transition-all outline-none duration-300 focus:~ .container .text-white::after { transform: scaleX(0); }"
              placeholder="Search..."
              onChange={({ target }) => setSearch(target.value)}
            />
            <Box className="sm:flex hidden items-center">
              <IconButton
                onClick={() => handleViewChange('list')}
                className={`${
                  view === 'list' ? 'text-theme-red-900' : 'text-white'
                } transition-all`}>
                <MdViewList />
              </IconButton>
              <IconButton
                onClick={() => handleViewChange('grid')}
                className={`${
                  view === 'grid' ? 'text-theme-red-900' : 'text-white'
                } transition-all`}>
                <MdViewModule />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          className={`grid transition-opacity duration-500 ease-in-out ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          } ${view === 'grid' ? 'lg:grid-cols-3 sm:grid-cols-2 grid-cols-1' : 'grid-cols-1'} gap-6`}>
          {filteres.length > 0 ? (
            filteres.map((game) => (
              <GameCard key={game.id} game={game} view={view} />
            ))
          ) : (
            <Typography>Ops... No one game was found.</Typography>
          )}
        </Box>
      </Box>

      <Link
        href="games/popular"
        className="flex justify-center p-4 mt-6 border border-theme-red-900 sm:max-w-48 w-full mx-auto rounded-lg hover:bg-theme-red-900 transition duration-500 dark:text-white text-black hover:text-white">
        See more...
      </Link>
    </Container>
  )
}

export default PopularGames
