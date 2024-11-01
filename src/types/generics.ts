export interface Res<T> {
  data: T
}

export interface ResPaginated<T> {
  data: T[]
  links?: ResLinks
  meta?: ResMeta
}

interface ResLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

interface ResMeta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface HeartablePayload {
  heartable_id: number
  heartable_type: 'games' | 'blogs' | 'commentables'
}
