import { Mission } from './missions'

export interface BaseReward {
  id: number
  sourceable_type: string
  rewardable_type: string
}

export interface TitleReward extends BaseReward {
  rewardable_type: 'titles'
  title: {
    id: number
    title: string
    description: string
    purchasable: boolean
    status: string
    created_at: string
    requirements: any | null
  }
}

export interface TitleRewardSource extends BaseReward {
  sourceable: Mission
}
