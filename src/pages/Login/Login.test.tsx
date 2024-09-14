import { fireEvent, render } from '@testing-library/react'

import Login from './Login'

const renderLogin = () => {
  return render(<Login />)
}

describe('Login Page', () => {
  it('renders the login form correctly', () => {
    const { getByRole, getByLabelText } = renderLogin()

    expect(getByLabelText(/nickname\/email/i)).toBeInTheDocument()
    expect(getByLabelText(/password/i)).toBeInTheDocument()
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('Login page snapshot', () => {
    const { asFragment } = renderLogin()

    expect(asFragment()).toMatchSnapshot()
  })

  it('displays validation errors if form is submitted without values', async () => {
    const { getByRole, findByText } = renderLogin()

    fireEvent.click(getByRole('button', { name: /login/i }))

    expect(
      await findByText(/your email or nickname is required to login/i),
    ).toBeInTheDocument()
    expect(
      await findByText(/your password is required/i),
    ).toBeInTheDocument()
  })

  // TODO: make it with real method when implemented
  it('triggers social login functions when social buttons are clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log')

    const { getByRole } = renderLogin()

    fireEvent.click(getByRole('button', { name: /google/i }))
    expect(consoleSpy).toHaveBeenCalledWith('Login with Google')

    fireEvent.click(getByRole('button', { name: /facebook/i }))
    expect(consoleSpy).toHaveBeenCalledWith('Login with Facebook')

    fireEvent.click(getByRole('button', { name: /twitter/i }))
    expect(consoleSpy).toHaveBeenCalledWith('Login with Twitter')

    consoleSpy.mockRestore()
  })
})
