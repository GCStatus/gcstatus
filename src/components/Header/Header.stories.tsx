import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import store from '@/store'

import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  args: {
    withCarousel: true,
  },
  argTypes: {
    withCarousel: {
      control: 'boolean',
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<Header {...args} />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
