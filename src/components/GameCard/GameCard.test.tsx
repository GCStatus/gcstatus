import { fireEvent, render, waitFor } from '@testing-library/react'

import { MOCK_HOT_GAMES } from '@/mocks'
import { GameList } from '@/types'

import GameCard, { GameCardProps } from './GameCard'

const game = MOCK_HOT_GAMES.pop() as GameList

const renderGameCard = (
  props: GameCardProps = {
    game,
    view: 'grid',
  },
) => {
  return render(<GameCard {...props} />)
}

jest.mock('../HeartsUp', () => ({
  __esModule: true,
  default: ({ delay }: { delay: number }) => (
    <div data-qa={`heart-pop-${delay}`}>Heart Pop!</div>
  ),
}))

describe('GameCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly in list view', () => {
    const { getByText, getByAltText } = renderGameCard({
      game,
      view: 'list',
    })

    expect(getByText(game.title)).toBeInTheDocument()

    expect(getByAltText(game.title)).toBeInTheDocument()

    expect(getByText(game.condition!)).toBeInTheDocument()

    expect(getByText(game.hearts_count.toString())).toBeInTheDocument()

    expect(getByText(game.genres[0].name)).toBeInTheDocument()
  })

  it('renders correctly in grid view', () => {
    const { getByText, getByAltText } = renderGameCard()

    expect(getByText(game.title)).toBeInTheDocument()

    expect(getByAltText(game.title)).toBeInTheDocument()
  })

  it('handles heart button click correctly', async () => {
    const { getByTestId, getByText } = renderGameCard()

    const heartButton = getByTestId('heart')

    fireEvent.click(heartButton)

    await waitFor(() => {
      expect(
        getByText((game.hearts_count + 1).toString()),
      ).toBeInTheDocument()
    })

    fireEvent.click(heartButton)

    await waitFor(() => {
      expect(getByText(game.hearts_count.toString())).toBeInTheDocument()
    })
  })

  it('renders genres correctly', () => {
    const { getByText } = renderGameCard()

    game.genres.forEach((genre) => {
      expect(getByText(genre.name)).toBeInTheDocument()
    })
  })

  it('renders genre links with correct hrefs', () => {
    const { getByRole } = renderGameCard()

    game.genres.forEach((genre) => {
      const genreLink = getByRole('link', {
        name: genre.name,
      })

      expect(genreLink).toHaveAttribute('href', `/genres/${genre.slug}`)
    })
  })

  it('renders platforms correctly', () => {
    const { getByText } = renderGameCard()

    game.platforms.forEach((platform) => {
      expect(getByText(platform.name)).toBeInTheDocument()
    })
  })

  it('renders platform links with correct hrefs', () => {
    const { getByRole } = renderGameCard()

    game.platforms.forEach((platform) => {
      const platformLink = getByRole('link', {
        name: platform.name,
      })

      expect(platformLink).toHaveAttribute(
        'href',
        `/platforms/${platform.slug}`,
      )
    })
  })

  it('navigates to the game detail page on "View more" button click', () => {
    const { getByTestId } = renderGameCard()

    const viewMoreButton = getByTestId('more-btn')

    expect(viewMoreButton).toHaveAttribute('href', `/games/${game.slug}`)
  })
})
