import { Protection } from '.'

export interface Crackers {
  id: number
  name: string
  acting: boolean
}

export interface Crack {
  id: number
  status: string
  cracked_at: string | null
  by: Crackers | null
  protection: Protection
}
