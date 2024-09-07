export interface MissionReward {
  id: number
  type: 'coin' | 'exp' | 'title'
  amount: number
  rewardable?: {
    id: number
    title: string
  }
}

export interface MissionProgress {
  id: number
  progress: number
  completed: boolean
}

export interface MissionRequirement {
  id: number
  task: string
  goal: number
  progress: MissionProgress
}

export interface Mission {
  id: number
  title: string
  description: string
  status:
    | 'available'
    | 'unavailable'
    | 'completed'
    | 'canceled'
    | 'pending'
    | 'progress'
  rewards: MissionReward[]
  requirements: MissionRequirement[]
}
