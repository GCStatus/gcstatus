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

import { AuthBg, Input, Logo } from '@/components'
import { LoginCredentials } from '@/types'

import { validations } from './validations'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>()

  const getProps = (
    key: keyof typeof validations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...validations[key],
      ...options,
    } as RegisterOptions<LoginCredentials>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    console.log(data)
  }

  const handleSocialLogin = (platform: string) => {
    console.log(`Login with ${platform}`)
  }

  return (
    <Box className="relative w-full min-h-screen overflow-hidden">
      <AuthBg cover="https://www.pixel4k.com/wp-content/uploads/2020/05/devil-may-cry-dante_1589581989.jpg" />

      <Container
        maxWidth="sm"
        className="relative z-20 flex flex-col justify-center items-center min-h-screen p-8">
        <Typography
          variant="h2"
          className="text-5xl font-extrabold text-theme-red-900 text-center mb-8 pixel-font animate-pulse">
          Login
        </Typography>

        <Box className="w-full sm:p-6 p-4 rounded-lg bg-black bg-opacity-80 border border-theme-red-900 shadow-lg animate-pulse">
          <Box className="flex justify-center items-center mb-8">
            <Link href="/">
              <Logo color="fill-theme-red-900" />
            </Link>
          </Box>

          <Stack
            component="form"
            spacing={2}
            direction="column"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              isFull
              label="Nickname/Email"
              customClass="text-white"
              placeholder="Type your nickname or email..."
              {...getProps('identifier')}
            />

            <Input
              isFull
              type="password"
              label="Password"
              customClass="text-white"
              placeholder="Type your password..."
              {...getProps('password')}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white py-2 px-4 rounded-full transition-transform transform hover:scale-105 shadow-lg mb-4">
              Login
            </Button>
          </Stack>

          <Stack
            alignItems="center"
            spacing={{ md: 0, xs: 1 }}
            direction={{ md: 'row', xs: 'column' }}
            justifyContent={{ md: 'space-between', xs: 'center' }}
            className="mb-4">
            <Link
              href="/register"
              className="text-white relative group hover:no-underline transition duration-300 pixelated-link">
              Register
              <Box
                component="span"
                className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-theme-red-900"
              />
            </Link>
            <Link
              href="/password/forgot"
              className="text-white relative group hover:no-underline transition duration-300 pixelated-link">
              Forgot Password?
              <Box
                component="span"
                className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-theme-red-900"
              />
            </Link>
          </Stack>

          <Typography className="text-center text-gray-400 mb-4">
            Or login with:
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
