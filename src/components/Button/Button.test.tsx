import { fireEvent, render } from '@testing-library/react'

import Button, { ButtonProps } from './Button'

const buttonText = 'Default button'

const renderButton = (props: ButtonProps = { children: buttonText }) => {
  return render(<Button {...props}>{props.children}</Button>)
}

describe('Button Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { getByRole } = renderButton()

    const button = getByRole('button', { name: buttonText })

    expect(button).toBeInTheDocument()
  })

  it('displays the provided children', () => {
    const { getByText } = renderButton()

    const button = getByText(buttonText)

    expect(button).toBeInTheDocument()
  })

  it('renders with an icon when provided', () => {
    const { getByTestId } = renderButton({
      children: buttonText,
      icon: <span data-qa="test-icon">Icon</span>,
    })

    const icon = getByTestId('test-icon')

    expect(icon).toBeInTheDocument()
  })

  it('shows loading spinner and disables button when isLoading is true', () => {
    const { getByRole } = renderButton({
      children: buttonText,
      isLoading: true,
    })

    const button = getByRole('button')

    expect(button).toBeDisabled()

    const spinner = getByRole('progressbar')

    expect(spinner).toBeInTheDocument()
  })

  it('does not show children when isLoading is true', () => {
    const { getByRole, queryByText } = renderButton({
      children: buttonText,
      isLoading: true,
    })

    const button = getByRole('button')

    expect(button).toBeDisabled()

    const children = queryByText(buttonText)

    expect(children).not.toBeInTheDocument()
  })

  it('does not have a hover class when isLoading is true', () => {
    const { getByRole } = renderButton({
      children: buttonText,
      isLoading: true,
    })

    const button = getByRole('button')

    expect(button).not.toHaveClass('hover:bg-red-700')
  })

  it('applies fullWidth style when fullWidth prop is true', () => {
    const { getByRole } = renderButton({
      children: buttonText,
      fullWidth: true,
    })

    const button = getByRole('button')

    expect(button).toHaveClass('w-full')
  })

  it('handles button click events', () => {
    const handleClick = jest.fn()

    const { getByRole } = renderButton({
      children: buttonText,
      onClick: handleClick,
    })

    const button = getByRole('button')

    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('adds additional class names when provided', () => {
    const additionalClass = 'my-custom-class'

    const { getByRole } = renderButton({
      children: buttonText,
      className: additionalClass,
    })

    const button = getByRole('button')

    expect(button).toHaveClass(additionalClass)
  })

  it('does not call onClick when isLoading is true', () => {
    const handleClick = jest.fn()

    const { getByRole } = renderButton({
      children: buttonText,
      onClick: handleClick,
      isLoading: true,
    })

    const button = getByRole('button')

    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })
})
