import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { formatRelative, isWithinInterval, subWeeks } from 'date-fns'
import { FaCheckCircle, FaGift, FaPlayCircle } from 'react-icons/fa'
import { IoCheckmarkOutline, IoClose } from 'react-icons/io5'

import { Button, RewardList } from '@/components'
import { useSuccess } from '@/hooks'
import { useCompleteMissionMutation } from '@/services/api'
import { Mission } from '@/types'
import { calculateOverallProgress as c } from '@/utils'

interface MissionCardProps {
  mission: Mission
}

function MissionCard(props: MissionCardProps) {
  const { mission } = props
  const [complete, { data, isLoading, isSuccess }] =
    useCompleteMissionMutation()

  const shouldApplyOpacity = ['canceled', 'unavailable'].includes(
    mission.status,
  )

  const overallProgress = c(mission.requirements)

  const isRecurring = mission.frequency !== 'one-time'
  const resetTime = isRecurring
    ? `Resets at: ${formatRelative(new Date(mission.reset_time), new Date())}`
    : ''

  const rewardsRedeemable =
    !(mission.user_mission && mission.user_mission.completed) &&
    overallProgress >= 100 &&
    !shouldApplyOpacity

  const renderNewTag =
    mission.status === 'available' &&
    isWithinInterval(new Date(mission.created_at), {
      start: subWeeks(new Date(), 1),
      end: new Date(),
    })

  const handleRedeemRewards = async () => {
    complete(mission.id)
  }

  const getResetInfo = () => {
    if (!isRecurring) return null

    const frequencyIcons: { [key: string]: string } = {
      daily: '🌞',
      weekly: '📅',
      monthly: '🗓️',
    }

    const frequencyColors: { [key: string]: string } = {
      daily: 'text-yellow-400',
      weekly: 'text-blue-400',
      monthly: 'text-purple-400',
    }

    return (
      <Box className="text-sm font-bold flex items-center my-1">
        <span className={`${frequencyColors[mission.frequency]} mr-2`}>
          {frequencyIcons[mission.frequency]}
        </span>
        <span className="dark:text-gray-400 text-gray-600">
          {`Frequency: ${mission.frequency.charAt(0).toUpperCase() + mission.frequency.slice(1)}`}
        </span>
        {isRecurring && (
          <span className="ml-2 text-red-400 animate-pulse">
            {resetTime}
          </span>
        )}
      </Box>
    )
  }

  useSuccess(isSuccess, data?.message)

  return (
    <Card
      className={`relative p-6 dark:bg-theme-dark-900 bg-transparent rounded-xl border border-theme-red-900 ${
        shouldApplyOpacity
          ? 'opacity-50'
          : 'hover:-translate-y-2 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform'
      }`}>
      <CardContent className="text-white group flex flex-col">
        <Typography className="md:text-2xl text-xl font-bold mb-4 text-theme-red-900">
          {mission.mission}
        </Typography>

        <Box className="flex justify-start space-x-4 mb-4">
          <Typography className="text-lg font-bold text-yellow-400">
            Coins: {mission.coins}
          </Typography>
          <Typography className="text-lg font-bold text-blue-400">
            XP: {mission.experience}
          </Typography>
        </Box>

        <Typography className="dark:text-gray-400 text-gray-500 mb-6">
          {mission.description}
        </Typography>

        {!shouldApplyOpacity && (
          <Box className="absolute inset-0 rounded-xl border-2 border-theme-red-900 opacity-25 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
        )}

        <Box className="relative mb-6">
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            className="h-2 rounded-full dark:bg-zinc-900 bg-gray-300"
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#ff4d4d',
              },
            }}
          />
          <Box className="absolute right-0 -top-6 text-white text-sm font-bold">
            {overallProgress}%
          </Box>
        </Box>

        <Typography className="text-lg md:text-xl font-bold text-theme-red-900 mb-2">
          Requirements
        </Typography>
        <List
          disablePadding
          className={`grid ${
            mission.requirements.length > 1
              ? 'md:grid-cols-2 grid-cols-1'
              : 'grid-cols-1'
          } gap-4 w-full`}>
          {mission.requirements.map((req) => (
            <ListItem
              disablePadding
              key={req.id}
              className="flex sm:flex-row flex-col sm:text-left text-center justify-between items-center text-gray-200 p-4 rounded-lg border border-zinc-900 my-2">
              <ListItemText
                primary={req.task}
                secondary={req.description}
                primaryTypographyProps={{
                  className: 'dark:text-white text-gray-700',
                }}
                secondaryTypographyProps={{
                  className: 'dark:text-white text-gray-700',
                }}
              />
              <Typography className="font-bold text-theme-red-900">
                {req.progress?.completed ? (
                  <IoCheckmarkOutline size={18} />
                ) : (
                  `${req.progress?.progress || 0}/${req.goal}`
                )}
              </Typography>
            </ListItem>
          ))}
        </List>

        {mission.rewards.length > 0 && (
          <RewardList rewards={mission.rewards} />
        )}

        {rewardsRedeemable && (
          <Box className="mt-4">
            <Button
              isLoading={isLoading}
              fullWidth
              onClick={handleRedeemRewards}>
              Redeem Rewards
            </Button>
          </Box>
        )}

        {getResetInfo()}

        <Box className="mt-4">
          <Chip
            label={
              mission.user_mission?.completed
                ? 'Completed'
                : overallProgress === 100
                  ? 'Redeemable'
                  : mission.status === 'available'
                    ? 'In Progress'
                    : mission.status.charAt(0).toUpperCase() +
                      mission.status.slice(1)
            }
            className={`capitalize text-white px-4 py-1 rounded-full shadow-lg ${
              mission.user_mission?.completed || overallProgress === 100
                ? 'bg-green-600'
                : mission.status === 'available'
                  ? 'bg-yellow-600'
                  : 'bg-theme-red-900'
            }`}
            icon={
              mission.user_mission?.completed ? (
                <FaCheckCircle className="text-white" />
              ) : overallProgress === 100 ? (
                <FaGift className="text-white" />
              ) : mission.status === 'available' ? (
                <FaPlayCircle className="text-white" />
              ) : (
                <IoClose className="text-white" />
              )
            }
          />
        </Box>

        {renderNewTag && (
          <Box className="absolute top-4 right-4 bg-theme-red-900 text-white px-2 py-1 rounded-lg text-xs shadow-lg">
            New
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default MissionCard
