import { Box } from '@mui/material'

import { MOCK_HOME } from '@/mocks'

import {
  HomeNextRelease,
  HotGames,
  LikedGames,
  PopularGames,
  UpcomingGames,
} from './modules'

function Home() {
  const home = MOCK_HOME

  return (
    <Box>
      <HotGames games={home.hot} />
      <HomeNextRelease game={home.next_release} />
      <PopularGames games={home.popular} />
      <LikedGames games={home.most_liked_games} />
      <UpcomingGames games={home.upcoming_games} />
    </Box>
  )
}

export default Home
