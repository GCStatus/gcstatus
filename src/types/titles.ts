import { TitleRewardSource } from './rewards'

export interface TitleStatus {
  id: number
  name: 'available' | 'unavailable' | 'canceled'
}

export interface Title {
  id: number
  own: boolean
  cost?: number
  title: string
  description: string
  purchasable: boolean
  status: TitleStatus
  created_at: string
  updated_at: string
  rewardable?: TitleRewardSource
}
