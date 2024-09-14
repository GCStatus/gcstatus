import { render, screen } from '@testing-library/react'

import Logo, { LogoProps } from './Logo'

const renderLogo = (props: LogoProps = {}) => {
  return render(<Logo {...props} />)
}

describe('Logo Component', () => {
  it('renders the logo with default properties', () => {
    const { getByRole } = renderLogo()
    const logo = getByRole('img')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass('max-w-48 w-full max-h-14 h-full')
  })

  it('renders the logo with custom width and height', () => {
    render(<Logo width="w-32" height="h-10" color="fill-red-500" />)

    const logo = screen.getByRole('img')

    expect(logo).toHaveClass('w-32 h-10')
  })

  it('applies custom color class', () => {
    const { getByTestId } = renderLogo({ color: 'fill-red-500' })

    const vector = getByTestId('vector')

    expect(vector).toHaveClass('fill-red-500')
  })
})
