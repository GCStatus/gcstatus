import {
  Box,
  Chip,
  CircularProgress,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { format, isSameDay, parseISO } from 'date-fns'
import { useState } from 'react'
import { CalendarProps } from 'react-calendar'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@/components'
import { useTheme } from '@/hooks'
import { useCalendarGamesQuery } from '@/services/api'

import { StyledCalendar, StyledCalendarLight } from './Calendar.styles'
import { UpcomingList } from './modules'

type Detail = 'month' | 'year' | 'decade' | 'century'

interface CalendarTileProperties {
  activeStartDate: Date
  date: Date
  view: Detail
}

function Calendar() {
  const mode = useTheme()
  const go = useNavigate()
  const [date, setDate] = useState(new Date())
  const isMobile = useMediaQuery('(max-width: 490px)')
  const { games, isLoading } = useCalendarGamesQuery(undefined, {
    selectFromResult: ({ data = [], isLoading, isFetching }) => ({
      games: data,
      isLoading: isLoading || isFetching,
    }),
  })

  const currentDate = new Date()

  const getTileContent = ({ date, view }: CalendarTileProperties) => {
    const appointment = games.filter((game) =>
      isSameDay(parseISO(game.release_date), date),
    )

    if (!appointment || view !== 'month') return null

    return (
      <Box
        sx={{
          padding: isMobile ? '0.25rem' : '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
        {appointment.map((item) => (
          <Tooltip
            title={`${item.title} - ${format(parseISO(item.release_date), 'yyyy-MM-dd')}`}
            sx={{ display: 'block' }}
            disableInteractive
            key={item.id}>
            <Chip
              className="group"
              onClick={() => go(`/games/${item.slug}`)}
              sx={{
                width: 'auto',
                marginBottom: isMobile ? '0.15rem' : '0.25rem',
                backgroundColor: ({ palette }) =>
                  palette.background.default,
                '&:hover': {
                  backgroundColor: ({ palette }) => palette.action.active,
                  color: ({ palette }) => palette.primary.contrastText,
                },
              }}
              label={
                <Box className="flex items-center gap-1">
                  {item.title}
                  {item.crack &&
                    ['cracked', 'cracked-oneday'].includes(
                      item.crack.status.name,
                    ) && (
                      <Tooltip title="Crack is available" arrow>
                        <Box component="span">
                          <Icon
                            name="IoCheckmarkCircleOutline"
                            className="group-hover:text-green-600 text-green-400 mb-0.5"
                            size={14}
                          />
                        </Box>
                      </Tooltip>
                    )}
                </Box>
              }
            />
          </Tooltip>
        ))}
      </Box>
    )
  }

  const props: CalendarProps = {
    locale: 'en-US',
    minDetail: 'year',
    tileContent: (tileProps: CalendarTileProperties) =>
      getTileContent(tileProps),
    onChange: (value) => value && setDate(value as Date),
    value: date,
    maxDate: new Date(currentDate.getFullYear(), 11),
    minDate: new Date(currentDate.getFullYear() - 1, 0),
  }

  return isLoading ? (
    <Box className="py-24">
      <CircularProgress
        color="error"
        className="m-auto flex justify-center"
      />
    </Box>
  ) : (
    <Box className={!isMobile ? 'p-12' : 'p-8'}>
      {!isMobile ? (
        mode === 'dark' ? (
          <StyledCalendar {...props} />
        ) : (
          <StyledCalendarLight {...props} />
        )
      ) : (
        <Typography>
          The calendar is not available for mobile screens.
        </Typography>
      )}

      <UpcomingList games={games} />
    </Box>
  )
}

export default Calendar
