import { Protection } from '.'

export interface Cracker {
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
  cracker: Cracker | null
  status: CrackStatus
  protection: Protection
}
