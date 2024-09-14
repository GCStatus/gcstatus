import { render } from '@testing-library/react'

import Privacy from './Privacy'

const renderPrivacy = () => {
  return render(<Privacy />)
}

describe('Privacy Page', () => {
  it('renders Privacy heading', () => {
    const { getByText } = renderPrivacy()

    const headingElement = getByText(/privacy policy/i)

    expect(headingElement).toBeInTheDocument()
  })

  it('renders List of privacy policies', () => {
    const { getByRole } = renderPrivacy()

    const privacyList = getByRole('list')

    expect(privacyList).toBeInTheDocument()
  })

  it('renders all ListItem of privacy policies list', () => {
    const { getAllByRole } = renderPrivacy()

    const privacyItems = getAllByRole('listitem')

    expect(privacyItems).toHaveLength(5)
  })
})
