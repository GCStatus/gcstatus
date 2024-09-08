import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ErrorProps {
  error: number
  description: string
}

function Error(props: ErrorProps) {
  const { error, description } = props
  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <Box className="relative min-h-screen h-full w-full flex flex-col justify-center items-center bg-theme-dark-900 text-white overflow-hidden">
      <img
        src="https://images4.alphacoders.com/628/thumb-1920-628354.jpg"
        alt="Train Station Background"
        className="absolute inset-0 w-full h-full object-cover flicker-bottom"
      />

      <Box className="absolute inset-0 bg-black opacity-60" />

      <Container className="text-center z-10 flex flex-col items-center">
        <Stack spacing={2} direction="column" alignItems="center">
          <Typography
            variant="h2"
            className="text-theme-red-900 text-4xl sm:text-6xl md:text-8xl font-extrabold animate-text-flicker">
            You got hit with a {error}!
          </Typography>

          <Typography
            variant="h3"
            className="mt-4 text-lg md:text-2xl text-gray-300">
            {description}
          </Typography>

          <Button
            variant="contained"
            onClick={handleBackToHome}
            className="mt-8 bg-theme-red-900 hover:bg-red-700 font-bold text-white px-6 py-3 text-lg shadow-lg transform transition-transform hover:scale-105 max-w-[10rem] w-full">
            Respawn
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default Error
