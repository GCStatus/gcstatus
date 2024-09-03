import { alpha, styled } from '@mui/material/styles'
import ReactCalendar from 'react-calendar'

export const StyledCalendar = styled(ReactCalendar)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  padding: '10px',
  boxShadow: '0 4px 15px rgba(255, 77, 77, 0.5)',
  fontFamily: theme.typography.fontFamily,
  transition: theme.transitions.create('box-shadow'),

  '& .react-calendar__navigation': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    fontSize: '1.5rem',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
      padding: theme.spacing(0.5, 1.5),
    },
  },

  '& .react-calendar__navigation button': {
    color: '#ff4d4d',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'transform 0.3s ease, color 0.3s ease',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#ff4d4d',
      transition: 'all',
      transitionDuration: '500ms',
    },
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      padding: '6px 10px',
    },
  },

  '& .react-calendar__month-view__weekdays': {
    textAlign: 'center',
    color: '#ffffff',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    marginBottom: '0.5rem',
    '& abbr': {
      textDecoration: 'none',
      ...theme.typography.overline,
      color: '#ff4d4d',
      '@media (max-width: 768px)': {
        fontSize: '0.75rem',
      },
    },
  },

  '& .react-calendar__month-view__days': {
    position: 'relative',
    '& .react-calendar__tile': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '10rem',
      height: 'auto',
      color: '#ffffff',
      backgroundColor: 'transparent',
      borderRadius: '8px',
      border: '1px solid rgba(255, 77, 77, 0.3)',
      transition:
        'transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#ff4d4d',
        color: 'white',
        transform: 'scale(1.05)',
        borderColor: '#ff4d4d',
        borderRadius: '10px',
      },
      '@media (max-width: 768px)': {
        minHeight: '5rem',
      },
    },
    '& .react-calendar__tile--now': {
      backgroundColor: 'rgba(255, 77, 77, 0.3)',
      borderColor: '#ff4d4d',
    },
    '& .react-calendar__tile--active': {
      backgroundColor: '#ff4d4d !important',
      color: 'white !important',
      borderRadius: '10px',
      boxShadow: '0 0 10px 2px #ff4d4d',
      transform: 'scale(1.05)',
      borderColor: '#ff4d4d',
    },

    '& .react-calendar__month-view__days__day--neighboringMonth': {
      visibility: 'hidden',
    },
  },

  '& .react-calendar__month-view__days__day--neighboringMonth abbr': {
    color: theme.palette.text.secondary,
    fontWeight: 300,
  },

  '& button': {
    ...theme.typography.button,
    fontSize: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    minWidth: 64,
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    '@media (max-width: 768px)': {
      fontSize: '0.875rem',
    },
  },
}))

export const StyledCalendarLight = styled(ReactCalendar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  borderRadius: '8px',
  color: theme.palette.text.primary,
  padding: '10px',
  boxShadow: '0 4px 15px rgba(255, 77, 77, 0.5)',
  fontFamily: theme.typography.fontFamily,
  transition: theme.transitions.create('box-shadow'),

  '& .react-calendar__navigation': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    fontSize: '1.5rem',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
      padding: theme.spacing(0.5, 1.5),
    },
  },
  '& .react-calendar__navigation button': {
    color: '#ff4d4d',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'transform 0.3s ease, color 0.3s ease',
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: '#ff4d4d',
      transition: 'all',
      transitionDuration: '500ms',
    },
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      padding: '6px 10px',
    },
  },

  '@media (max-width: 600px)': {
    '& .react-calendar__navigation button': {
      fontSize: '1rem',
      padding: '6px 10px',
    },
  },

  '& .react-calendar__month-view__weekdays': {
    textAlign: 'center',
    color: '#ff4d4d',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    marginBottom: '0.5rem',
    '& abbr': {
      textDecoration: 'none',
      ...theme.typography.overline,
      color: '#ff4d4d',
      '@media (max-width: 768px)': {
        fontSize: '0.75rem',
      },
    },
  },

  '& .react-calendar__month-view__days': {
    position: 'relative',
    '& .react-calendar__tile': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '10rem',
      height: 'auto',
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
      borderRadius: '8px',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      transition:
        'transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#ff4d4d',
        color: theme.palette.common.white,
        transform: 'scale(1.05)',
        borderColor: '#ff4d4d',
        borderRadius: '10px',
      },
      '@media (max-width: 768px)': {
        minHeight: '5rem',
      },
    },
    '& .react-calendar__tile--now': {
      backgroundColor: 'rgba(255, 77, 77, 0.3)',
      borderColor: '#ff4d4d',
    },
    '& .react-calendar__tile--active': {
      backgroundColor: '#ff4d4d !important',
      color: 'white !important',
      borderRadius: '10px',
      boxShadow: '0 0 10px 2px #ff4d4d',
      transform: 'scale(1.05)',
      borderColor: '#ff4d4d',
    },

    '& .react-calendar__month-view__days__day--neighboringMonth': {
      visibility: 'hidden',
    },
  },

  '& .react-calendar__month-view__days__day--neighboringMonth abbr': {
    color: theme.palette.text.secondary,
    fontWeight: 300,
  },

  '& button': {
    ...theme.typography.button,
    fontSize: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    minWidth: 64,
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    '@media (max-width: 768px)': {
      fontSize: '0.875rem',
    },
  },
}))
