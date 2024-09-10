import { Category, Message, Tag, User } from '.'

export interface Blog {
  id: number
  slug: string
  body: string
  title: string
  cover: string
  created_at: string
  updated_at: string
  views_count: number
  hearts_count: number
  comments_count: number
  user: User
  tags: Tag[]
  categories: Category[]
}

export interface BlogDetails extends Blog {
  comments: Message[]
}
