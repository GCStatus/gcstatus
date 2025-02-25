import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { MOCK_HOT_GAMES } from '@/mocks'
import store from '@/store'
import { GameList } from '@/types'

import GameCard, { GameCardProps } from './GameCard'

const game = MOCK_HOT_GAMES.pop() as GameList

const renderGameCard = (
  props: GameCardProps = {
    game,
    view: 'grid',
  },
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <GameCard {...props} />
      </MemoryRouter>
    </Provider>,
  )
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
    const { getByText, getByAltText, getAllByText } = renderGameCard({
      game,
      view: 'list',
    })

    expect(getByText(game.title)).toBeInTheDocument()

    expect(getByAltText(game.title)).toBeInTheDocument()

    const genreElements = getAllByText(game.genres[0].name)

    expect(genreElements.length).toBeGreaterThan(0)
  })

  it('renders correctly in grid view', () => {
    const { getByText, getByAltText } = renderGameCard()

    expect(getByText(game.title)).toBeInTheDocument()

    expect(getByAltText(game.title)).toBeInTheDocument()
  })

  it('renders genres correctly', () => {
    const { getAllByText } = renderGameCard()

    game.genres.forEach((genre) => {
      expect(getAllByText(genre.name).length).toBeGreaterThan(0)
    })
  })

  it('renders genre links with correct hrefs', () => {
    const { getByRole } = renderGameCard()

    game.genres.forEach((genre) => {
      const genreLink = getByRole('link', {
        name: genre.name,
      })

      expect(genreLink).toHaveAttribute(
        'href',
        `/games/genres/${genre.slug}`,
      )
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
        `/games/platforms/${platform.slug}`,
      )
    })
  })

  it('navigates to the game detail page on "View more" button click', () => {
    const { getByTestId } = renderGameCard()

    const viewMoreButton = getByTestId('more-btn')

    expect(viewMoreButton).toHaveAttribute('href', `/games/${game.slug}`)
  })
})
