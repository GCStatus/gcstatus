import { createTheme, responsiveFontSizes } from '@mui/material'
import { ptBR as corePtBR } from '@mui/material/locale'

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Audiowide',
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(191, 192, 196)',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
})

export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: 'light',
      background: {
        default: '#f4f5f7',
        paper: '#fff',
      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778c',
      },
    },
  }),
)

export const darkTheme = responsiveFontSizes(
  createTheme(
    {
      ...baseTheme,
      palette: {
        mode: 'dark',
        background: {
          default: 'rgb(63,63,70)',
          paper: 'rgb(24, 24, 26)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#919eab',
        },
      },
    },
    corePtBR,
  ),
)

export default lightTheme
