import { Protection } from '.'

export interface Crackers {
  id: number
  name: string
  slug: string
  acting: boolean
}

export interface Crack {
  id: number
  status: 'cracked' | 'uncracked' | 'cracked-oneday'
  cracked_at: string | null
  by: Crackers | null
  protection: Protection
}
