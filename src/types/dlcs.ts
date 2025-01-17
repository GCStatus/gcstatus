import {
  Category,
  Developer,
  DLCStore,
  Gallery,
  Genre,
  Platform,
  Publisher,
  Tag,
} from '.'

export interface DLC {
  id: number
  slug: string
  title: string
  about?: string
  cover: string
  release_date: string
  description?: string
  short_description?: string
  legal?: string
  categories: Category[]
  tags: Tag[]
  developers: Developer[]
  publishers: Publisher[]
  genres: Genre[]
  stores: DLCStore[]
  galleries: Gallery[]
  platforms: Platform[]
}
