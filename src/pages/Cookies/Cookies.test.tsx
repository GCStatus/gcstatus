import { render } from '@testing-library/react'

import Cookies from './Cookies'

const renderCookies = () => {
  return render(<Cookies />)
}

describe('Cookies Page', () => {
  it('renders Cookies heading', () => {
    const { getByText } = renderCookies()

    const headingElement = getByText(/cookies policy/i)

    expect(headingElement).toBeInTheDocument()
  })

  it('renders List of Cookies policies', () => {
    const { getByRole } = renderCookies()

    const CookiesList = getByRole('list')

    expect(CookiesList).toBeInTheDocument()
  })

  it('renders all ListItem of Cookies policies list', () => {
    const { getAllByRole } = renderCookies()

    const CookiesItems = getAllByRole('listitem')

    expect(CookiesItems).toHaveLength(4)
  })
})
