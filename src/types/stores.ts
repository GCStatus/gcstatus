export interface Store {
  id: number
  url: string
  name: string
  slug: string
  logo: string
}

export interface GameStore {
  id: number
  url: string
  price: number
  store: Store
  store_game_id: string
}

export interface DLCStore {
  id: number
  url: string
  price: number
  store: Store
  store_dlc_id: string
}
