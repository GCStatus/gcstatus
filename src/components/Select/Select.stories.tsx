import { SelectChangeEvent } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { MOCK_CATEGORIES } from '@/mocks'

import Select, { SelectProps } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: {
    isFull: false,
    disabled: false,
    multiple: false,
    label: 'Select an Option',
    options: [5, 10, 15, 20, 30, 50, 100].map((opt) => ({
      value: opt,
      label: opt.toString(),
    })),
    defaultValue: 5,
  },
  argTypes: {
    isFull: {
      control: 'boolean',
      description: 'Make the select take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select component',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selection',
    },
    label: {
      control: 'text',
      description: 'The label for the select component',
    },
    defaultValue: {
      control: 'text',
      description: 'The default value of the select component',
    },
    options: {
      control: 'object',
      description: 'The options for the select dropdown',
    },
  },
}

type Story = StoryObj<SelectProps>

const Template = (args: SelectProps) => {
  const [select, setSelect] = useState<number>(5)

  const handlePageChange = (e: SelectChangeEvent<number>) => {
    setSelect(e.target.value as number)
  }

  const PAGE_OPTIONS = [5, 10, 15, 20, 30, 50, 100]

  return (
    <Select
      {...args}
      label="Month"
      defaultValue={select}
      onChange={handlePageChange}
      options={PAGE_OPTIONS.map((opt) => ({
        value: opt,
        label: opt.toString(),
      }))}
    />
  )
}

const MultipleTemplate = (args: SelectProps) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    [],
  )

  const categories = MOCK_CATEGORIES

  const handleCategoryChange = (e: SelectChangeEvent<number[]>) => {
    setSelectedCategories(e.target.value as number[])
  }

  return (
    <Select
      {...args}
      multiple
      label="Categories"
      onChange={handleCategoryChange}
      defaultValue={selectedCategories}
      options={categories.map(({ id, name }) => ({
        value: id,
        label: name,
      }))}
      renderValue={(selected) =>
        selected
          .map((id: any) => categories.find((cat) => cat.id === id)?.name)
          .join(', ')
      }
    />
  )
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}

export const Multiple: Story = {
  render: (args) => <MultipleTemplate {...args} />,
}

export default meta
