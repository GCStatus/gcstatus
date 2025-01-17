import { LoadingButton as Button } from '@mui/lab'
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
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa'
import { IoCheckmarkOutline, IoSwapHorizontal } from 'react-icons/io5'

import {
  useBuyTitleMutation,
  useToggleTitleMutation,
} from '@/services/api'
import { Title, User } from '@/types'
import { calculateOverallProgress as c } from '@/utils'

export interface TitleCardProps {
  user: User
  title: Title
}

function TitleCard(props: TitleCardProps) {
  const { title, user } = props
  const [toggle, { data, isLoading, isSuccess }] = useToggleTitleMutation()
  const [
    buy,
    { data: buyData, isLoading: loadingBuy, isSuccess: buySuccess },
  ] = useBuyTitleMutation()

  useEffect(() => {
    if (isSuccess || buySuccess) {
      if (buyData) toast.success(buyData.message)
      if (data) toast.success(data.message)
    }
  }, [buySuccess, isSuccess])

  const overallProgress = c(
    title.rewardable?.sourceable.requirements || [],
  )

  const shouldApplyOpacity = ['canceled', 'unavailable'].includes(
    title.status.name,
  )

  const handlePurchase = async () => {
    if (!(title.cost && title.purchasable)) return

    if (user.wallet.balance >= title.cost) {
      await buy(title.id)
    }
  }

  const handleToggle = async () => {
    await toggle(title.id)
  }

  const isEnabled = user.title && user.title.id === title.id
  const hasRequirements =
    title.rewardable &&
    title.rewardable.sourceable &&
    title.rewardable.sourceable.requirements

  return (
    <Card
      className={`relative p-6 dark:bg-theme-dark-900 bg-transparent rounded-xl border border-theme-red-900 ${
        shouldApplyOpacity
          ? 'opacity-50'
          : 'hover:-translate-y-2 shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform'
      }`}>
      <CardContent
        className={`text-white group flex flex-col ${hasRequirements ? 'mb-6' : ''}`}>
        <Typography className="md:text-2xl text-xl font-bold mb-4 text-theme-red-900">
          {title.title}
        </Typography>
        <Typography className="dark:text-gray-400 text-gray-500">
          {title.description}
        </Typography>

        {!shouldApplyOpacity && (
          <Box className="absolute inset-0 rounded-xl border-2 border-theme-red-900 opacity-25 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
        )}

        {title.rewardable && title.rewardable.sourceable && (
          <>
            <Box className="relative my-6">
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
            <Typography className="text-lg font-bold text-theme-red-900 mb-2">
              Requirements
            </Typography>
            <Box
              className={`grid ${
                title.rewardable.sourceable.requirements.length > 1
                  ? 'md:grid-cols-2 grid-cols-1'
                  : 'grid-cols-1'
              } md:gap-4 gap-2 w-full`}>
              {title.rewardable.sourceable.requirements.map((req) => (
                <List
                  key={req.id}
                  disablePadding
                  className="flex justify-between items-center text-gray-200 p-4 rounded-lg border border-zinc-900 my-2">
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <Typography className="font-bold text-theme-red-900">
                        {req.progress?.completed ? (
                          <IoCheckmarkOutline size={18} />
                        ) : (
                          `${req.progress?.progress || 0}/${req.goal}`
                        )}
                      </Typography>
                    }>
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
                  </ListItem>
                </List>
              ))}
            </Box>
          </>
        )}

        {title.own ? (
          <Button
            fullWidth
            className="bg-theme-red-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-all mt-2"
            startIcon={<IoSwapHorizontal />}
            onClick={handleToggle}
            loading={isLoading}>
            {isEnabled ? 'Disable' : 'Enable'} title
          </Button>
        ) : (
          title.purchasable && (
            <Button
              fullWidth
              className={`bg-theme-red-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition-all mt-2 ${
                title.cost && user.wallet.balance < title.cost
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              startIcon={<FaShoppingCart />}
              disabled={
                title.cost ? user.wallet.balance < title.cost : true
              }
              onClick={handlePurchase}
              loading={loadingBuy}>
              Buy for {title.cost} Coins
            </Button>
          )
        )}
      </CardContent>

      {hasRequirements &&
        (title.own ? (
          <Chip
            label="Owned"
            className="capitalize bg-green-600 text-white px-4 py-1 rounded-full shadow-lg absolute bottom-4 left-10"
            icon={<FaCheckCircle color="white" />}
          />
        ) : (
          <Chip
            label="In progress"
            className="capitalize bg-yellow-600 text-white px-4 py-1 rounded-full shadow-lg absolute bottom-4 left-10"
          />
        ))}
    </Card>
  )
}

export default TitleCard
