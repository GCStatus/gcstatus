import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Select, { SelectProps } from './Select'

const mockOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

const defaultProps: SelectProps = {
  label: 'Test Select',
  options: mockOptions,
  defaultValue: '',
  onChange: jest.fn(),
}

const renderSelect = (props: SelectProps = defaultProps) => {
  return render(<Select {...props} />)
}

describe('Select Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const user = userEvent.setup()

  it('renders select component with label', () => {
    const { getByText, getByRole } = renderSelect()

    expect(getByText('Test Select')).toBeInTheDocument()

    const select = getByRole('combobox')

    expect(select).toBeInTheDocument()
  })

  it('opens dropdown and shows options when clicked', async () => {
    const { getByRole } = renderSelect()

    const select = getByRole('combobox')

    await user.click(select)

    mockOptions.forEach((option) => {
      expect(
        getByRole('option', { name: option.label }),
      ).toBeInTheDocument()
    })
  })

  it('selects an option and triggers onChange', async () => {
    const handleChange = jest.fn()

    const { getByRole } = renderSelect({
      ...defaultProps,
      onChange: handleChange,
    })

    const select = getByRole('combobox')

    await user.click(select)

    const option1 = getByRole('option', { name: 'Option 1' })

    await user.click(option1)

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toBe('option1')
  })

  it('displays custom renderValue', () => {
    const renderValue = jest.fn((selected) => `Selected: ${selected}`)

    const { getByText } = renderSelect({
      ...defaultProps,
      renderValue,
      defaultValue: 'option1',
    })

    expect(getByText('Selected: option1')).toBeInTheDocument()
  })

  it('disables the select component when the disabled prop is true', () => {
    const { getByRole } = renderSelect({
      ...defaultProps,
      disabled: true,
    })

    const select = getByRole('combobox')
    expect(select).toHaveAttribute('aria-disabled', 'true')

    user.click(select)
    expect(select).not.toHaveFocus()
  })

  it('applies full width class when isFull is true', () => {
    const { container } = renderSelect({
      ...defaultProps,
      isFull: true,
    })

    const selectBox = container.querySelector('.w-full')
    expect(selectBox).toBeInTheDocument()
  })

  it('selects the default value', () => {
    const { getByText, getByRole } = renderSelect({
      ...defaultProps,
      defaultValue: 'option2',
    })

    const select = getByRole('combobox')
    expect(select).toHaveTextContent('Option 2')

    user.click(select)
    expect(getByText('Option 2')).toBeInTheDocument()
  })

  it('does not trigger onChange if the same option is clicked', async () => {
    const handleChange = jest.fn()

    const { getByRole } = renderSelect({
      ...defaultProps,
      onChange: handleChange,
    })

    const select = getByRole('combobox')

    await user.click(select)

    const option1 = getByRole('option', { name: 'Option 1' })
    await user.click(option1)

    expect(handleChange).toHaveBeenCalledTimes(1)

    await user.click(option1)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders checkboxes in multiple mode', async () => {
    const { getByRole, getAllByRole } = renderSelect({
      ...defaultProps,
      multiple: true,
      defaultValue: ['option1'],
    })

    const select = getByRole('combobox')

    await user.click(select)

    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes.length).toBe(mockOptions.length)

    expect(checkboxes[0]).toBeChecked()
  })

  it('clears all selections in multiple mode', async () => {
    const handleChange = jest.fn()

    const { getByRole } = renderSelect({
      ...defaultProps,
      multiple: true,
      defaultValue: ['option1', 'option2'],
      onChange: handleChange,
    })

    const select = getByRole('combobox')

    await user.click(select)

    const option1 = getByRole('option', { name: 'Option 1' })
    const option2 = getByRole('option', { name: 'Option 2' })

    await user.click(option1)
    await user.click(option2)

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[1][0].target.value).toEqual([])
  })

  it('allows multiple selections and updates selected values correctly', async () => {
    const handleChange = jest.fn()

    const { getByRole, getAllByRole } = renderSelect({
      ...defaultProps,
      multiple: true,
      defaultValue: ['option1'],
      onChange: handleChange,
    })

    const select = getByRole('combobox')

    await user.click(select)

    const options = getAllByRole('option')

    expect(options[0]).toHaveTextContent('Option 1')

    const option2 = getByRole('option', { name: 'Option 2' })
    await user.click(option2)

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange.mock.calls[0][0].target.value).toEqual([
      'option1',
      'option2',
    ])

    const option1 = getByRole('option', { name: 'Option 1' })
    await user.click(option1)

    expect(handleChange.mock.calls[1][0].target.value).toEqual(['option2'])
  })
})
