import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { format, isSameMonth, isSameYear } from 'date-fns'
import { useState } from 'react'

import { GameCard } from '@/components'
import { GameList } from '@/types'

interface UpcomingListProps {
  games: GameList[]
}

function UpcomingList(props: UpcomingListProps) {
  const { games } = props
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  )

  const months = Array.from({ length: 12 }, (_, i) => i)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  const filteredGames = games.filter(
    (game) =>
      isSameMonth(
        new Date(game.release),
        new Date(selectedYear, selectedMonth),
      ) &&
      isSameYear(
        new Date(game.release),
        new Date(selectedYear, selectedMonth),
      ),
  )

  return (
    <Box className="mt-8">
      <Box className="flex sm:flex-row flex-col gap-4 mb-8">
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value as number)}
            label="Month">
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {format(new Date(2021, month), 'MMMM')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value as number)}
            label="Year">
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div className="grid grid-cols-1 gap-4">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} view="list" />
          ))
        ) : (
          <p className="text-gray-500">
            No games found for this month and year.
          </p>
        )}
      </div>
    </Box>
  )
}

export default UpcomingList
