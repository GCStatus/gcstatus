import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { AuthBg, Input, Logo, NewPassword } from '@/components'
import { ResetInterface } from '@/types'
import { getParam } from '@/utils'

import { resetValidations } from './validations'

function Reset() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInterface>()
  const { token = '' } = useParams()
  const email = getParam('email')

  const watchPassword = watch('password')

  const getProps = (
    key: keyof typeof resetValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...resetValidations[key],
      ...options,
    } as RegisterOptions<ResetInterface>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmit: SubmitHandler<ResetInterface> = (data) => {
    if (!email || !token) {
      toast.error(
        'There is something wrong. Please, try repeating the process or get in touch with moderation.',
      )
    }

    const payload: ResetInterface = {
      email,
      token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }

    console.log(payload)
  }

  return (
    <Box className="relative w-full min-h-screen overflow-hidden">
      <AuthBg cover="https://images4.alphacoders.com/110/1105295.jpg" />

      <Container
        maxWidth="sm"
        className="relative z-20 flex flex-col justify-center items-center min-h-screen p-8">
        <Typography
          variant="h2"
          className="text-5xl font-extrabold text-theme-red-900 text-center mb-8 pixel-font animate-pulse">
          Reset password
        </Typography>

        <Box className="w-full sm:p-6 p-4 rounded-lg bg-black bg-opacity-80 border border-theme-red-900 shadow-lg animate-pulse">
          <Box className="flex justify-center items-center mb-8">
            <Link href="/">
              <Logo color="fill-theme-red-900" />
            </Link>
          </Box>

          <Stack
            noValidate
            component="form"
            spacing={2}
            direction="column"
            onSubmit={handleSubmit(onSubmit)}>
            <NewPassword getProps={getProps} />

            <Input
              isFull
              type="password"
              label="Password confirmation"
              placeholder="Confirm your password..."
              {...getProps('password_confirmation', {
                validate: (value) =>
                  value === watchPassword || 'Password does not match!',
              })}
              customClass="text-white"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-lg mb-4">
              Reset
            </Button>
          </Stack>

          <Stack
            alignItems="center"
            spacing={{ md: 0, xs: 1 }}
            direction={{ md: 'row', xs: 'column' }}
            justifyContent={{ md: 'space-between', xs: 'center' }}
            className="mb-6">
            <Link
              href="/login"
              className="text-white relative group hover:no-underline transition duration-300 pixelated-link">
              Back to login
              <Box
                component="span"
                className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-theme-red-900"
              />
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Reset
