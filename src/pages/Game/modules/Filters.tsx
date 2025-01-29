import { Box } from '@mui/material'
import { ChangeEvent } from 'react'

import { Select } from '@/components'
import { SortField } from '@/hooks/useGames'
import { GameList } from '@/types'

interface FiltersProps {
  filters: {
    Crack: string
    Protection: string
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
    sort,
    onSortChange,
    pageSize,
    onPageSizeChange,
    filters,
    onFilterChange,
  } = props

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

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    onFilterChange({
      ...filters,
      [name]: value,
    })
  }

  const protections = Array.from(
    new Set(games.flatMap(({ crack }) => crack?.protection.name)),
  ).filter(Boolean)

  return (
    <Box className="flex flex-col gap-4 items-center justify-between w-full p-6 dark:bg-theme-dark-900 bg-gray-300 bg-opacity-30 rounded-xl shadow-xl transition-all duration-500 ease-in-out">
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

      <Box className="grid sm:grid-cols-2 grid-cols-1 gap-3 w-full">
        <Select
          isFull
          label="Crack"
          defaultValue={filters.Crack}
          onChange={handleFilterChange}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Cracked', value: 'cracked' },
            { label: 'Uncracked', value: 'uncracked' },
          ]}
        />

        <Select
          isFull
          label="Protection"
          defaultValue={filters.Protection}
          onChange={handleFilterChange}
          options={[
            {
              label: 'All',
              value: 'all',
            },
            ...protections.map((c) => ({
              label: c as string,
              value: c as string,
            })),
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
