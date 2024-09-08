import {
  Box,
  Container,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoSearch } from 'react-icons/io5'
import { MdViewList, MdViewModule } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { GameCard } from '@/components'
import { MOCK_SEARCH_GAMES } from '@/mocks'
import { GameList } from '@/types'

import { Filters } from './modules'

export type SortField =
  | 'title'
  | 'hearts_count'
  | 'views_count'
  | 'release'

export interface SortState {
  field: SortField
  order: 'asc' | 'desc'
}

function Search() {
  const go = useNavigate()
  const { query = '' } = useParams()
  const [search, setSearch] = useState<string>(query)
  const [games, setGames] = useState<GameList[]>([])
  const [totalGames, setTotalGames] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [filters, setFilters] = useState<{
    Category?: string
    Genre?: string
    Platform?: string
  }>({
    Genre: '',
    Platform: '',
    Category: '',
  })
  const [sort, setSort] = useState<SortState>({
    field: 'title',
    order: 'asc',
  })

  const handleViewChange = (newView: 'grid' | 'list') => {
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 500)
  }

  const fetchGames = async () => {
    const filteredGames = MOCK_SEARCH_GAMES.filter(
      ({ categories, platforms, genres }) => {
        return (
          (!filters.Category ||
            categories.some(({ name }) => name === filters.Category)) &&
          (!filters.Genre ||
            genres.some(({ name }) => name === filters.Genre)) &&
          (!filters.Platform ||
            platforms.some(({ name }) => name === filters.Platform))
        )
      },
    )

    const sortedGames = filteredGames.sort((a, b) => {
      const aValue = a[sort.field]
      const bValue = b[sort.field]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else if (
        typeof aValue === 'number' &&
        typeof bValue === 'number'
      ) {
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    setGames(
      sortedGames.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      ),
    )
    setTotalGames(filteredGames.length)
  }

  useEffect(() => {
    fetchGames()
  }, [currentPage, pageSize, filters, sort])

  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSortChange = (field: SortField, order: 'asc' | 'desc') => {
    setSort({ field, order })
    setCurrentPage(1)
  }

  const handleSearch = () => {
    if (!search.trim() || search.trim() === '') {
      toast.error('Please, provide any characters to search')

      return
    }

    go(`/search/${search}`)
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value))
    setCurrentPage(1)
  }

  return (
    <Container maxWidth="xl" className="relative p-6 text-white">
      <Box className="flex flex-col justify-between items-center mb-6 gap-6">
        <Filters
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          sort={sort}
          onSortChange={handleSortChange}
        />
        <Box className="flex flex-col md:flex-row items-center w-full mb-2 gap-1">
          <Box className="relative w-full mb-4 md:mb-0">
            <input
              type="text"
              value={search}
              placeholder="Search for games..."
              onChange={({ target }) => setSearch(target.value)}
              className="w-full p-3 px-6 bg-transparent border border-gray-700 dark:text-white text-black rounded-full focus:outline-none focus:ring-4 focus:ring-theme-red-900 transition-all duration-300 shadow-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch()
              }}
            />
            <IconButton
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-theme-red-900 dark:hover:text-white hover:text-red-400 transition-colors duration-300">
              <IoSearch className="w-6 h-6" />
            </IconButton>
          </Box>
          <Box className="sm:flex hidden justify-center gap-1">
            <IconButton
              onClick={() => handleViewChange('list')}
              className={`${
                view === 'list' ? 'text-theme-red-900' : 'text-gray-400'
              } p-2 rounded-full hover:bg-gray-700 transition-all duration-300`}>
              <MdViewList className="w-6 h-6" />
            </IconButton>
            <IconButton
              onClick={() => handleViewChange('grid')}
              className={`${
                view === 'grid' ? 'text-theme-red-900' : 'text-gray-400'
              } p-2 rounded-full hover:bg-gray-700 transition-all duration-300`}>
              <MdViewModule className="w-6 h-6" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        className={`grid gap-6 transition-opacity duration-500 ease-in-out ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        } ${
          view === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}>
        {games.length > 0 ? (
          games.map((game) => (
            <GameCard key={game.id} game={game} view={view} />
          ))
        ) : (
          <Typography className="text-gray-400">
            No games found for the current filters.
          </Typography>
        )}
      </Box>

      <Box className="flex justify-end items-center mt-8">
        <Pagination
          count={Math.ceil(totalGames / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#ff4d4d',
              '&:hover': {
                color: '#fff',
                bgcolor: '#ff4d4d',
              },
            },
            '& .Mui-selected': {
              color: '#fff',
              bgcolor: '#ff4d4d !important',
            },
          }}
        />
      </Box>
    </Container>
  )
}

export default Search
