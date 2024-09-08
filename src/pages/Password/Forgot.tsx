import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'

import { AuthBg, Input, Logo } from '@/components'
import { ForgotInterface } from '@/types'

import { forgotValidations } from './validations'

function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInterface>()

  const getProps = (
    key: keyof typeof forgotValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...forgotValidations[key],
      ...options,
    } as RegisterOptions<ForgotInterface>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmit: SubmitHandler<ForgotInterface> = (data) => {
    console.log(data)
  }

  return (
    <Box className="relative w-full min-h-screen overflow-hidden">
      <AuthBg cover="https://images8.alphacoders.com/956/956694.jpg" />

      <Container
        maxWidth="sm"
        className="relative z-20 flex flex-col justify-center items-center min-h-screen p-8">
        <Typography
          variant="h2"
          className="text-5xl font-extrabold text-theme-red-900 text-center mb-8 pixel-font animate-pulse">
          Forgot password
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
            <Input
              isFull
              type="email"
              label="Email"
              placeholder="Type your email..."
              {...getProps('email')}
              customClass="text-white"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-lg mb-4">
              Send reset link
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
              Login
              <Box
                component="span"
                className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-theme-red-900"
              />
            </Link>
            <Link
              href="/register"
              className="text-white relative group hover:no-underline transition duration-300 pixelated-link">
              Register
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

export default Forgot
