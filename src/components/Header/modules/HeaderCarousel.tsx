import { Box, Chip, Link, Stack, Tooltip, Typography } from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Carousel } from 'react-responsive-carousel'

import { GameBanner } from '@/types'
import { mapCrack } from '@/utils'

interface HeaderCarouselProps {
  banners: GameBanner[]
}

function HeaderCarousel(props: HeaderCarouselProps) {
  const { banners } = props

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      className="h-screen carousel"
      interval={8000}
      transitionTime={1400}
      emulateTouch
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}>
      {banners.map(({ id, bannerable }) => (
        <Box className="relative h-screen" key={id}>
          <LazyLoadImage
            src={bannerable.cover}
            alt="Game Banner"
            className="w-full h-full object-cover"
          />
          <Box className="absolute inset-0 bg-black bg-opacity-55 flex items-center text-white">
            <Box className="container mx-auto flex items-center justify-between md:flex-row flex-col">
              <Box className="flex flex-col max-w-md items-center">
                <Typography className="text-4xl md:text-5xl font-bold mb-4">
                  <Tooltip
                    title={`Go to ${bannerable.title} details`}
                    disableInteractive>
                    <Link
                      href={`/games/${bannerable.slug}`}
                      className="hover:text-yellow-400 transition duration-300">
                      {bannerable.title}
                    </Link>
                  </Tooltip>
                </Typography>
                {bannerable.crack ? (
                  <Chip
                    label={mapCrack[bannerable.crack.status.name]}
                    className={`${['cracked', 'cracked-oneday'].includes(bannerable.crack.status.name) ? 'bg-green-500' : 'bg-red-500'} text-white`}
                  />
                ) : (
                  <Chip
                    label="Crack not available"
                    className="bg-red-500 text-white"
                  />
                )}
              </Box>

              <Stack className="flex flex-col max-w-xl md:text-right text-center">
                <Typography className="mb-4">
                  {bannerable.short_description}
                </Typography>
                <Typography className="mb-2">Available on:</Typography>
                <Box className="flex md:justify-end justify-center gap-2 mb-4 sm:flex-row flex-col sm:px-0 px-8">
                  {bannerable.platforms.map(({ id, slug, name }) => (
                    <Box
                      component="span"
                      className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                      key={id}>
                      <Link href={`/games/platforms/${slug}`}>{name}</Link>
                    </Box>
                  ))}
                </Box>
                <Box className="flex flex-wrap md:justify-end justify-center gap-2 sm:flex-row flex-col sm:px-0 px-8">
                  {bannerable.genres.map(({ id, slug, name }) => (
                    <Box
                      component="span"
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      key={id}>
                      <Link href={`/games/genres/${slug}`}>{name}</Link>
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
