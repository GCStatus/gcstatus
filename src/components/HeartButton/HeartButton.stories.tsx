import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import store from '@/store'

import HeartButton from './HeartButton'

const meta: Meta<typeof HeartButton> = {
  title: 'Components/HeartButton',
  component: HeartButton,
  args: {
    heartable_id: faker.number.int(),
    heartable_type: 'games',
    isHearted: faker.datatype.boolean(),
    size: 32,
    type: 'icon',
  },
  argTypes: {
    type: {
      options: ['icon', 'button'],
      control: {
        type: 'select',
      },
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        {args.type === 'icon' ? (
          <div className="bg-gray-700 rounded-full w-16 h-16 flex justify-center items-center">
            <HeartButton {...args} />
          </div>
        ) : (
          <HeartButton {...args} />
        )}
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
