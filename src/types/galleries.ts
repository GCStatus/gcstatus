export interface MediaType {
  id: number
  name: string
}

export interface Gallery {
  id: number
  path: string
  thumbnail: string
  media_type: MediaType
}
