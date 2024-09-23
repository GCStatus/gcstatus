import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/material'
import {
  FaCheckCircle,
  FaPlayCircle,
  FaQuestion,
  FaStar,
} from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

import { Mission } from '@/types'
import { calculateOverallProgress } from '@/utils'

interface MissionCardProps {
  mission: Mission
}

function MissionCard(props: MissionCardProps) {
  const { mission } = props

  const shouldApplyOpacity = [
    'completed',
    'canceled',
    'unavailable',
  ].includes(mission.status)

  return (
    <Card
      className={`relative p-6 dark:bg-theme-dark-900 bg-transparent rounded-xl border border-theme-red-900 ${
        shouldApplyOpacity
          ? 'opacity-50'
          : 'hover:-translate-y-2 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform'
      }`}>
      <CardContent className="text-white group flex flex-col">
        <Typography className="md:text-2xl text-xl font-bold mb-4 text-theme-red-900">
          {mission.title}
        </Typography>
        <Typography className="dark:text-gray-400 text-gray-500 mb-6">
          {mission.description}
        </Typography>

        {!shouldApplyOpacity && (
          <Box className="absolute inset-0 rounded-xl border-2 border-theme-red-900 opacity-25 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
        )}

        <Box className="relative mb-6">
          <LinearProgress
            variant="determinate"
            value={calculateOverallProgress(mission.requirements)}
            className="h-2 rounded-full dark:bg-zinc-900 bg-gray-300"
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#ff4d4d',
              },
            }}
          />
          <Box className="absolute right-0 -top-6 text-white text-sm font-bold">
            {calculateOverallProgress(mission.requirements)}%
          </Box>
        </Box>

        <Typography className="text-lg font-bold text-theme-red-900 mb-2">
          Requirements
        </Typography>
        <Box
          className={`grid ${
            mission.requirements.length > 1
              ? 'md:grid-cols-2 grid-cols-1'
              : 'grid-cols-1'
          } md:gap-4 gap-2 w-full`}>
          {mission.requirements.map((req) => (
            <Box
              key={req.id}
              className="flex justify-between items-center text-gray-200 p-4 rounded-lg border border-zinc-900 my-2">
              <Typography className="dark:text-gray-400 text-gray-500 text-base">
                {req.task}
              </Typography>
              <Typography className="font-bold text-theme-red-900">
                {req.progress.completed
                  ? 'Completed'
                  : `${req.progress.progress}/${req.goal}`}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography className="text-lg font-bold text-theme-red-900 mb-2">
          Rewards
        </Typography>
        <Box
          className={`grid ${
            mission.rewards.length > 1
              ? 'md:grid-cols-2 grid-cols-1'
              : 'grid-cols-1'
          } md:gap-4 gap-2 w-full`}>
          {mission.rewards.map((reward) => (
            <Box
              key={reward.id}
              className="flex justify-between items-center text-gray-200 p-4 rounded-lg border border-zinc-900 my-2">
              <Typography className="dark:text-gray-400 text-gray-500 text-base capitalize">
                {reward.type}
              </Typography>
              <Typography className="font-bold text-theme-red-900">
                {reward.type === 'title'
                  ? reward.rewardable?.title
                  : reward.amount}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box className="mt-4">
          <Chip
            label={
              mission.status.charAt(0).toUpperCase() +
              mission.status.slice(1)
            }
            className={`capitalize text-white px-4 py-1 rounded-full shadow-lg ${
              mission.status === 'available' ||
              mission.status === 'canceled'
                ? 'bg-theme-red-900'
                : mission.status === 'progress'
                  ? 'bg-yellow-600'
                  : mission.status === 'completed'
                    ? 'bg-green-600'
                    : 'bg-gray-600'
            }`}
            icon={
              mission.status === 'available' ? (
                <FaPlayCircle />
              ) : mission.status === 'progress' ? (
                <FaStar />
              ) : mission.status === 'completed' ? (
                <FaCheckCircle />
              ) : mission.status === 'canceled' ? (
                <IoClose />
              ) : (
                <FaQuestion />
              )
            }
          />
        </Box>

        {mission.status === 'available' && (
          <Box className="absolute top-4 right-4 bg-theme-red-900 text-white px-2 py-1 rounded-lg text-xs shadow-lg">
            New
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default MissionCard
