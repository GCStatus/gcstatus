import type { Meta, StoryObj } from '@storybook/react'

import { MOCK_GAME_DETAILS } from '@/mocks'

import ReviewForm from './ReviewForm'

const meta: Meta<typeof ReviewForm> = {
  title: 'Components/ReviewForm',
  component: ReviewForm,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ReviewForm game={MOCK_GAME_DETAILS} />,
}

export default meta
