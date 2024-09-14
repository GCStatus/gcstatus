import { fireEvent, render, waitFor } from '@testing-library/react'

import Forgot from './Forgot'

const renderForgot = () => {
  return render(<Forgot />)
}

describe('Forgot Password Page', () => {
  it('renders the forgot password form correctly', () => {
    const { getByText, getByLabelText, getByRole } = renderForgot()

    expect(getByText(/forgot password/i)).toBeInTheDocument()

    expect(getByLabelText(/email/i)).toBeInTheDocument()

    expect(
      getByRole('button', { name: /send reset link/i }),
    ).toBeInTheDocument()
  })

  it('Forgot password page snapshot', () => {
    const { asFragment } = renderForgot()

    expect(asFragment()).toMatchSnapshot()
  })

  it('shows validation error when submitting empty form', async () => {
    const { getByRole, findByText } = renderForgot()

    fireEvent.click(getByRole('button', { name: /send reset link/i }))

    expect(await findByText(/email is required/i)).toBeInTheDocument()
  })

  it('checks the navigation links for login and register', () => {
    const { getByText } = renderForgot()

    const loginLink = getByText(/login/i)
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.getAttribute('href')).toBe('/login')

    const registerLink = getByText(/register/i)
    expect(registerLink).toBeInTheDocument()
    expect(registerLink.getAttribute('href')).toBe('/register')
  })

  it('calls onSubmit with valid email', async () => {
    const { getByPlaceholderText, getByRole, queryByText } = renderForgot()

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})

    fireEvent.input(getByPlaceholderText(/type your email/i), {
      target: { value: 'test@example.com' },
    })

    fireEvent.click(getByRole('button', { name: /send reset link/i }))

    await waitFor(() => {
      expect(queryByText(/email is required/i)).not.toBeInTheDocument()

      expect(consoleSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })

    consoleSpy.mockRestore()
  })
})
