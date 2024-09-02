import { Box, Container, Typography } from '@mui/material'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { GameList } from '@/types'

interface UpcomingGamesProps {
  games: GameList[]
}

function UpcomingGames(props: UpcomingGamesProps) {
  const { games } = props

  return (
    <Container maxWidth="xl" className="relative p-6" component="section">
      <Box className="absolute inset-0 pointer-events-none">
        <Box className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-theme-red-900 via-yellow-900 to-theme-dark-900 rounded-full blur-3xl opacity-20 animate-pulse" />
      </Box>

      <Box className="relative z-10 text-center mb-10">
        <Typography
          variant="h4"
          className="text-white font-extrabold tracking-widest neon-text relative animate-pulse hot-neon-text">
          UPCOMING GAMES
        </Typography>
        <Typography className="text-gray-400 mt-2">
          Get ready for the most anticipated games!
        </Typography>
      </Box>

      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          1980: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 1,
          },
        }}
        spaceBetween={30}
        centeredSlides
        loop
        grabCursor
        slideToClickedSlide
        className="relative z-10">
        {games.map((game) => (
          <SwiperSlide key={game.id} className="group">
            <Box
              className="w-full h-96 bg-cover bg-center relative overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500 rounded-lg"
              style={{
                backgroundImage: `url(${game.cover})`,
              }}>
              <Box className="absolute inset-0 bg-black bg-opacity-70 group-hover:bg-opacity-40 transition-all duration-500 flex flex-col justify-end items-center p-4 text-center">
                <Typography
                  variant="h5"
                  className="text-white font-bold uppercase neon-text mb-2">
                  {game.title}
                </Typography>
                <Typography className="text-md text-white mb-4">
                  Release Date: {game.release}
                </Typography>
                <Box className="grid grid-cols-3 gap-2">
                  {game.platforms.map(({ id, name }) => (
                    <Box
                      key={id}
                      component="span"
                      className="bg-gray-800 px-2 py-1 rounded-full text-xs text-center text-white">
                      {name}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box className="absolute inset-0 border border-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <Box className="absolute inset-0 w-full h-full border border-transparent border-t-blue-500 border-b-blue-500 animate-pulse"></Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default UpcomingGames
