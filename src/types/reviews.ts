import { MinimalUser } from '.'

export interface Review {
  id: number
  rate: number
  review: string
  played: boolean
  user: MinimalUser
}

export interface ReviewStore {
  rate: number
  gameId: number
  userId: number
  played: boolean
  review?: string
}
