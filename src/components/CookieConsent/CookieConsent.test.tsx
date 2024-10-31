import { fireEvent, render } from '@testing-library/react'
import { useCookies } from 'react-cookie'

import CookieConsent from './CookieConsent'

jest.mock('react-cookie', () => ({
  useCookies: jest.fn(),
}))

const renderCookieConsent = () => {
  return render(<CookieConsent />)
}

describe('CookieConsent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders cookie consent when cookie is not set', () => {
    ;(useCookies as jest.Mock).mockReturnValue([{}, jest.fn()])

    const { getByText, getByRole } = renderCookieConsent()

    expect(getByText(/we need cookies!/i)).toBeInTheDocument()
    expect(
      getByText(/to provide the best experience/i),
    ).toBeInTheDocument()
    expect(getByRole('button', { name: /accept/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /decline/i })).toBeInTheDocument()
  })

  it('hides the consent message when the "Accept" button is clicked', () => {
    const setCookieMock = jest.fn()
    ;(useCookies as jest.Mock).mockReturnValue([{}, setCookieMock])

    const { queryByText, getByRole } = renderCookieConsent()

    fireEvent.click(getByRole('button', { name: /accept/i }))

    expect(setCookieMock).toHaveBeenCalledWith(
      '_gc_accept_cookies',
      '1',
      expect.objectContaining({
        path: '/',
        maxAge: 365 * 24 * 60 * 60,
      }),
    )
    expect(queryByText(/we need cookies!/i)).not.toBeInTheDocument()
  })

  it('hides the consent message when the "Decline" button is clicked', () => {
    const setCookieMock = jest.fn()
    ;(useCookies as jest.Mock).mockReturnValue([{}, setCookieMock])

    const { queryByText, getByRole } = renderCookieConsent()

    fireEvent.click(getByRole('button', { name: /decline/i }))

    expect(setCookieMock).toHaveBeenCalledWith(
      '_gc_accept_cookies',
      '1',
      expect.objectContaining({
        path: '/',
        maxAge: 365 * 24 * 60 * 60,
      }),
    )
    expect(queryByText(/we need cookies!/i)).not.toBeInTheDocument()
  })

  it('does not render the consent message if the cookie is already set', () => {
    ;(useCookies as jest.Mock).mockReturnValue([
      { _gc_accept_cookies: '1' },
      jest.fn(),
    ])

    const { queryByText } = renderCookieConsent()

    expect(queryByText(/we need cookies!/i)).not.toBeInTheDocument()
  })
})
