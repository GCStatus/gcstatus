export interface TorrentProvider {
  id: number
  url: string
  name: string
}

export interface Torrent {
  id: number
  url: string
  posted_in: string
  provider: TorrentProvider
}
