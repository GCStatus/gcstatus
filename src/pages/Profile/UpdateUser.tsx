import { Stack, Typography } from '@mui/material'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input } from '@/components'
import { UpdateUserInterface } from '@/types'

import { updateUserValidations } from './validations'

function UpdateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInterface>({
    defaultValues: { email: '', nickname: '', password: '' },
  })

  const getProps = (
    key: keyof typeof updateUserValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...updateUserValidations[key],
      ...options,
    } as RegisterOptions<UpdateUserInterface>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmt: SubmitHandler<UpdateUserInterface> = (data) => {
    console.log(data)
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmt)}
      className="p-6 rounded-lg animate-fade-in">
      <Typography
        variant="h2"
        className="text-2xl font-bold mb-6 text-theme-red-900">
        Change Nickname & Email
      </Typography>

      <Stack spacing={3}>
        <Input
          isFull
          label="Nickname"
          placeholder="Type your new nickname..."
          {...getProps('nickname')}
        />
        <Input
          isFull
          type="email"
          label="Email"
          placeholder="Type your new email..."
          {...getProps('email')}
        />
        <Input
          isFull
          label="Confirm password"
          type="password"
          placeholder="Type your password..."
          {...getProps('password')}
        />

        <Button fullWidth type="submit">
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default UpdateUser
