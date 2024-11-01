import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { MOCK_HOT_GAMES } from '@/mocks'
import store from '@/store'
import { GameList } from '@/types'

import GameCard from './GameCard'

const meta: Meta<typeof GameCard> = {
  title: 'Components/GameCard',
  component: GameCard,
  args: {
    view: 'grid',
    game: MOCK_HOT_GAMES.pop() as GameList,
  },
  argTypes: {
    view: {
      options: ['grid', 'list'],
      control: 'select',
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <div
          className={`container grid ${args.view === 'grid' ? 'lg:grid-cols-3 sm:grid-cols-2 grid-cols-1' : 'grid-cols-1'}`}>
          <GameCard key={1} {...args} />
        </div>
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
