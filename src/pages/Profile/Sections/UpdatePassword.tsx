import { Stack, Typography } from '@mui/material'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, NewPassword } from '@/components'
import { UpdatePasswordInterface } from '@/types'

import { updatePasswordValidations } from './validations'

function UpdatePassword() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordInterface>({
    defaultValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  })

  const watchPassword = watch('password')

  const getProps = (
    key: keyof typeof updatePasswordValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...updatePasswordValidations[key],
      ...options,
    } as RegisterOptions<UpdatePasswordInterface>),
    type: 'password',
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmt: SubmitHandler<UpdatePasswordInterface> = (data) => {
    console.log(data)
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmt)}
      className="md:p-6 p-2 rounded-lg animate-fade-in">
      <Typography
        variant="h2"
        className="text-2xl font-bold mb-6 text-theme-red-900">
        Update Password
      </Typography>

      <Stack spacing={3}>
        <Input
          isFull
          label="Old password"
          placeholder="Type your old password..."
          {...getProps('old_password')}
        />
        <NewPassword getProps={getProps} />
        <Input
          isFull
          label="Password confirmation"
          placeholder="Confirm your new password..."
          {...getProps('password_confirmation', {
            validate: (value) =>
              watchPassword === value || 'Password does not match.',
          })}
        />

        <Button fullWidth type="submit">
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default UpdatePassword
