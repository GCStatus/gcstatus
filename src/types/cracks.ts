import { Protection } from '.'

export interface Crackers {
  id: number
  name: string
  slug: string
  acting: boolean
}

export interface CrackStatus {
  id: number
  name: 'cracked' | 'uncracked' | 'cracked-oneday'
}

export interface Crack {
  id: number
  cracked_at: string | null
  by: Crackers | null
  status: CrackStatus
  protection: Protection
}
