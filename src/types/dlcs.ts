import { DLCStore, Gallery, Platform } from '.'

export interface DLC {
  id: number
  name: string
  about?: string
  cover: string
  release_date: string
  description?: string
  short_description?: string
  stores: DLCStore[]
  galleries: Gallery[]
  platforms: Platform[]
}
