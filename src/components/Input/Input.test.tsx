import { fireEvent, render } from '@testing-library/react'
import { IoPersonOutline } from 'react-icons/io5'

import Input, { InputProps } from './Input'

const renderInput = (props: InputProps = {}) => {
  return render(<Input {...props} />)
}

describe('Input Component', () => {
  it('renders input with correct placeholder and label', () => {
    const { getByLabelText, getByPlaceholderText } = renderInput({
      placeholder: 'Enter your name',
      label: 'Name',
    })

    expect(getByLabelText('Name')).toBeInTheDocument()
    expect(getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('toggles password visibility when clicking the toggle button', () => {
    const { getByPlaceholderText, getByRole } = renderInput({
      type: 'password',
      placeholder: 'Enter password',
    })

    const inputElement = getByPlaceholderText(
      'Enter password',
    ) as HTMLInputElement
    const toggleButton = getByRole('button')

    expect(inputElement.type).toBe('password')

    fireEvent.click(toggleButton)
    expect(inputElement.type).toBe('text')

    fireEvent.click(toggleButton)
    expect(inputElement.type).toBe('password')
  })

  it('renders a textarea when area prop is true', () => {
    const { getByPlaceholderText } = renderInput({
      area: true,
      rows: 5,
      placeholder: 'Enter your bio',
    })

    const textareaElement = getByPlaceholderText('Enter your bio')
    expect(textareaElement.tagName).toBe('TEXTAREA')
    expect(textareaElement).toHaveAttribute('rows', '5')
  })

  it('displays error message when error prop is true', () => {
    const { getByText, getByPlaceholderText } = renderInput({
      error: true,
      helperText: 'This field is required',
      placeholder: 'Enter your name',
    })

    expect(getByText('This field is required')).toBeInTheDocument()
    expect(getByPlaceholderText('Enter your name')).toHaveClass(
      'border-red-500',
    )
  })

  it('renders an icon when icon prop is provided', () => {
    const { getByRole } = renderInput({
      icon: <IoPersonOutline role="img" />,
      placeholder: 'Enter username',
    })

    expect(getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('applies custom class correctly', () => {
    const { getByPlaceholderText } = renderInput({
      placeholder: 'Enter name',
      customClass: 'custom-input-class',
    })

    const inputElement = getByPlaceholderText('Enter name')
    expect(inputElement).toHaveClass('custom-input-class')
  })

  it('sets the input width correctly based on isFull prop', () => {
    const { getByPlaceholderText } = renderInput({
      isFull: true,
      placeholder: 'Full width input',
    })

    const inputElement = getByPlaceholderText('Full width input')
    expect(inputElement).toHaveClass('w-full')
  })
})
