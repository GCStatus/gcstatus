export interface TorrentProvider {
  id: number
  url: string
  name: string
  slug: string
}

export interface Torrent {
  id: number
  url: string
  posted_at: string
  provider: TorrentProvider
}
