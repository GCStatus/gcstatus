import type { Meta, StoryObj } from '@storybook/react'

import CookieConsent from './CookieConsent'

const meta: Meta<typeof CookieConsent> = {
  title: 'Components/CookieConsent',
  component: CookieConsent,
  args: {
    visible: true,
  },
  argTypes: {
    visible: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <CookieConsent {...args} />,
}

export default meta
