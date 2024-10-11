export interface RequirementType {
  id: number
  os: 'minimum' | 'recommended' | 'maximum'
  potential: 'windows' | 'mac' | 'linux'
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
  requirement_type: RequirementType
}
