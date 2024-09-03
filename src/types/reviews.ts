import { User } from '.'

export interface Review {
  id: number
  rate: number
  comment: string
  played: boolean
  user: User
}

export interface ReviewStore {
  rate: number
  gameId: number
  userId: number
  played: boolean
  comment?: string
}
