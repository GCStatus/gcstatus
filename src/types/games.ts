import {
  Category,
  Company,
  Gallery,
  Genre,
  Platform,
  Review,
  Tag,
  User,
} from '.'

export interface Price {
  id: number
  price: number
}

export interface Crackers {
  id: number
  name: string
  acting: boolean
}

export interface Protection {
  id: number
  name: string
}

export interface Crack {
  id: number
  status: string
  torrent: string | null
  cracked_at: string | null
  by: Crackers | null
  protection: Protection
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

export interface RequirementType {
  id: number
  name: 'minimum' | 'recommended' | 'maximum'
  type: 'windows' | 'mac' | 'linux'
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
  network?: string
  type: RequirementType
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
  views_count: number
  commom_price: number
  hearts_count: number
  short_description: string
  tags: Tag[]
  genres: Genre[]
  platforms: Platform[]
  categories: Category[]
}

export interface Language {
  id: number
  iso: string
  name: string
  menu: boolean
  dubs: boolean
  subtitles: boolean
}

export interface DLC {
  id: number
  name: string
  cover: string
  release: string
  game?: {
    id: number
    title: string
  }
  genres: Genre[]
  galleries: Gallery[]
  companies: Company[]
  platforms: Platform[]
  categories: Category[]
}

export interface Critic {
  id: number
  url: string
  logo: string
  name: string
  rate: number
  created_at: string
}

export interface TorrentProvider {
  id: number
  url: string
  name: string
}

export interface Torrent {
  id: number
  url: string
  posted_in: string
  provider: TorrentProvider
}

export interface Message {
  id: number
  message: string
  created_at: string
  updated_at: string
  by: User
  replies: Message[]
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
  description?: string
  hearts_count: number
  views_count: number
  short_description?: string
  tags: Tag[]
  dlcs: DLC[]
  genres: Genre[]
  reviews: Review[]
  companies: Company[]
  galleries: Gallery[]
  languages: Language[]
  platforms: Platform[]
  categories: Category[]
  developers: Developer[]
  publishers: Publisher[]
  requirements: Requirement[]
  critics: Critic[]
  torrents: Torrent[]
  messages: Message[]
  crack: Crack
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
