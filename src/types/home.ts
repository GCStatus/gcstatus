import { GameBanner, GameList, NextRelease } from '.'

export interface Home {
  hot: GameList[]
  popular: GameList[]
  banners: GameBanner[]
  next_release: NextRelease
  upcoming: GameList[]
  most_liked: GameList[]
}
