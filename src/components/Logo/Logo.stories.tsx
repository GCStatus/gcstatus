import type { Meta, StoryObj } from '@storybook/react'

import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  args: {
    color: 'fill-theme-dark-900',
    width: 'w-full max-w-48',
    height: 'h-full max-h-48',
  },
  argTypes: {
    color: {
      options: [
        'fill-theme-dark-900',
        'fill-theme-red-900',
        'fill-blue-500',
        'fill-green-500',
        'fill-red-500',
        'fill-orange-500',
        'fill-yellow-500',
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Logo>

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Logo {...args} />,
}

export default meta
