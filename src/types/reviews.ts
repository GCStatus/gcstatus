import { User } from '.'

export interface Review {
  id: number
  rate: number
  comment: string
  played: boolean
  user: User
}
