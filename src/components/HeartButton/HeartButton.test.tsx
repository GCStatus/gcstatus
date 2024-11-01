import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { useAccount } from '@/hooks'
import { useHeartItemMutation } from '@/services/api'
import store from '@/store'

import HeartButton, { HeartButtonProps } from './HeartButton'

const mockSetHearts = jest.fn()
const mockSetHeartPops = jest.fn()
const mockOnHeartToggle = jest.fn()
const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

jest.mock('@/hooks', () => ({
  useAccount: jest.fn(),
}))

jest.mock('@/services/api', () => ({
  useHeartItemMutation: jest.fn(),
}))

const renderHeartButton = (
  props: HeartButtonProps = {
    isHearted: false,
    heartable_id: 1,
    heartable_type: 'games',
    type: 'button',
    setHearts: mockSetHearts,
    setHeartPops: mockSetHeartPops,
    onHeartToggle: mockOnHeartToggle,
  },
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <HeartButton {...props} />
      </MemoryRouter>
    </Provider>,
  )
}

describe('HeartButton Component', () => {
  const mockTrigger = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    ;(useHeartItemMutation as jest.Mock).mockReturnValue([mockTrigger])
    ;(useAccount as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    })
  })

  it('renders correctly when not hearted', () => {
    renderHeartButton()

    const button = screen.getByRole('button', { name: /love it!/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Love it!')
  })

  it('renders correctly when hearted', () => {
    renderHeartButton({
      isHearted: true,
      heartable_id: 1,
      heartable_type: 'games',
      type: 'button',
      setHearts: mockSetHearts,
      setHeartPops: mockSetHeartPops,
      onHeartToggle: mockOnHeartToggle,
    })

    const button = screen.getByRole('button', { name: /love it!/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-red-500')
  })

  it('navigates to login when user is not logged in', () => {
    renderHeartButton()

    const button = screen.getByRole('button', { name: /love it!/i })
    fireEvent.click(button)

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login')
  })

  it('toggles heart state when user is logged in', async () => {
    ;(useAccount as jest.Mock).mockReturnValue({
      user: {},
      loading: false,
    })

    renderHeartButton()

    const button = screen.getByRole('button', { name: /love it!/i })

    fireEvent.click(button)
    expect(mockSetHearts).toHaveBeenCalledWith(expect.any(Function))
    expect(mockSetHeartPops).toHaveBeenCalled()
    expect(mockTrigger).toHaveBeenCalledWith({
      heartable_id: 1,
      heartable_type: 'games',
    })
    expect(mockOnHeartToggle).toHaveBeenCalled()

    fireEvent.click(button)
    expect(mockSetHearts).toHaveBeenCalledWith(expect.any(Function))
    expect(mockSetHeartPops).toHaveBeenCalledTimes(1)
  })

  it('does not toggle heart state when loading', async () => {
    ;(useAccount as jest.Mock).mockReturnValue({ user: {}, loading: true })

    renderHeartButton()

    const button = screen.getByRole('button', { name: /love it!/i })

    fireEvent.click(button)
    expect(mockSetHearts).not.toHaveBeenCalled()
  })
})
