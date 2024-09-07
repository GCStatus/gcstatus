import { User } from '.'

export interface Transaction {
  id: number
  date: string
  type: string
  amount: number
  description: string
  user: User
}
