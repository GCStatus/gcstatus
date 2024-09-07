import { User } from '.'

export interface Order {
  id: number
  total: number
  number: string
  status: string
  subtotal: number
  created_at: string
  updated_at: string
}

export interface OrderDetails {
  id: number
  total: number
  number: string
  status: string
  subtotal: number
  created_at: string
  updated_at: string
  user: User
  items: []
}
