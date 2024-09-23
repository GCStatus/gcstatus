import { Title } from '.'

export interface Profile {
  phone?: string
  photo?: string
  linkedin?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  twitch?: string
  share: boolean
}

export interface User {
  id: number
  name: string
  email: string
  level: number
  nickname: string
  birthdate: string
  experience: number
  created_at: string
  updated_at: string
  profile?: Profile
  wallet: Wallet
}

export interface UpdateUserInterface {
  email: string
  nickname: string
  password: string
}

export interface UpdatePasswordInterface {
  old_password: string
  password: string
  password_confirmation: string
}

export interface TeamMember {
  id: number
  bio?: string
  name: string
  role: string
  image: string
  skills: {
    name: string
    proficiency: number
  }[]
  socials: {
    github?: string
    twitter?: string
    linkedin?: string
    whatsapp?: string
    instagram?: string
  }
}

export interface Level {
  id: number
  coins: number
  level: number
  experience: number
  title?: Title
}

export interface Wallet {
  id: number
  amount: number
}
