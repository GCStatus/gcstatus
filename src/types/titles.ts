export interface TitleProgress {
  id: number
  progress: number
  completed: boolean
}

export interface TitleRequirement {
  id: number
  task: string
  goal: number
  progress: TitleProgress
}

export interface Title {
  id: number
  cost?: number
  title: string
  description: string
  purchasable: boolean
  status:
    | 'available'
    | 'unavailable'
    | 'completed'
    | 'canceled'
    | 'progress'
  requirements: TitleRequirement[]
}
