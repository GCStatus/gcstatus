import { Button } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import store from '@/store'

import ActionDialog, { ActionDialogProps } from './ActionDialog'

const meta: Meta<typeof ActionDialog> = {
  title: 'Components/ActionDialog',
  component: ActionDialog,
  args: {
    confirmAction: () => console.log('confirmed action'),
    children: <>This is just a dialog story.</>,
    title: 'This is a storybook for ActionDialog',
    trigger: <Button variant="contained">Open dialog</Button>,
  },
  argTypes: {},
}

export const Default: Story = {
  render: (args) => (
    <Provider store={store}>
      <ActionDialog {...args} />
    </Provider>
  ),
}

type Story = StoryObj<ActionDialogProps>

export default meta
