import { fireEvent, render } from '@testing-library/react'

import { passwordRequirements } from '@/utils'

import NewPassword, { NewPasswordProps } from './NewPassword'

const mockProps: NewPasswordProps = {
  getProps: jest.fn(),
}

const renderNewPassword = (props: NewPasswordProps = mockProps) => {
  return render(<NewPassword {...props} />)
}

describe('NewPassword Component', () => {
  it('renders correctly', () => {
    const { getByLabelText } = renderNewPassword()

    const input = getByLabelText(/password/i)

    expect(input).toBeInTheDocument()
  })

  it('displays password requirements list', () => {
    const { getByLabelText, getByText } = renderNewPassword()

    const input = getByLabelText(/password/i)

    fireEvent.focus(input)

    passwordRequirements.forEach((requirement) => {
      expect(getByText(requirement.label)).toBeInTheDocument()
    })
  })

  it('uses custom class and isFull prop', () => {
    const { rerender, getByLabelText } = renderNewPassword({
      ...mockProps,
      isFull: false,
      customClass: 'custom-class',
    })

    const input = getByLabelText(/password/i)

    expect(input).toHaveClass('custom-class')
    expect(input).not.toHaveClass('w-full')

    rerender(<NewPassword {...mockProps} customClass="new-class" isFull />)

    expect(input).toHaveClass('new-class w-full')
  })
})
