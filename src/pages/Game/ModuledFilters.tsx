import {
  Box,
  Container,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { MdViewList, MdViewModule } from 'react-icons/md'

import { GameCard } from '@/components'
import { SortField, SortState } from '@/hooks/useGames'
import { GameList } from '@/types'

import { Filters } from './modules'

interface ModuledFiltersProps {
  games: GameList[]
  currentPage: number
  pageSize: number
  sort: SortState
  view: 'grid' | 'list'
  isAnimating: boolean
  onViewChange: (view: 'grid' | 'list') => void
  onPageChange: (_: ChangeEvent<unknown>, newPage: number) => void
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onSortChange: (field: SortField, order: 'asc' | 'desc') => void
}

function ModuledFilters(props: ModuledFiltersProps) {
  const {
    games,
    currentPage,
    pageSize,
    sort,
    view,
    isAnimating,
    onViewChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
  } = props
  const [totalGames, setTotalGames] = useState<number>(0)
  const [displayedGames, setDisplayedGames] = useState<GameList[]>(games)
  const [filters, setFilters] = useState<{
    Crack: string
    Protection: string
  }>({
    Crack: 'all',
    Protection: 'all',
  })

  const applyFiltersAndSort = () => {
    const { Crack, Protection } = filters

    const isAll = (filter: string) => filter === 'all'

    const filterMap: { [key: string]: (item: GameList) => boolean } = {
      Crack: ({ crack }) => {
        if (isAll(Crack)) return true

        if (Crack === 'uncracked') {
          return !crack || crack.status.name === 'uncracked'
        }

        if (Crack === 'cracked') {
          return (
            !!crack &&
            ['cracked', 'cracked-oneday'].includes(crack.status.name)
          )
        }

        return false
      },
      Protection: ({ crack }) =>
        isAll(Protection) || crack?.protection.name === Protection,
    }

    const filteredGames = games.filter((game) =>
      Object.values(filterMap).every((filterFn) => filterFn(game)),
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

    setTotalGames(sortedGames.length)
    setDisplayedGames(
      sortedGames.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      ),
    )
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    onPageChange(undefined as unknown as ChangeEvent<unknown>, 1)
  }

  useEffect(() => {
    applyFiltersAndSort()
  }, [currentPage, pageSize, filters, sort, games])

  return (
    <Container maxWidth="xl" className="relative p-6 text-white">
      <Box className="flex flex-col justify-between items-center mb-6 gap-6">
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          games={games}
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
          sort={sort}
          onSortChange={onSortChange}
        />
        <Box className="flex flex-col md:flex-row md:justify-end items-center w-full mb-2 gap-1">
          <Box className="sm:flex hidden justify-center gap-1">
            <IconButton
              onClick={() => onViewChange('list')}
              className={`${view === 'list' ? 'text-theme-red-900' : 'text-gray-400'} p-2 rounded-full hover:bg-gray-700 transition-all duration-300`}>
              <MdViewList className="w-6 h-6" />
            </IconButton>
            <IconButton
              onClick={() => onViewChange('grid')}
              className={`${view === 'grid' ? 'text-theme-red-900' : 'text-gray-400'} p-2 rounded-full hover:bg-gray-700 transition-all duration-300`}>
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
        {displayedGames.length > 0 ? (
          displayedGames.map((game) => (
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
          onChange={onPageChange}
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

export default ModuledFilters
