export interface Language {
  id: number
  name: string
  iso: string
}

export interface GameLanguage {
  id: number
  menu: boolean
  dubs: boolean
  subtitles: boolean
  language: Language
}
