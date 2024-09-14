import type { Meta, StoryObj } from '@storybook/react'
import { RegisterOptions, useForm } from 'react-hook-form'

import NewPassword, { NewPasswordProps } from './NewPassword'

const meta: Meta<typeof NewPassword> = {
  title: 'Components/NewPassword',
  component: NewPassword,
  args: {
    isFull: false,
    customClass: 'text-black',
  },
  argTypes: {
    isFull: {
      control: 'boolean',
    },
    customClass: {
      options: [
        'text-white',
        'text-black',
        'text-blue-500',
        'text-red-500',
        'text-orange-500',
      ],
      control: 'select',
    },
  },
}

type Story = StoryObj<typeof meta>

const Template = (args: NewPasswordProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<{ password: string }>()

  const storyValidations = {
    password: {
      required: 'A password is required.',
      minLength: {
        value: 8,
        message: 'The new password must have at least 8 characters.',
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
      },
    },
  }

  const getProps = (
    key: keyof typeof storyValidations,
    options?: RegisterOptions,
  ) => ({
    ...register(key, {
      ...storyValidations[key],
      ...options,
    } as RegisterOptions<{ password: string }>),
    error: !!errors[key],
    helperText: errors[key] && errors[key]?.message,
  })

  return <NewPassword {...args} getProps={getProps} />
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}

export default meta
