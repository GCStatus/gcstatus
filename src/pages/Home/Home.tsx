import { Box } from '@mui/material'

import { LoadingScreen } from '@/components'
import { useGetHomeQuery } from '@/services/api'

import {
  HomeNextRelease,
  HotGames,
  LikedGames,
  PopularGames,
  UpcomingGames,
} from './modules'

function Home() {
  const { home, isLoading } = useGetHomeQuery(undefined, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      home: data,
      isLoading: isLoading || isFetching,
    }),
  })

  if (isLoading) return <LoadingScreen />

  if (!home) return <></>

  return (
    <Box>
      {home.hot.length > 0 && <HotGames games={home.hot} />}
      {home.next_release && <HomeNextRelease game={home.next_release} />}
      {home.popular.length > 0 && <PopularGames games={home.popular} />}
      {home.most_liked.length > 0 && (
        <LikedGames games={home.most_liked} />
      )}
      {home.upcoming.length > 0 && <UpcomingGames games={home.upcoming} />}
    </Box>
  )
}

export default Home
