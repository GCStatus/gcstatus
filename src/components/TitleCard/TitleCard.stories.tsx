import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { MOCK_TITLES, MOCK_USER } from '@/mocks'
import store from '@/store'
import { Title } from '@/types'

import TitleCard from './TitleCard'

const meta: Meta<typeof TitleCard> = {
  title: 'Components/TitleCard',
  component: TitleCard,
  args: {
    title: {
      ...(MOCK_TITLES.shift() as Title),
      purchasable: false,
    },
    user: MOCK_USER,
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <TitleCard {...args} />
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
