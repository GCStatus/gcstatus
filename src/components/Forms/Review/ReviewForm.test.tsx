import { fireEvent, render, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'

import { MOCK_GAME_DETAILS } from '@/mocks'

import ReviewForm, { ReviewFormProps } from './ReviewForm'

const mockGame = MOCK_GAME_DETAILS

const renderReviewForm = (props: ReviewFormProps = { game: mockGame }) => {
  return render(<ReviewForm {...props} />)
}

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}))

describe('ReviewForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form with correct fields', () => {
    const { getByText, getByRole, getByPlaceholderText } =
      renderReviewForm()

    expect(getByText(/Rate the Game/i)).toBeInTheDocument()
    expect(getByText(/Did you played this game?/i)).toBeInTheDocument()
    expect(
      getByPlaceholderText(/Write your review here/i),
    ).toBeInTheDocument()
    expect(getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('should have an initial state with no rating and unchecked switch', () => {
    const { queryByText, getByRole } = renderReviewForm()

    const rating = queryByText(/Rating:/)
    expect(rating).not.toBeInTheDocument()

    const switchElement = getByRole('checkbox')
    expect(switchElement).not.toBeChecked()
  })

  it('displays validation error when submitting without a rating', async () => {
    const { getByText } = renderReviewForm()

    fireEvent.click(getByText(/Submit/i))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Please, make a rate with a number between 1 and 5.',
      )
    })
  })

  it('displays validation error for too short review', async () => {
    const { getByText, findByText, getAllByRole, getByPlaceholderText } =
      renderReviewForm()

    fireEvent.click(getAllByRole('radio')[3])

    fireEvent.change(getByPlaceholderText('Write your review here...'), {
      target: { value: 'Too short' },
    })

    fireEvent.click(getByText(/Submit/i))

    const errorMessage = await findByText(
      /Your review must have at least 15 characters./i,
    )
    expect(errorMessage).toBeInTheDocument()
  })

  it('displays validation error for too long review', async () => {
    const { getByText, findByText, getAllByRole, getByPlaceholderText } =
      renderReviewForm()

    fireEvent.click(getAllByRole('radio')[4])

    const longReview = 'a'.repeat(2001)
    fireEvent.change(getByPlaceholderText('Write your review here...'), {
      target: { value: longReview },
    })

    fireEvent.click(getByText(/Submit/i))

    const errorMessage = await findByText(
      /Your review can not have more than 2000 characters!/i,
    )
    expect(errorMessage).toBeInTheDocument()
  })
  it('successfully submits the form with valid inputs', async () => {
    const { getByText, getAllByRole, getByRole, getByPlaceholderText } =
      renderReviewForm()

    fireEvent.click(getAllByRole('radio')[4])

    fireEvent.click(getByRole('checkbox'))

    fireEvent.change(getByPlaceholderText('Write your review here...'), {
      target: {
        value: 'This is a valid review with more than 15 characters.',
      },
    })

    fireEvent.click(getByText(/Submit/i))

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        review: 'This is a valid review with more than 15 characters.',
        played: true,
        userId: 1,
        rate: 2.5,
        gameId: mockGame.id,
      })
    })
  })

  it('toggles the played switch on and off', () => {
    const { getByRole } = renderReviewForm()

    const switchElement = getByRole('checkbox')

    expect(switchElement).not.toBeChecked()

    fireEvent.click(switchElement)
    expect(switchElement).toBeChecked()

    fireEvent.click(switchElement)
    expect(switchElement).not.toBeChecked()
  })

  it('allows changing the rating', () => {
    const { getAllByRole, getByText } = renderReviewForm()

    const ratingElements = getAllByRole('radio')

    fireEvent.click(ratingElements[4])
    expect(getByText('Rating: 2.5')).toBeInTheDocument()

    fireEvent.click(ratingElements[3])
    expect(getByText('Rating: 2')).toBeInTheDocument()
  })
})
