import { MinimalUser } from '.'

export interface Review {
  id: number
  rate: number
  review: string
  consumed: boolean
  by: MinimalUser
}

export interface ReviewStore {
  rate: number
  gameId: number
  userId: number
  consumed: boolean
  review?: string
}
