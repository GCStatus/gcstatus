export interface Profile {
  phone?: string
  photo?: string
  linkedin?: string
  facebook?: string
  share: boolean
}

export interface User {
  id: number
  name: string
  email: string
  nickname?: string
  birthdate: string
  created_at: string
  updated_at: string
  profile?: Profile
}

export interface UpdateUserInterface {
  email: string
  nickname: string
  password: string
}
