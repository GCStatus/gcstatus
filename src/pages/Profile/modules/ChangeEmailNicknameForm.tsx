import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Button, Input } from '@/components'
import { useSuccess } from '@/hooks'
import { useUpdateNickAndEmailMutation } from '@/services/api'
import { logout } from '@/store/accountSlice'
import { UpdateUserNickAndEmailInterface, User } from '@/types'

import { updateUserNickAndEmailValidations } from './validations'

interface ChangeEmailNicknameFormProps {
  user: User
}

function ChangeEmailNicknameForm(props: ChangeEmailNicknameFormProps) {
  const { user } = props
  const dispatch = useDispatch()
  const [trigger, { data, isLoading, isSuccess }] =
    useUpdateNickAndEmailMutation()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserNickAndEmailInterface>({
    defaultValues: { email: '', nickname: '', password: '' },
  })

  const getProps = (
    key: keyof typeof updateUserNickAndEmailValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...updateUserNickAndEmailValidations[key],
      ...options,
    } as RegisterOptions<UpdateUserNickAndEmailInterface>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmt: SubmitHandler<UpdateUserNickAndEmailInterface> = async (
    data,
  ) => {
    await trigger(data)
  }

  useSuccess(isSuccess, data?.message, () => dispatch(logout()))

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        nickname: user.nickname,
      })
    }
  }, [user])

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmt)}
      className="md:p-6 p-2 rounded-lg animate-fade-in">
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

        <Button fullWidth type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default ChangeEmailNicknameForm
