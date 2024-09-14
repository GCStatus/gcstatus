import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'

import AuthBg, { AuthBgProps } from './AuthBg'

const cover = faker.image.urlPlaceholder()

const renderAuthBg = (props: AuthBgProps = { cover }) => {
  return render(<AuthBg {...props} />)
}

describe('AuthBg Component', () => {
  it('renders without crashing', () => {
    const { getByRole } = renderAuthBg()

    const container = getByRole('presentation')

    expect(container).toBeInTheDocument()
  })

  it('applies the correct background image', () => {
    const { getByTestId } = renderAuthBg()

    const backgroundElement = getByTestId('background-image')

    expect(backgroundElement).toHaveStyle(
      `background-image: url(${cover})`,
    )

    expect(backgroundElement).toHaveStyle('background-attachment: fixed')
  })

  it('renders all gradient overlays', () => {
    const { getByTestId } = renderAuthBg()

    const topGradient = getByTestId('top-gradient')
    expect(topGradient).toBeInTheDocument()

    const bottomGradient = getByTestId('bottom-gradient')
    expect(bottomGradient).toBeInTheDocument()

    const blackOverlay = getByTestId('black-overlay')
    expect(blackOverlay).toBeInTheDocument()
  })
})
