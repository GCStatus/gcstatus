import { Avatar, Box, Rating, Typography } from '@mui/material'

import { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

function ReviewCard(props: ReviewCardProps) {
  const { review } = props

  const rateColor = () => {
    if (review.rate < 2.5) return 'text-theme-red-900'
    else if (review.rate === 2.5) return 'text-orange-500'

    return 'text-green-500'
  }

  return (
    <Box className="relative p-4 border dark:border-gray-800 border-gray-100 bg-gradient-to-b dark:from-zinc-900 from-gray-200 to-transparent rounded-lg shadow-lg transition-all duration-300 sm:text-left text-center flex flex-col gap-2">
      <Box className="flex items-center sm:flex-row flex-col gap-2">
        <Avatar
          src={review.by.photo}
          alt={review.by.name}
          className="ring-2 ring-theme-red-900 w-12 h-12">
          {Array.from(review.by.name)[0]}
        </Avatar>
        <Box>
          <Typography className="text-lg font-bold text-dark dark:text-white">
            {review.by.nickname}
          </Typography>
          <Typography className="text-sm text-gray-700 dark:text-gray-300">
            {review.by.name}
          </Typography>
        </Box>
      </Box>

      <Typography className="text-sm text-gray-800 dark:text-gray-400 mb-4">
        {review.review}
      </Typography>

      <Box className="flex sm:justify-end justify-center items-center">
        <Rating
          readOnly
          value={review.rate}
          precision={0.5}
          className={rateColor()}
        />
      </Box>
      {review.consumed && (
        <Typography
          component="span"
          className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded animate-bounce absolute top-4 right-4">
          Consumed
        </Typography>
      )}
    </Box>
  )
}

export default ReviewCard
