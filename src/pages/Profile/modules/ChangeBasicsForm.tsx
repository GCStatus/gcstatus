import { Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input } from '@/components'
import { useSuccess } from '@/hooks'
import { useUpdateUserBasicsMutation } from '@/services/api'
import { UpdateUserBasicsInterface, User } from '@/types'

import { updateUserBasicsValidations } from './validations'

interface ChangeBasicsFormProps {
  user: User
}

function ChangeBasicsForm(props: ChangeBasicsFormProps) {
  const { user } = props
  const [trigger, { data, isLoading, isSuccess }] =
    useUpdateUserBasicsMutation()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserBasicsInterface>({
    defaultValues: { name: '', birthdate: '' },
  })

  const getProps = (
    key: keyof typeof updateUserBasicsValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...updateUserBasicsValidations[key],
      ...options,
    } as RegisterOptions<UpdateUserBasicsInterface>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmt: SubmitHandler<UpdateUserBasicsInterface> = async (
    data,
  ) => {
    const payload: UpdateUserBasicsInterface = {
      name: data.name,
      birthdate: data.birthdate + 'T00:00:00',
    }

    await trigger(payload)
  }

  useSuccess(isSuccess, data?.message)

  useEffect(() => {
    const formattedBirthdate = user.birthdate
      ? format(new Date(user.birthdate), 'yyyy-MM-dd')
      : ''

    if (user) {
      reset({
        name: user.name,
        birthdate: formattedBirthdate,
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
        Change Basic Informations
      </Typography>

      <Stack spacing={3}>
        <Input
          isFull
          label="Name"
          placeholder="Type your new name..."
          {...getProps('name')}
        />

        <Input
          isFull
          type="date"
          label="Birthdate"
          placeholder="Tell us your birthdate..."
          {...getProps('birthdate')}
          customClass="text-white"
        />

        <Button fullWidth type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default ChangeBasicsForm
