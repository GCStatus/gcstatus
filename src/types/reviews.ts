import { MinimalUser } from '.'

export interface Review {
  id: number
  rate: number
  review: string
  consumed: boolean
  by: MinimalUser
}

export interface ReviewStore {
  reviewable_id: number
  reviewable_type: string
  rate: number
  consumed: boolean
  review?: string
}
