import type { Meta, StoryObj } from '@storybook/react'

import LoadingScreen from './LoadingScreen'

const meta: Meta<typeof LoadingScreen> = {
  title: 'Components/LoadingScreen',
  component: LoadingScreen,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <LoadingScreen />,
}

export default meta
