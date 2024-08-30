export interface Profile {
  phone?: string
  photo?: string
  linkedin?: string
  facebook?: string
  share: boolean
  share_avatar: boolean
}

export interface Address {
  city: string
  state: string
  street: string
  number: string
  district: string
  postalcode: string
  complement?: string
}

export interface User {
  id: number
  name: string
  email: string
  coduser: string
  nickname?: string
  birthdate: string
  created_at: string
  updated_at: string
  profile?: Profile
  address?: Address
}
