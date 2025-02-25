export interface MediaType {
  id: number
  name: string
}

export interface Gallery {
  id: number
  path: string
  type: MediaType
}
