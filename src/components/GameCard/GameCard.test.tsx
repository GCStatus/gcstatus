import { fireEvent, render, waitFor } from '@testing-library/react'

import { MOCK_HOT_GAMES } from '@/mocks'
import { GameList } from '@/types'

import GameCard, { GameCardProps } from './GameCard'

const game = MOCK_HOT_GAMES.pop() as GameList

const saleGame: GameList = {
  id: 1,
  cover: 'https://images7.alphacoders.com/135/thumb-1920-1355897.jpeg',
  title: 'Ghost of Tsushima',
  slug: 'ghost-of-tsushima',
  short_description: '',
  best_price: 1990,
  commom_price: 9990,
  release: '2024-09-01',
  platforms: [
    { id: 1, slug: 'ps5', name: 'PS5' },
    { id: 2, slug: 'ps4', name: 'PS4' },
    { id: 3, slug: 'pc', name: 'PC' },
  ],
  genres: [
    { id: 1, slug: 'action', name: 'Action' },
    { id: 2, slug: 'adventure', name: 'Adventure' },
    { id: 3, slug: 'single-player', name: 'Single-player' },
    { id: 10, slug: 'samurai', name: 'Samurai' },
  ],
  categories: [{ id: 1, slug: 'action', name: 'Action' }],
  tags: [
    { id: 13, slug: 'souls', name: 'Souls' },
    { id: 12, slug: 'uncracked', name: 'Uncracked' },
    { id: 9, slug: 'denuvo', name: 'Denuvo' },
    { id: 8, slug: 'rpg', name: 'RPG' },
    { id: 1, slug: 'action', name: 'Action' },
    { id: 2, slug: 'adventure', name: 'Adventure' },
    { id: 3, slug: 'single-player', name: 'Single-player' },
    { id: 4, slug: 'fantasy', name: 'Fantasy' },
    { id: 5, slug: 'mythologic', name: 'Mythologic' },
  ],
  badge: 'hot',
  views_count: 4958,
  hearts_count: 1982,
  sale: true,
}

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

    expect(getByText(game.badge!)).toBeInTheDocument()

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

  it('shows the correct prices for sale games', () => {
    const { getByText } = renderGameCard({ game: saleGame, view: 'grid' })

    expect(
      getByText(
        (game.commom_price / 100).toLocaleString('en-US', {
          currency: 'USD',
          style: 'currency',
        }),
      ),
    ).toBeInTheDocument()

    expect(
      getByText(
        (game.best_price / 100).toLocaleString('en-US', {
          currency: 'USD',
          style: 'currency',
        }),
      ),
    ).toBeInTheDocument()
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
