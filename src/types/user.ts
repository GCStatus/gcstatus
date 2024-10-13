import { BaseReward, Title } from '.'

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
  profile: Profile
  wallet: Wallet
  title?: Title
}

export interface MinimalUser {
  id: number
  name: string
  email: string
  photo?: string
  nickname: string
  created_at: string
}

export interface UpdateUserNickAndEmailInterface {
  email: string
  nickname: string
  password: string
}

export interface UpdateUserBasicsInterface {
  name: string
  birthdate: string
}

export interface UpdatePasswordInterface {
  password: string
  new_password: string
  new_password_confirmation: string
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
  rewards: BaseReward[]
}

export interface Wallet {
  id: number
  amount: number
}
