import { render } from '@testing-library/react'

import Footer from './Footer'

const renderFooter = () => {
  return render(<Footer />)
}

describe('Footer Component', () => {
  it('renders without crashing', () => {
    const { getByRole } = renderFooter()

    const footerElement = getByRole('contentinfo')

    expect(footerElement).toBeInTheDocument()
  })

  it('displays the logo', () => {
    const { getByRole } = renderFooter()

    const logo = getByRole('img')

    expect(logo).toBeInTheDocument()
  })

  it('contains correct buttons and links', () => {
    const { getByRole, getByTestId } = renderFooter()

    const about = getByRole('link', { name: /About GCStatus/i })
    const team = getByRole('link', { name: /GCStatus team/i })

    expect(about).toBeInTheDocument()
    expect(team).toBeInTheDocument()

    const githubLink = getByTestId('github-link')

    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/felipebrsk/',
    )

    const linkedInLink = getByTestId('linkedin-link')

    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/felipe-luz-oliveira/',
    )

    const whatsappLink = getByTestId('whatsapp-link')

    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute(
      'href',
      'https://wa.me/5579998677272/?text=Hello!',
    )

    const teamsLink = getByRole('link', { name: /Terms of use/i })
    const privacyLink = getByRole('link', { name: /Privacy/i })
    const cookiesLink = getByRole('link', { name: /Cookies/i })

    expect(teamsLink).toBeInTheDocument()
    expect(privacyLink).toBeInTheDocument()
    expect(cookiesLink).toBeInTheDocument()
  })

  it('displays the copyright text', () => {
    const { getByText } = renderFooter()

    const year = new Date().getFullYear()

    const regex = new RegExp(`© Copyright ${year}. All Rights Reserved.`)

    const copyrightText = getByText(regex)

    expect(copyrightText).toBeInTheDocument()
  })

  it('applies the correct CSS classes for responsiveness and styling', () => {
    const { getByRole } = renderFooter()

    const footerContainer = getByRole('contentinfo')

    expect(footerContainer).toHaveClass(
      'bg-gray-50',
      'dark:bg-theme-dark-900',
    )
  })
})
