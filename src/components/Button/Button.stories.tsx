import type { Meta, StoryObj } from '@storybook/react'
import { IoSend } from 'react-icons/io5'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Default button',
    isLoading: false,
    fullWidth: false,
  },
  argTypes: {
    children: {
      control: 'text',
    },
    isLoading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}

export const WithIcon: Story = {
  render: (args) => <Button {...args} icon={<IoSend />} />,
}

export default meta
