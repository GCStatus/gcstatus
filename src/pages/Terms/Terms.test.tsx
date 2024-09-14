import { render } from '@testing-library/react'

import Terms from './Terms'

const renderTerms = () => {
  return render(<Terms />)
}

describe('Terms Page', () => {
  it('renders Terms heading', () => {
    const { getByText } = renderTerms()

    const headingElement = getByText(/terms of use/i)

    expect(headingElement).toBeInTheDocument()
  })

  it('renders List of Terms policies', () => {
    const { getByRole } = renderTerms()

    const termsList = getByRole('list')

    expect(termsList).toBeInTheDocument()
  })

  it('renders all ListItem of Terms policies list', () => {
    const { getAllByRole } = renderTerms()

    const TermsItems = getAllByRole('listitem')

    expect(TermsItems).toHaveLength(5)
  })

  it('renders the ticket link', () => {
    const { getByRole } = renderTerms()

    const ticketLink = getByRole('link', {
      name: /click here/i,
    })

    expect(ticketLink).toBeInTheDocument()
    expect(ticketLink).toHaveAttribute('href', '/ticket/create')
  })
})
