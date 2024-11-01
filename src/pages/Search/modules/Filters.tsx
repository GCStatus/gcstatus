import { Box } from '@mui/material'
import { ChangeEvent } from 'react'

import { Select } from '@/components'
import { GameList } from '@/types'

import { SortField } from '../Search'

interface FiltersProps {
  filters: {
    Category?: string
    Genre?: string
    Platform?: string
  }
  onFilterChange: (filters: any) => void
  sort: { field: string; order: 'asc' | 'desc' }
  onSortChange: (field: SortField, order: 'asc' | 'desc') => void
  pageSize: number
  onPageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void
  games: GameList[]
}

function Filters(props: FiltersProps) {
  const {
    games,
    filters,
    onFilterChange,
    sort,
    onSortChange,
    pageSize,
    onPageSizeChange,
  } = props

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    onFilterChange({
      ...filters,
      [name]: value,
    })
  }

  const handleSortFieldChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const field = event.target.value as SortField
    onSortChange(field, sort.order)
  }

  const handleSortOrderChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const order = event.target.value as 'asc' | 'desc'
    onSortChange(sort.field as SortField, order)
  }

  const categories = Array.from(
    new Set(
      games.flatMap((game) =>
        game.categories.map((category) => category.name),
      ),
    ),
  )

  const platforms = Array.from(
    new Set(
      games.flatMap((game) =>
        game.platforms.map((platform) => platform.name),
      ),
    ),
  )

  const genres = Array.from(
    new Set(
      games.flatMap((game) => game.genres.map((genre) => genre.name)),
    ),
  )

  return (
    <Box className="flex flex-col gap-4 items-center justify-between w-full p-6 dark:bg-theme-dark-900 bg-gray-300 bg-opacity-30 rounded-xl shadow-xl transition-all duration-500 ease-in-out">
      <Box className="grid sm:grid-cols-3 grid-cols-1 gap-3 w-full">
        <Select
          isFull
          label="Category"
          defaultValue={filters.Category}
          onChange={handleFilterChange}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            ...categories.map((c) => ({
              label: c,
              value: c,
            })),
          ]}
        />

        <Select
          isFull
          label="Genre"
          defaultValue={filters.Genre}
          onChange={handleFilterChange}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            ...genres.map((c) => ({
              label: c,
              value: c,
            })),
          ]}
        />

        <Select
          isFull
          label="Platform"
          defaultValue={filters.Platform}
          onChange={handleFilterChange}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            ...platforms.map((c) => ({
              label: c,
              value: c,
            })),
          ]}
        />
      </Box>

      <Box className="grid sm:grid-cols-2 grid-cols-1 gap-3 w-full">
        <Select
          isFull
          label="Sort By"
          defaultValue={sort.field}
          onChange={handleSortFieldChange}
          options={[
            { label: 'Title', value: 'title' },
            { label: 'Hearts', value: 'hearts_count' },
            { label: 'Views', value: 'views_count' },
            { label: 'Release Date', value: 'release_date' },
          ]}
        />

        <Select
          isFull
          label="Order By"
          defaultValue={sort.order}
          onChange={handleSortOrderChange}
          options={[
            { label: 'Ascending', value: 'asc' },
            { label: 'Descending', value: 'desc' },
          ]}
        />
      </Box>

      <Select
        isFull
        label="Items per page"
        defaultValue={pageSize}
        onChange={onPageSizeChange}
        options={[
          { label: '12', value: '12' },
          { label: '24', value: '24' },
          { label: '36', value: '36' },
          { label: '54', value: '54' },
          { label: '100', value: '100' },
        ]}
      />
    </Box>
  )
}

export default Filters
