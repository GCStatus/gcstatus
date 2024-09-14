import { render } from '@testing-library/react'
import NProgress from 'nprogress'

import LoadingScreen from './LoadingScreen'

jest.mock('nprogress')

const renderLoadingScreen = () => {
  return render(<LoadingScreen />)
}

describe('LoadingScreen Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders LoadingScreen correctly', () => {
    const { getByTestId } = renderLoadingScreen()

    const loadingScreen = getByTestId('loading-screen')

    expect(loadingScreen).toBeInTheDocument()
  })

  it('renders the LoadingScreen logo', () => {
    const { getAllByRole } = renderLoadingScreen()

    const logo = getAllByRole('img')[0]

    expect(logo).toBeInTheDocument()
  })

  it('starts NProgress on mount', () => {
    renderLoadingScreen()

    expect(NProgress.start).toHaveBeenCalledTimes(1)
  })

  it('stops NProgress on unmount', () => {
    const { unmount } = renderLoadingScreen()

    unmount()

    expect(NProgress.done).toHaveBeenCalledTimes(2)
  })
})
