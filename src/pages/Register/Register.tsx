import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'

import { AuthBg, Input, Logo, NewPassword } from '@/components'
import { RegisterCredentials } from '@/types'

import { validations } from './validations'

function Login() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  const watchPassword = watch('password')

  const getProps = (
    key: keyof typeof validations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...validations[key],
      ...options,
    } as RegisterOptions<RegisterCredentials>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmit: SubmitHandler<RegisterCredentials> = (data) => {
    console.log(data)
  }

  const handleSocialLogin = (platform: string) => {
    console.log(`Register with ${platform}`)
  }

  return (
    <Box className="relative w-full min-h-screen overflow-hidden">
      <AuthBg cover="https://i.pinimg.com/originals/65/f7/54/65f75457a06e3748b72e14fa90dc5ab8.jpg" />

      <Container
        maxWidth="sm"
        className="relative z-20 flex flex-col justify-center items-center min-h-screen p-8">
        <Typography
          variant="h2"
          className="text-5xl font-extrabold text-theme-red-900 text-center mb-8 pixel-font animate-pulse">
          Register
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
              label="Name"
              placeholder="Type your name..."
              {...getProps('name')}
              customClass="text-white"
            />

            <Input
              isFull
              type="email"
              label="Email"
              placeholder="Type your email..."
              {...getProps('email')}
              customClass="text-white"
            />

            <Input
              isFull
              label="Nickname"
              placeholder="Tell us your nickname..."
              {...getProps('nickname')}
              customClass="text-white"
            />

            <Input
              isFull
              type="date"
              label="Birthdate"
              placeholder="Tell us your birthdate..."
              {...getProps('birthdate')}
              customClass="text-white"
            />

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
              Register
            </Button>
          </Stack>

          <Stack alignItems="center" className="mb-4">
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

          <Typography className="text-center text-gray-400 mb-4">
            Or register using:
          </Typography>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <Button
              variant="contained"
              className="flex items-center justify-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:-translate-y-1 duration-300"
              onClick={() => handleSocialLogin('Google')}>
              <FaGoogle className="mr-2" />
              Google
            </Button>
            <Button
              variant="contained"
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:-translate-y-1 duration-300"
              onClick={() => handleSocialLogin('Facebook')}>
              <FaFacebook className="mr-2" />
              Facebook
            </Button>
            <Button
              variant="contained"
              className="flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:-translate-y-1 duration-300"
              onClick={() => handleSocialLogin('Twitter')}>
              <FaTwitter className="mr-2" />
              Twitter
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Login
