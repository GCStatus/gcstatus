import { Box, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { MdViewList, MdViewModule } from 'react-icons/md'

import { GameCard } from '@/components'
import { removeDiacritics as rd } from '@/utils'

import { MOCK_GAMES } from './mocks'

function Home() {
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

  const filteredGamesFn = (games: any[]) => {
    let filtered: any[] = games

    if (search && search.trim() !== '') {
      const searchWords = rd(search).toLowerCase().split(' ')

      filtered = filtered.filter(({ title, description }) => {
        const contentName = rd(title).toLowerCase()
        const contentDesc = rd(description || '').toLowerCase()

        return searchWords.every(
          (word) =>
            contentName.includes(word) || contentDesc.includes(word),
        )
      })
    }

    return filtered
  }

  const games = filteredGamesFn(MOCK_GAMES)

  return (
    <Box className="container mx-auto p-6">
      <Box className="absolute inset-0 pointer-events-none">
        <Box className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-yellow-500 to-transparent rounded-full blur-2xl opacity-50 animate-pulse" />
        <Box className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-l from-green-500 to-transparent rounded-full blur-2xl opacity-50 animate-pulse" />
      </Box>

      <Box className="relative z-10 w-full flex justify-between items-center mb-10 md:flex-row flex-col md:gap-0 gap-8">
        <Typography
          variant="h4"
          className="text-white font-extrabold tracking-widest hot-neon-text relative animate-pulse">
          HOT GAMES
        </Typography>
        <Box className="flex items-center md:flex-row flex-col md:gap-0 gap-4">
          <input
            type="text"
            className="w-full p-2 px-4 border-2 border-gray-600 bg-transparent text-white rounded-full focus:outline-none focus:ring-2 focus:ring-theme-red-900 transition-all outline-none duration-300 focus:~ .container .text-white::after { transform: scaleX(0); }"
            placeholder="Search..."
            onChange={({ target }) => setSearch(target.value)}
          />
          <Box className="flex items-center">
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
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game.id} {...game} view={view} />
          ))
        ) : (
          <Typography>Ops... No one game was found.</Typography>
        )}
      </Box>
    </Box>
  )
}

export default Home
