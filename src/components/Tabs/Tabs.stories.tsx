import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    spacing: 2,
    tabs: [
      {
        tab: 'First element',
        element: <>This is the first element of the tab!</>,
      },
      {
        tab: 'Second element',
        element: <>This is the second element of the tab!</>,
      },
      {
        tab: 'Third element',
        element: <>This is the third element of the tab!</>,
      },
    ],
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Tabs {...args} />,
}

export default meta
