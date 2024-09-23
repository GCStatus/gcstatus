import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/material'
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa'

import { Title, User } from '@/types'
import { calculateOverallProgress } from '@/utils'

interface TitleCardProps {
  user: User
  title: Title
}

function TitleCard(props: TitleCardProps) {
  const { title, user } = props

  const shouldApplyOpacity = [
    'completed',
    'canceled',
    'unavailable',
  ].includes(title.status)

  const handlePurchase = (title: Title) => {
    if (!title.cost) return

    if (user.coins >= title.cost) {
      alert(`Purchased title: ${title.title}`)
    }
  }

  return (
    <Card
      className={`relative p-6 dark:bg-theme-dark-900 bg-transparent rounded-xl border border-theme-red-900 ${
        shouldApplyOpacity
          ? 'opacity-50'
          : 'hover:-translate-y-2 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform'
      }`}>
      <CardContent className="text-white group flex flex-col">
        <Typography className="md:text-2xl text-xl font-bold mb-4 text-theme-red-900">
          {title.title}
        </Typography>
        <Typography className="dark:text-gray-400 text-gray-500 mb-6">
          {title.description}
        </Typography>

        {!shouldApplyOpacity && (
          <Box className="absolute inset-0 rounded-xl border-2 border-theme-red-900 opacity-25 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
        )}

        <Box className="relative mb-6">
          <LinearProgress
            variant="determinate"
            value={calculateOverallProgress(title.requirements)}
            className="h-2 rounded-full dark:bg-zinc-900 bg-gray-300"
            sx={{
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#ff4d4d',
              },
            }}
          />
          <Box className="absolute right-0 -top-6 text-white text-sm font-bold">
            {calculateOverallProgress(title.requirements)}%
          </Box>
        </Box>

        <Typography className="text-lg font-bold text-theme-red-900 mb-2">
          Requirements
        </Typography>
        <Box
          className={`grid ${
            title.requirements.length > 1
              ? 'md:grid-cols-2 grid-cols-1'
              : 'grid-cols-1'
          } md:gap-4 gap-2 w-full`}>
          {title.requirements.map((req) => (
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

        <Box className="mt-4 flex items-center">
          {title.status === 'completed' ? (
            <Chip
              label="Owned"
              className="capitalize bg-green-600 text-white px-4 py-1 rounded-full shadow-lg"
              icon={<FaCheckCircle />}
            />
          ) : title.purchasable ? (
            <Button
              fullWidth
              className={`bg-theme-red-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-all ${
                title.cost && user.coins < title.cost
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              startIcon={<FaShoppingCart />}
              disabled={title.cost ? user.coins < title.cost : true}
              onClick={() => handlePurchase(title)}>
              {title.cost && user.coins >= title.cost
                ? `Buy for ${title.cost} Coins`
                : 'Not Enough Coins'}
            </Button>
          ) : (
            <Chip
              label="Available"
              className="capitalize bg-yellow-600 text-white px-4 py-1 rounded-full shadow-lg"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default TitleCard
