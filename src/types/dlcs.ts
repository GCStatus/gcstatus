import { DLCStore, Gallery, Platform } from '.'

export interface DLC {
  id: number
  name: string
  cover: string
  release_date: string
  stores: DLCStore[]
  galleries: Gallery[]
  platforms: Platform[]
}
