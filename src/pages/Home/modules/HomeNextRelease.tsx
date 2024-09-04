import { Box, Link, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import { NextRelease } from '@/types'

interface HomeNextReleaseProps {
  game: NextRelease
}

function HomeNextRelease(props: HomeNextReleaseProps) {
  const { game } = props

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <span className="sm:text-5xl text-4xl mt-8 animate-pulse">
          RELEASED ! ! !
        </span>
      )
    }

    return (
      <span className="sm:text-5xl text-4xl mt-8 animate-pulse">
        Release in{' '}
        {days > 1 ? `${days} days` : `${hours}:${minutes}:${seconds}`}
      </span>
    )
  }

  return (
    <Stack className="relative h-screen w-full overflow-hidden">
      <Box
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${game.cover})`,
          backgroundAttachment: 'fixed',
        }}
      />

      <Box className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-transparent to-black/40 flicker-top" />

      <Box className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-transparent to-black/40 flicker-bottom" />

      <Box className="relative z-10 flex flex-col justify-center items-center h-full text-white dark:bg-black/40 bg-black/10 sm:px-0 px-2 text-center">
        <Typography className="text-2xl mb-8 animate-ping">
          Next great release
        </Typography>
        <Link
          href={`/games/${game.slug}`}
          className="text-5xl font-bold mb-4 hover:text-theme-red-900 transition duration-500">
          {game.title}
        </Link>
        <Typography className="text-lg mb-6">
          Release Date: {format(new Date(game.release), 'LLLL, dd yyyy')}
        </Typography>
        <Typography className="text-md">
          Platforms: {game.platforms.map(({ name }) => name).join(', ')}
        </Typography>
        <Typography className="text-md">
          Genres: {game.genres.map(({ name }) => name).join(', ')}
        </Typography>
        <Countdown date={new Date(game.release)} renderer={renderer} />
      </Box>
    </Stack>
  )
}

export default HomeNextRelease
