export interface TitleProgress {
  id: number
  progress: number
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TitleRequirement {
  id: number
  task: string
  goal: number
  description?: string
  created_at: string
  updated_at: string
  progress?: TitleProgress
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
  created_at: string
  requirements: TitleRequirement[]
}
