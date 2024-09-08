import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa'

import { MOCK_TITLES } from '@/mocks'
import { Title } from '@/types'
import { calculateOverallProgress } from '@/utils'

const userCoins = 1200

function Titles() {
  const [titles] = useState<Title[]>(MOCK_TITLES)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const titlesPerPage = 3

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const displayedTitles = titles.slice(
    (currentPage - 1) * titlesPerPage,
    currentPage * titlesPerPage,
  )

  const handlePurchase = (title: Title) => {
    if (!title.cost) return

    if (userCoins >= title.cost) {
      alert(`Purchased title: ${title.title}`)
    }
  }

  const shouldEffects = (title: Title) => {
    const shouldApplyOpacity = [
      'completed',
      'canceled',
      'unavailable',
    ].includes(title.status)

    const shouldShowBox = !shouldApplyOpacity

    return { shouldApplyOpacity, shouldShowBox }
  }

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in dark:bg-theme-dark-900 bg-transparent min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Titles
      </Typography>

      <Stack spacing={4} className="w-full">
        {displayedTitles.map((title) => {
          const { shouldApplyOpacity, shouldShowBox } =
            shouldEffects(title)

          return (
            <Card
              key={title.id}
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

                {shouldShowBox && (
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
                        title.cost && userCoins < title.cost
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      startIcon={<FaShoppingCart />}
                      disabled={title.cost ? userCoins < title.cost : true}
                      onClick={() => handlePurchase(title)}>
                      {title.cost && userCoins >= title.cost
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
        })}
      </Stack>

      <Box className="flex md:justify-end justify-center mt-8">
        <Pagination
          count={Math.ceil(titles.length / titlesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#ff4d4d',
              '&:hover': {
                color: '#fff',
                bgcolor: '#ff4d4d',
              },
            },
            '& .Mui-selected': {
              color: '#fff',
              bgcolor: '#ff4d4d !important',
            },
          }}
        />
      </Box>
    </Stack>
  )
}

export default Titles
