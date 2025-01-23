import { Box, Link, Tooltip, Typography } from '@mui/material'
import { format } from 'date-fns'

import { GameDetails } from '@/types'

import { GameChat } from '.'

interface TorrentsProps {
  game: GameDetails
}

function Torrents(props: TorrentsProps) {
  const { game } = props

  return (
    <>
      {game.torrents.length > 0 ? (
        game.torrents.map((torrent) => (
          <Box
            className="flex-1 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent p-6 rounded-lg shadow-lg duration-500 relative flex items-center gap-4 sm:flex-row flex-col sm:text-left text-center"
            key={torrent.id}>
            <Box className="flex flex-col gap-4 w-full">
              <Box className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-4">
                <Typography
                  variant="h2"
                  className="font-bold sm:text-2xl text-xl">
                  <Tooltip title={`Go to ${torrent.provider.name}`}>
                    <Link
                      href={torrent.provider.url}
                      target="_blank"
                      className="underline dark:text-gray-400 text-zinc-700"
                      rel="noopener noreferrer">
                      {torrent.provider.name}
                    </Link>
                  </Tooltip>
                </Typography>
                <Typography
                  component="p"
                  className="dark:text-gray-300 text-gray-700">
                  Posted at:{' '}
                  {format(new Date(torrent.posted_at), 'LLL, dd yyyy')}
                </Typography>
              </Box>
              <Link
                href={torrent.url}
                className="text-theme-red-900 underline hover:opacity-70 transition-opacity duration-300 hover:text-red-500"
                target="_blank"
                rel="noopener noreferrer">
                Go to torrent
              </Link>
            </Box>
          </Box>
        ))
      ) : (
        <Typography className="text-theme-red-900 dark:text-white break-words">
          No torrent available yet. Please, check the crack status on
          details section or wait for the torrent post.
        </Typography>
      )}

      <GameChat game={game} />
    </>
  )
}

export default Torrents
