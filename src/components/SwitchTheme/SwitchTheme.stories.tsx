import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import store from '@/store'

import SwitchTheme from './SwitchTheme'

const meta: Meta<typeof SwitchTheme> = {
  title: 'Components/SwitchTheme',
  component: SwitchTheme,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<SwitchTheme />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
