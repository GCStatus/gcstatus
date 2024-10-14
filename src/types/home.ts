import { Banner, GameList, NextRelease } from '.'

export interface Home {
  hot: GameList[]
  banners: Banner[]
  popular: GameList[]
  next_release: NextRelease
  upcoming_games: GameList[]
  most_liked_games: GameList[]
}
