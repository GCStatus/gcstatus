import { Title } from '.'

export interface MissionReward {
  id: number
  created_at: string
  updated_at: string
  sourceable_type: string
  rewardable_type: string
  title?: Title
}

export interface UserMission {
  completed: boolean
  last_completed_at: string | null
}

export interface MissionProgress {
  id: number
  progress: number
  completed: boolean
}

export interface MissionRequirement {
  id: number
  task: string
  description?: string
  goal: number
  progress: MissionProgress | null
}

export interface MissionStatus {
  id: number
  name: 'available' | 'unavailable' | 'canceled'
}

export interface Mission {
  id: number
  mission: string
  description: string
  coins: number
  experience: number
  status: MissionStatus
  frequency: 'one_time' | 'daily' | 'weekly' | 'monthly'
  reset_time: string
  created_at: string
  rewards: MissionReward[]
  requirements: MissionRequirement[]
  progress: UserMission | null
}
