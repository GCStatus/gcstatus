import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import {
  Controller,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Button, Input } from '@/components'
import { useSuccess } from '@/hooks'
import { useUpdateSocialsMutation } from '@/services/api'
import { logout } from '@/store/accountSlice'
import { Profile, User } from '@/types'

import { updateSocialsValidations } from './validations'

interface UpdateSocialsProps {
  user: User
}

function UpdateSocials(props: UpdateSocialsProps) {
  const { user } = props
  const dispatch = useDispatch()
  const [trigger, { data, isLoading, isSuccess }] =
    useUpdateSocialsMutation()
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    defaultValues: {
      share: user.profile.share || false,
    },
  })

  const getProps = (
    key: keyof typeof updateSocialsValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...updateSocialsValidations[key],
      ...options,
    } as RegisterOptions<Profile>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  const onSubmt: SubmitHandler<Profile> = async (data) => {
    await trigger(data)
  }

  useSuccess(isSuccess, data?.message, () => dispatch(logout()))

  useEffect(() => {
    if (user) {
      reset({
        share: user.profile.share,
        phone: user.profile.phone,
        twitch: user.profile.twitch,
        youtube: user.profile.youtube,
        twitter: user.profile.twitter,
        facebook: user.profile.facebook,
        instagram: user.profile.instagram,
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
        Update Password
      </Typography>

      <Stack spacing={3}>
        <Input
          isFull
          label="Phone number"
          placeholder="Type your phone number..."
          {...getProps('phone')}
        />

        <Input
          isFull
          label="My YouTube"
          placeholder="Type your youtube channel..."
          {...getProps('youtube')}
        />

        <Input
          isFull
          label="My Twitch"
          placeholder="Type your twitch channel..."
          {...getProps('twitch')}
        />

        <Input
          isFull
          label="My Facebook"
          placeholder="Type your facebook url..."
          {...getProps('facebook')}
        />

        <Input
          isFull
          label="My Instagram"
          placeholder="Type your instagram url..."
          {...getProps('instagram')}
        />

        <Input
          isFull
          label="My Twitter"
          placeholder="Type your twitter url..."
          {...getProps('twitter')}
        />

        <FormGroup>
          <FormControlLabel
            label="I want to share my socials with another GCStatus users."
            control={
              <Controller
                name="share"
                control={control}
                render={({ field }) => (
                  <Tooltip
                    disableInteractive
                    title={`${user.profile.share ? 'Disable' : 'Enable'} socials sharing on GCStatus.`}>
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="error"
                    />
                  </Tooltip>
                )}
              />
            }
          />
        </FormGroup>

        <Button fullWidth type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </Stack>
    </Stack>
  )
}

export default UpdateSocials
