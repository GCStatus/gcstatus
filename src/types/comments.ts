import { MinimalUser } from '.'

export interface Comment {
  id: number
  comment: string
  is_hearted: boolean
  hearts_count: number
  created_at: string
  updated_at: string
  by: MinimalUser
  replies: Comment[]
}