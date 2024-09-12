import type { Meta, StoryObj } from '@storybook/react'
import * as AiIcons from 'react-icons/ai'
import * as CiIcons from 'react-icons/ci'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'
import * as MdIcons from 'react-icons/md'

const Icons = {
  ...IoIcons,
  ...FaIcons,
  ...MdIcons,
  ...AiIcons,
  ...CiIcons,
}

import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    name: 'AiFillAlert',
    color: 'red',
    fontSize: 100,
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(Icons),
    },
    color: {
      control: 'color',
    },
    fontSize: {
      control: 'number',
    },
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Icon {...args} />,
}

export default meta
