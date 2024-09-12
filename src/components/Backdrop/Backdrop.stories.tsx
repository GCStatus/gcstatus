import type { Meta, StoryObj } from '@storybook/react'

import Backdrop from './Backdrop'

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  args: {
    open: true,
  },
  argTypes: {
    toggleBackdrop: {
      type: 'function',
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Backdrop {...args} />,
}

export default meta
