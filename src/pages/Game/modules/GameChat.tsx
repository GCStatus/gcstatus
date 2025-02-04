import { Stack, Typography } from '@mui/material'

import { Comments } from '@/components'
import { GameDetails } from '@/types'

interface GameChatProps {
  game: GameDetails
}

function GameChat(props: GameChatProps) {
  const { game } = props

  return (
    <Stack spacing={1}>
      <Typography
        variant="h2"
        className="sm:text-4xl text-2xl font-bold text-theme-red-900 dark:text-white">
        Game Chat
      </Typography>
      <Comments
        defaultComments={game.comments}
        commentableId={game.id}
        commentableType="App\Models\GCStatus\Game"
      />
    </Stack>
  )
}

export default GameChat
