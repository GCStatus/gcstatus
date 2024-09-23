import { Stack, Typography } from '@mui/material'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, Input, NewPassword } from '@/components'
import { useSuccess } from '@/hooks'
import { useUpdatePasswordMutation } from '@/services/api'
import { UpdatePasswordInterface } from '@/types'

import { updatePasswordValidations } from './validations'

interface TempUpdatePasswordInterface {
  old_password: string
  password: string
  password_confirmation: string
}

function UpdatePassword() {
  const go = useNavigate()
  const [trigger, { data, isLoading, isSuccess }] =
    useUpdatePasswordMutation()
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TempUpdatePasswordInterface>({
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
    } as RegisterOptions<TempUpdatePasswordInterface>),
    type: 'password',
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmt: SubmitHandler<TempUpdatePasswordInterface> = async (
    data,
  ) => {
    const payload: UpdatePasswordInterface = {
      password: data.old_password,
      new_password: data.password,
      new_password_confirmation: data.password_confirmation,
    }

    await trigger(payload)
  }

  useSuccess(isSuccess, data?.message, () => {
    reset()
    go('/login')
  })

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

        <Button fullWidth type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default UpdatePassword
