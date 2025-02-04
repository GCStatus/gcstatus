import './styles/global.css'
import 'swiper/swiper-bundle.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'

import { useTheme } from './hooks'
import { Routes } from './Routes'
import { darkTheme, lightTheme } from './theme'

function App() {
  const mode = useTheme()
  const themeToUse = mode === 'light' ? lightTheme : darkTheme

  return (
    <HelmetProvider>
      <ThemeProvider theme={themeToUse}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
