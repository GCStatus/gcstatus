import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { MOCK_GAME_DETAILS } from '@/mocks'
import store from '@/store'

import Comments from './Comments'

const meta: Meta<typeof Comments> = {
  title: 'Components/Comments',
  component: Comments,
  args: {
    commentableType: 'games',
    commentableId: faker.number.int(),
    defaultComments: MOCK_GAME_DETAILS.comments,
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <Comments {...args} />
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
