import { Box, Card, CardContent, Typography } from '@mui/material'

import { Level, User } from '@/types'

import { RewardList } from './modules'

interface LevelCardProps {
  user: User
  level: Level
  label: string
}

function LevelCard(props: LevelCardProps) {
  const { user, level, label } = props
  const { rewards, experience, coins } = level

  const shouldApplyOpacity = user.level === level.level

  return (
    <Card
      className={`relative p-6 dark:bg-theme-dark-900 bg-transparent rounded-xl border border-theme-red-900 ${
        shouldApplyOpacity
          ? 'opacity-60'
          : 'hover:-translate-y-2 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform'
      }`}>
      <CardContent className="text-white group flex flex-col gap-4">
        <Box className="flex justify-between items-center">
          <Typography className="md:text-2xl text-xl font-bold text-theme-red-900">
            {label}
          </Typography>
          <Typography className="md:text-2xl text-xl font-bold text-theme-red-900">
            {level.level}
          </Typography>
        </Box>

        {!shouldApplyOpacity && (
          <Box className="absolute inset-0 rounded-xl border-2 border-theme-red-900 opacity-25 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
        )}

        <Box className="relative">
          <Typography className="text-lg font-bold text-theme-red-900">
            Experience Reward
          </Typography>
          <Box className="text-gray-200 p-4 rounded-lg border border-zinc-900 my-2">
            <Typography className="dark:text-gray-400 text-gray-500 text-base">
              {experience} XP
            </Typography>
          </Box>
        </Box>

        <Box className="relative">
          <Typography className="text-lg font-bold text-theme-red-900 mb-2">
            Coins Reward
          </Typography>
          <Box className="text-gray-200 p-4 rounded-lg border border-zinc-900 my-2">
            <Typography className="dark:text-gray-400 text-gray-500 text-base">
              {coins} Coins
            </Typography>
          </Box>
        </Box>

        {rewards.length > 0 && <RewardList rewards={rewards} />}
      </CardContent>
    </Card>
  )
}

export default LevelCard
