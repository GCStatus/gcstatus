import { GameList } from '.'

export interface Banner {
  id: number
  bannerable_type: string
  game: GameList
}
