import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { MOCK_MISSIONS } from '@/mocks'
import store from '@/store'
import { Mission } from '@/types'

import MissionCard from './MissionCard'

const meta: Meta<typeof MissionCard> = {
  title: 'Components/MissionCard',
  component: MissionCard,
  args: {
    mission: MOCK_MISSIONS.pop() as Mission,
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <MissionCard {...args} />
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
