import { Platform } from './platforms'
import { Tag } from './tags'

export interface Banner {
  id: number
  banner: string
  title: string
  description: string
  platforms: Platform[]
  tags: Tag[]
}
