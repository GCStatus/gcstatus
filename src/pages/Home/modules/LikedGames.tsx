import { Box, Link, Typography } from '@mui/material'
import { format } from 'date-fns'
import { IoHeartOutline } from 'react-icons/io5'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { GameList } from '@/types'

interface LikedGamesProps {
  games: GameList[]
}

function LikedGames(props: LikedGamesProps) {
  const { games } = props

  return (
    <Box component="section" className="relative w-full h-screen bg-black">
      <Swiper
        loop
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        centeredSlides
        slidesPerView={1}
        modules={[Autoplay, EffectCoverflow]}
        className="h-full">
        {games.map((game) => (
          <SwiperSlide key={game.id} className="relative">
            <Box className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent to-white/10 flicker-top" />

            <Box
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${game.cover})` }}>
              <Box className="absolute inset-0 bg-black bg-opacity-30" />

              <Box className="absolute sm:bottom-6 bottom-0 sm:left-6 left-0 sm:p-6 px-1 py-4 text-white bg-gradient-to-r from-red-400/80 via-black/60 to-transparent rounded-lg shadow-lg max-w-xl w-full animate-slide-in space-y-3 sm:text-left text-center">
                <Link
                  className="sm:text-4xl text-2xl font-bold text-white hover:text-opacity-70 transition duration-500"
                  href={`/games/${game.slug}`}>
                  {game.title}
                </Link>
                <Typography className="text-lg mb-4">
                  {format(new Date(game.release_date), 'yyyy-MM-dd')}
                </Typography>
                <Box className="flex sm:flex-row flex-col items-center flex-wrap mt-4 gap-2">
                  <Typography className="text-md">Platforms: </Typography>
                  {game.platforms.map(({ id, slug, name }) => (
                    <Link href={`platforms/${slug}`} key={id}>
                      <Typography className="text-sm font-bold text-gray-50">
                        {name}
                      </Typography>
                    </Link>
                  ))}
                </Box>
                <Box className="flex items-center sm:justify-start justify-center gap-2">
                  <IoHeartOutline className="animate-pulse" />
                  {game.hearts_count}
                </Box>
                <Box className="flex items-center sm:justify-start justify-center flex-wrap mt-4 gap-2">
                  {game.genres.map(({ id, slug, name }) => (
                    <Link href={`genres/${slug}`} key={id}>
                      <Typography className="bg-theme-red-900 px-3 py-1 rounded-full text-sm font-bold text-gray-50">
                        {name}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default LikedGames
