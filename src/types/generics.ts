export type Res<T> = {
  data: T
}

export type ResPaginated<T> = {
  data: T[]
  links?: ResLinks
  meta?: ResMeta
}

type ResLinks = {
  first: string
  last: string
  prev: string | null
  next: string | null
}

type ResMeta = {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}
