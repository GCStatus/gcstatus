import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material'
import { format, isSameMonth, isSameYear } from 'date-fns'
import { useState } from 'react'

import { GameCard } from '@/components'
import { GameList } from '@/types'

interface UpcomingListProps {
  games: GameList[]
}

const ITEMS_PER_PAGE = 10

function UpcomingList(props: UpcomingListProps) {
  const { games } = props
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  )

  const months = Array.from({ length: 12 }, (_, i) => i)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 2 }, (_, i) => currentYear - i)

  const filteredGames = games.filter(
    (game) =>
      isSameMonth(
        new Date(game.release_date),
        new Date(selectedYear, selectedMonth),
      ) &&
      isSameYear(
        new Date(game.release_date),
        new Date(selectedYear, selectedMonth),
      ),
  )

  const totalGames = filteredGames.length
  const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE)
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page)
  }

  return (
    <Box className="mt-8">
      <Box className="flex sm:flex-row flex-col gap-4 mb-8">
        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value as number)
              setCurrentPage(1)
            }}
            label="Month">
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {format(new Date(2021, month), 'MMMM')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value as number)
              setCurrentPage(1)
            }}
            label="Year">
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="grid grid-cols-1 gap-4">
        {paginatedGames.length > 0 ? (
          paginatedGames.map((game) => (
            <GameCard key={game.id} game={game} view="list" />
          ))
        ) : (
          <Typography className="text-gray-500">
            No games found for this month and year.
          </Typography>
        )}
      </Box>

      <Box className="flex justify-end mt-4">
        <Pagination
          count={totalPages}
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
    </Box>
  )
}

export default UpcomingList
