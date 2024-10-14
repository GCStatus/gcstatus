import {
  Category,
  Comment,
  Crack,
  Criticable,
  Developer,
  DLC,
  Gallery,
  GameLanguage,
  GameStore,
  Genre,
  Platform,
  Publisher,
  Requirement,
  Review,
  Tag,
  Torrent,
} from '.'

export interface Price {
  id: number
  price: number
}

export interface GameList {
  id: number
  slug: string
  title: string
  cover: string
  condition?: string
  views_count: number
  release_date: string
  hearts_count: number
  short_description: string
  crack?: Crack
  tags: Tag[]
  genres: Genre[]
  platforms: Platform[]
  categories: Category[]
}

export interface Support {
  id: number
  url: string
  email?: string
  contact?: string
}

export interface GameDetails {
  id: number
  age: number
  slug: string
  title: string
  cover: string
  about: string
  condition: string
  release_date: string
  website?: string
  description?: string
  hearts_count: number
  views_count: number
  is_hearted: boolean
  short_description?: string
  is_free: boolean
  legal?: string
  tags: Tag[]
  dlcs: DLC[]
  genres: Genre[]
  reviews: Review[]
  stores: GameStore[]
  galleries: Gallery[]
  languages: GameLanguage[]
  platforms: Platform[]
  categories: Category[]
  developers: Developer[]
  publishers: Publisher[]
  requirements: Requirement[]
  critics: Criticable[]
  torrents: Torrent[]
  comments: Comment[]
  crack?: Crack
  support?: Support
}

export interface NextRelease {
  id: number
  slug: string
  title: string
  cover: string
  release_date: string
  genres: Genre[]
  platforms: Platform[]
}
