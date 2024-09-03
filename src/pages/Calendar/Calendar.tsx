import {
  Box,
  Chip,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { format, isSameDay, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '@/hooks'
import { MOCK_UPCOMING_GAMES } from '@/mocks'

import { StyledCalendar, StyledCalendarLight } from './Calendar.styles'
import { UpcomingList } from './modules'

type Detail = 'month' | 'year' | 'decade' | 'century'

interface CalendarTileProperties {
  activeStartDate: Date
  date: Date
  view: Detail
}

function Calendar() {
  const games = MOCK_UPCOMING_GAMES
  const mode = useTheme()
  const go = useNavigate()
  const isMobile = useMediaQuery('(max-width: 490px)')

  const getTileContent = ({ date, view }: CalendarTileProperties) => {
    const appointment = games.filter((game) =>
      isSameDay(parseISO(game.release), date),
    )

    if (!appointment || view !== 'month') return null

    return (
      <Box sx={{ padding: isMobile ? '0.25rem' : '0.5rem' }}>
        {appointment.map((item) => (
          <Tooltip
            title={`${item.title} - ${format(parseISO(item.release), 'yyyy-MM-dd')}`}
            sx={{ display: 'block' }}
            disableInteractive
            key={item.id}>
            <Chip
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
              label={item.title}
            />
          </Tooltip>
        ))}
      </Box>
    )
  }

  return (
    <Box className={!isMobile ? 'p-12' : 'p-8'}>
      {!isMobile ? (
        mode === 'dark' ? (
          <StyledCalendar
            locale="en-US"
            minDetail="year"
            tileContent={getTileContent}
          />
        ) : (
          <StyledCalendarLight
            locale="en-US"
            minDetail="year"
            tileContent={getTileContent}
          />
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
