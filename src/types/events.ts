export interface Notification {
  id: number
  content: {
    title: string
    actionUrl: string
    icon: string
  }
  read_at: string | null
  created_at: string
  updated_at: string
}
