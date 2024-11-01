import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { MOCK_USER } from '@/mocks'
import store from '@/store'
import { TitleReward } from '@/types'

import LevelCard from './LevelCard'

const rewards: TitleReward[] = [
  {
    id: 1,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    sourceable_type: 'game',
    rewardable_type: 'titles',
    title: {
      id: 101,
      title: 'Champion',
      description: 'Awarded for outstanding performance',
      purchasable: false,
      status: 'active',
      created_at: '2024-01-01',
      requirements: null,
    },
  },
]

const level = {
  id: 1,
  coins: 50,
  experience: 100,
  level: 1,
  rewards,
}

const meta: Meta<typeof LevelCard> = {
  title: 'Components/LevelCard',
  component: LevelCard,
  args: {
    level,
    user: MOCK_USER,
    label: `Level ${level.level}`,
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <LevelCard {...args} />
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
