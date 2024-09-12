import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import store from '@/store'

import SwitchSidebar from './SwitchSidebar'

const meta: Meta<typeof SwitchSidebar> = {
  title: 'Components/SwitchSidebar',
  component: SwitchSidebar,
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<SwitchSidebar />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  ),
}

export default meta
