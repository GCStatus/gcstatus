import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import {
  IoVolumeMediumOutline,
  IoVolumeMuteOutline,
} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import re4_serenity_src from '@/assets/RE4_Serenity_Theme.mp3'

interface ErrorProps {
  error: number
  description: string
}

function Error(props: ErrorProps) {
  const { error, description } = props
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const ambiance = useRef<HTMLAudioElement>(new Audio(re4_serenity_src))

  const handleBackToHome = () => {
    navigate('/')
  }

  useEffect(() => {
    const audioElement = ambiance.current

    audioElement.loop = true
    audioElement.volume = 0.1

    const handleUserInteraction = async () => {
      try {
        await audioElement.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Playback failed:', error)
      }

      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
    }

    window.addEventListener('click', handleUserInteraction)
    window.addEventListener('touchstart', handleUserInteraction)

    return () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      audioElement.pause()
      audioElement.currentTime = 0
    }
  }, [])

  const handleTogglePlayback = () => {
    const audioElement = ambiance.current

    if (isPlaying) {
      audioElement.pause()
    } else {
      audioElement.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <Box className="relative min-h-screen h-full w-full flex flex-col justify-center items-center bg-theme-dark-900 text-white overflow-hidden">
      <img
        src="https://picfiles.alphacoders.com/534/534637.jpg"
        // src="https://picfiles.alphacoders.com/534/534640.jpg"
        // src="https://images4.alphacoders.com/628/thumb-1920-628354.jpg"
        alt="404 background"
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

          <IconButton onClick={handleTogglePlayback}>
            {isPlaying ? (
              <IoVolumeMediumOutline />
            ) : (
              <IoVolumeMuteOutline />
            )}
          </IconButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Error
