export interface Critic {
  id: number
  name: string
  url: string
  logo: string
}

export interface Criticable {
  id: number
  url: string
  rate: string
  posted_at: string
  critic: Critic
}
