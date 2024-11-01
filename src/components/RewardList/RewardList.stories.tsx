import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import store from '@/store'
import { TitleReward } from '@/types'

import RewardList from './RewardList'

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

const meta: Meta<typeof RewardList> = {
  title: 'Components/RewardList',
  component: RewardList,
  args: {
    rewards,
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <RewardList {...args} />
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
