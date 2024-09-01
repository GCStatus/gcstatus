import { Home } from '@/types'

import {
  MOCK_BANNERS,
  MOCK_HOT_GAMES,
  MOCK_MOST_LIKED_GAMES,
  MOCK_NEXT_RELEASE,
  MOCK_NOTIFICATIONS,
  MOCK_POPULAR_GAMES,
  MOCK_UPCOMING_GAMES,
} from '.'

export const MOCK_HOME: Home = {
  hot: MOCK_HOT_GAMES,
  banners: MOCK_BANNERS,
  popular: MOCK_POPULAR_GAMES,
  next_release: MOCK_NEXT_RELEASE,
  notifications: MOCK_NOTIFICATIONS,
  upcoming_games: MOCK_UPCOMING_GAMES,
  most_liked_games: MOCK_MOST_LIKED_GAMES,
}
