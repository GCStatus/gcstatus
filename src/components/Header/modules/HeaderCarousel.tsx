import { Box, Link, Stack, Tooltip, Typography } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'

import { Banner } from '@/types'

interface HeaderCarouselProps {
  banners: Banner[]
}

function HeaderCarousel(props: HeaderCarouselProps) {
  const { banners } = props

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      className="h-screen carousel"
      interval={4000}
      transitionTime={800}
      emulateTouch
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}>
      {banners.map((banner) => (
        <Box className="relative h-screen" key={banner.id}>
          <img
            src={banner.banner}
            alt="Game Banner"
            className="w-full h-full object-cover"
          />
          <Box className="absolute inset-0 bg-black bg-opacity-55 flex items-center text-white">
            <Box className="container mx-auto flex items-center justify-between md:flex-row flex-col">
              <Box className="flex flex-col max-w-md">
                <Typography className="text-4xl md:text-5xl font-bold mb-4">
                  <Tooltip
                    title={`Go to ${banner.title} details`}
                    disableInteractive>
                    <Link
                      href="#"
                      className="hover:text-yellow-400 transition duration-300">
                      {banner.title}
                    </Link>
                  </Tooltip>
                </Typography>
                <Typography className="text-xl mb-2">
                  Best Price: $59.99
                </Typography>
              </Box>

              <Stack className="flex flex-col max-w-xl md:text-right text-center">
                <Typography className="mb-4">
                  {banner.description}
                </Typography>
                <Typography className="mb-2">Available on:</Typography>
                <Box className="flex md:justify-end justify-center gap-2 mb-4">
                  {banner.platforms.map(({ id, name }) => (
                    <Box
                      component="span"
                      className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                      key={id}>
                      {name}
                    </Box>
                  ))}
                </Box>
                <Box className="flex flex-wrap md:justify-end justify-center gap-2">
                  {banner.tags.map(({ id, name }) => (
                    <Box
                      component="span"
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      key={id}>
                      {name}
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      ))}
    </Carousel>
  )
}

export default HeaderCarousel
