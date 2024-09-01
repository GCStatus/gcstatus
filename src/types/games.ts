import {
  Category,
  Company,
  Gallery,
  Genre,
  Platform,
  Review,
  Tag,
} from '.'

export interface Price {
  id: number
  price: number
  company: Company
}

export interface Crackers {
  id: number
  name: string
  acting: boolean
}

export interface Crack {
  id: number
  by: Crackers
  status: string
  torrent?: string
  protection: string
  created_at: string
}

export interface Developer {
  id: number
  name: string
  acting: boolean
  created_at: string
}

export interface Publisher {
  id: number
  name: string
  acting: boolean
  created_at: string
}

export interface Requirement {
  id: number
  so: string
  dx: string
  cpu: string
  ram: string
  gpu: string
  rom: string
  bits: number
  obs?: string
  network: string
}

export interface GameList {
  id: number
  slug: string
  sale: boolean
  title: string
  cover: string
  badge?: string
  release: string
  best_price: number
  hearts_count: number
  short_description: string
  genres: Genre[]
  platforms: Platform[]
}

export interface Language {
  id: number
  iso: string
  name: string
}

export interface DLC {
  id: number
  name: string
  game?: {
    id: number
    title: string
  }
  genres: Genre[]
  platforms: Platform[]
  categories: Category[]
}

export interface Critic {
  id: number
  url: string
  name: string
  since: string
  created_at: string
}

export interface GameDetails {
  id: number
  age: number
  slug: string
  title: string
  cover: string
  about: string
  badge?: string
  release: string
  website?: string
  description: string
  hearts_count: number
  tags: Tag[]
  dlcs: DLC[]
  genres: Genre[]
  prices: Price[]
  reviews: Review[]
  companies: Company[]
  galleries: Gallery[]
  language: Language[]
  platforms: Platform[]
  categories: Category[]
  developers: Developer[]
  publishers: Publisher[]
  requirements: Requirement[]
  critics: Critic & { rate: number }[]
}

export interface NextRelease {
  id: number
  slug: string
  title: string
  cover: string
  release: string
  genres: Genre[]
  platforms: Platform[]
}
