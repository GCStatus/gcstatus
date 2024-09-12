import type { Meta, StoryObj } from '@storybook/react'
import { IoSendOutline } from 'react-icons/io5'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Type your text here...',
    type: 'text',
    area: false,
    isFull: false,
    helperText: 'Helper text on error...',
    error: true,
    label: 'Input label',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    isFull: {
      control: 'boolean',
    },
    area: {
      control: 'boolean',
    },
    type: {
      options: ['text', 'email', 'date', 'tel', 'password'],
      control: 'select',
    },
  },
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Input {...args} />,
}

export const WithIcon: Story = {
  render: (args) => <Input {...args} icon={<IoSendOutline />} />,
}

export default meta
