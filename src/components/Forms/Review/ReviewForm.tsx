import {
  Box,
  Grid2,
  Rating as MuiRating,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Input } from '@/components'
import { GameDetails, ReviewStore } from '@/types'

import { validations } from './validations'

export interface ReviewFormProps {
  game: GameDetails
}

function ReviewForm(props: ReviewFormProps) {
  const { game } = props
  const [played, setPlayed] = useState<boolean>(false)
  const [rating, setRating] = useState<number | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewStore>({
    defaultValues: { review: '' },
  })

  const getProps = (
    key: keyof typeof validations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...validations[key],
      ...options,
    } as RegisterOptions<ReviewStore>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmit: SubmitHandler<ReviewStore> = async (data) => {
    if (!rating) {
      toast.error(validations.rate.required)

      return
    }

    const payload: ReviewStore = {
      ...data,
      played,
      userId: 1,
      rate: rating,
      gameId: game.id,
    }

    console.log(payload)
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={1.5} mb={2}>
        <Box className="w-full flex flex-col gap-2">
          <Typography
            variant="h6"
            className="dark:text-white text-gray-600">
            Rate the Game
          </Typography>
          <MuiRating
            name="rate"
            value={rating}
            precision={0.5}
            onChange={(_, v) => {
              if (v) {
                setRating(v)

                return
              }

              setRating(null)
            }}
            max={validations.rate.max.value}
            size="large"
            sx={{
              color: '#ff4d4d',
              '& .MuiRating-iconFilled': {
                color: '#ff4d4d',
              },
              '& .MuiRating-iconHover': {
                color: '#ff6666',
              },
            }}
          />
          {rating && (
            <Typography className="block text-gray-400 font-semibold mt-1">
              Rating: {rating}
            </Typography>
          )}
        </Box>
        <Box className="w-full flex flex-col gap-2">
          <Typography
            variant="h6"
            className="dark:text-white text-gray-600">
            Did you played this game?
          </Typography>
          <Switch
            name="played"
            value={played}
            checked={played}
            onChange={(_, v) => setPlayed(v)}
            sx={{
              '& .MuiSwitch-switchBase': {
                color: '#ff4d4d',
              },
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#ff4d4d',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#ff4d4d',
              },
              '& .MuiSwitch-track': {
                backgroundColor: '#ccc',
              },
            }}
          />
        </Box>

        <Input
          data-qa="comment"
          area
          isFull
          label="Review"
          placeholder="Write your review here..."
          {...getProps('review')}
        />
      </Grid2>

      <Button>Submit</Button>
    </Stack>
  )
}

export default ReviewForm
