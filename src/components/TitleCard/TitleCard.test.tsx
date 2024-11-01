import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'

import { MOCK_TITLES, MOCK_USER } from '@/mocks'
import {
  useBuyTitleMutation,
  useToggleTitleMutation,
} from '@/services/api'
import { Title, User } from '@/types'

import TitleCard from './TitleCard'

jest.mock('@/services/api', () => ({
  useBuyTitleMutation: jest.fn(),
  useToggleTitleMutation: jest.fn(),
}))

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}))

const mockUser: User = MOCK_USER
const mockTitle: Title = MOCK_TITLES.pop() as Title

describe('TitleCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useBuyTitleMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isLoading: false,
        isSuccess: false,
      },
    ])
    ;(useToggleTitleMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: null, isLoading: false, isSuccess: false },
    ])
  })

  it('renders the TitleCard with correct props', () => {
    render(<TitleCard user={mockUser} title={mockTitle} />)

    expect(screen.getByText(mockTitle.title)).toBeInTheDocument()
    expect(screen.getByText(mockTitle.description)).toBeInTheDocument()
    expect(screen.getByText(/Requirements/i)).toBeInTheDocument()
  })

  it('shows the progress bar correctly', () => {
    const halfTitle: Title = {
      ...mockTitle,
      requirements: [
        {
          ...mockTitle.requirements[0],
          progress: {
            id: 1,
            progress: mockTitle.requirements[0].goal / 2,
            completed: false,
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
          },
        },
      ],
    }

    render(<TitleCard user={mockUser} title={halfTitle} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    expect(screen.getByText(/50%/i)).toBeInTheDocument()
  })

  it('calls buy mutation when Buy button is clicked', async () => {
    const buyMock = jest
      .fn()
      .mockResolvedValue({ message: 'Title purchased successfully!' })
    ;(useBuyTitleMutation as jest.Mock).mockReturnValue([
      buyMock,
      {
        data: { message: 'Title purchased successfully!' },
        isLoading: false,
        isSuccess: true,
      },
    ])

    const purchasable: Title = {
      ...(MOCK_TITLES.shift() as Title),
      purchasable: true,
      cost: 50,
    }

    render(
      <TitleCard
        user={{
          ...mockUser,
          wallet: {
            id: 1,
            amount: 50,
          },
        }}
        title={purchasable}
      />,
    )

    const buyButton = screen.getByRole('button', {
      name: /Buy for 50 Coins/i,
    })

    fireEvent.click(buyButton)

    await waitFor(async () => {
      expect(buyMock).toHaveBeenCalled()

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          'Title purchased successfully!',
        )
      })
    })
  })

  it('calls toggle mutation when Enable/Disable button is clicked', async () => {
    const toggleMock = jest
      .fn()
      .mockResolvedValue({ message: 'Title toggled successfully!' })
    ;(useToggleTitleMutation as jest.Mock).mockReturnValue([
      toggleMock,
      {
        data: { message: 'Title toggled successfully!' },
        isLoading: false,
        isSuccess: true,
      },
    ])

    const userWithTitle: User = { ...mockUser, title: mockTitle }

    render(<TitleCard user={userWithTitle} title={mockTitle} />)

    const toggleButton = screen.getByRole('button', {
      name: /Disable title/i,
    })

    fireEvent.click(toggleButton)

    await waitFor(async () => {
      expect(toggleMock).toHaveBeenCalledWith(mockTitle.id)

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          'Title toggled successfully!',
        )
      })
    })
  })

  it('displays the appropriate chip based on progress', () => {
    render(
      <TitleCard user={mockUser} title={MOCK_TITLES.shift() as Title} />,
    )

    expect(screen.getByText(/in progress/i)).toBeInTheDocument()

    const completedTitle: Title = {
      ...mockTitle,
      requirements: [
        {
          ...mockTitle.requirements[0],
          progress: {
            id: 1,
            progress: 100,
            completed: true,
            created_at: '2024-01-01T00:00:00.000Z',
            updated_at: '2024-01-01T00:00:00.000Z',
          },
        },
      ],
    }

    render(<TitleCard user={mockUser} title={completedTitle} />)
    expect(screen.getByText(/Owned/i)).toBeInTheDocument()
  })
})
