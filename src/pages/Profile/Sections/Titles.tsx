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

  return (
    <Stack className="md:p-6 p-2 rounded-lg animate-fade-in bg-theme-dark-900 min-h-screen">
      <Typography
        variant="h2"
        className="text-3xl font-extrabold mb-8 text-theme-red-900">
        Titles
      </Typography>

      <Stack spacing={4} className="w-full">
        {displayedTitles.map((title) => (
          <Card
            key={title.id}
            className={`relative bg-theme-dark-900 p-6 rounded-xl border border-theme-red-900 ${
              title.status === 'completed'
                ? 'opacity-50'
                : 'shadow-lg duration-500 hover:shadow-2xl hover:border-red-700 transition-transform hover:-translate-y-2'
            }`}>
            <CardContent className="text-white group flex flex-col">
              <Typography className="md:text-2xl text-xl font-bold mb-4 text-theme-red-900">
                {title.title}
              </Typography>
              <Typography className="text-gray-400 mb-6">
                {title.description}
              </Typography>

              <Box className="relative mb-6">
                <LinearProgress
                  variant="determinate"
                  value={calculateOverallProgress(title.requirements)}
                  className="h-2 rounded-full"
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ff4d4d',
                    },
                    backgroundColor: '#333',
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
                    <Typography className="text-base">
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
        ))}
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
              bgcolor: '#ff4d4d',
            },
          }}
        />
      </Box>
    </Stack>
  )
}

export default Titles
