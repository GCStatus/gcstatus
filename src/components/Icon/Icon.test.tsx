import { render } from '@testing-library/react'

import Icon, { IconProps } from './Icon'

const renderIcon = (props: IconProps = { name: 'IoAccessibility' }) => {
  return render(<Icon {...props} data-qa="icon" />)
}

describe('Icon Component', () => {
  it('renders the correct icon for a valid name', () => {
    const { getByTestId } = renderIcon()

    const iconElement = getByTestId('icon')
    expect(iconElement).toBeInTheDocument()
  })

  it('falls back to IoNotificationsOutline when an invalid name is provided', () => {
    // @ts-expect-error expect invalid name for Icon component
    const { getByTestId } = render(<Icon name="Invalid" data-qa="icon" />)

    const iconElement = getByTestId('icon')
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveAttribute(
      'data-icon',
      'IoNotificationsOutline',
    )
  })

  it('applies additional props to the rendered icon', () => {
    const { getByTestId } = render(
      <Icon name="IoAddCircleOutline" data-qa="icon" color="red" />,
    )

    const iconElement = getByTestId('icon')
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveStyle('color: red')
  })
})
