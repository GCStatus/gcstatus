import { Platform } from './platforms'
import { Tag } from './tags'

export interface Banner {
  id: number
  banner: string
  related: {
    id: number
    slug: string
    title: string
    best_price: number
    short_description: string
    tags: Tag[]
    platforms: Platform[]
  }
}
