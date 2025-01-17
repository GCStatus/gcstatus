export interface RequirementType {
  id: number
  os: 'windows' | 'mac' | 'linux'
  potential: 'minimum' | 'recommended' | 'maximum'
}

export interface Requirement {
  id: number
  os: string
  dx: string
  cpu: string
  ram: string
  gpu: string
  rom: string
  obs?: string
  network: string
  type: RequirementType
}
