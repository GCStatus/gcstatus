import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import AuthBg from './AuthBg'

const meta: Meta<typeof AuthBg> = {
  title: 'Components/AuthBg',
  component: AuthBg,
  args: {
    cover: faker.image.url(),
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <AuthBg {...args} />,
}

export default meta
