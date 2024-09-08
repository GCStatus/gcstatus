import { ChangeEvent, useEffect, useState } from 'react'

import { MOCK_SEARCH_GAMES } from '@/mocks'
import { GameList } from '@/types'

export type SortField =
  | 'title'
  | 'hearts_count'
  | 'views_count'
  | 'release'

export interface SortState {
  field: SortField
  order: 'asc' | 'desc'
}

function useGames(params: {
  platform?: string
  category?: string
  genre?: string
  tag?: string
}) {
  const [games, setGames] = useState<GameList[]>([])
  const [totalGames, setTotalGames] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [sort, setSort] = useState<SortState>({
    field: 'title',
    order: 'asc',
  })

  const fetchGames = async () => {
    let filteredGames = MOCK_SEARCH_GAMES

    if (params.category) {
      filteredGames = filteredGames.filter((game) =>
        game.categories.some(({ slug }) => slug === params.category),
      )
    }

    if (params.genre) {
      filteredGames = filteredGames.filter((game) =>
        game.genres.some(({ slug }) => slug === params.genre),
      )
    }

    if (params.tag) {
      filteredGames = filteredGames.filter((game) =>
        game.tags.some(({ slug }) => slug === params.tag),
      )
    }

    if (params.platform) {
      filteredGames = filteredGames.filter((game) =>
        game.platforms.some(({ slug }) => slug === params.platform),
      )
    }

    const sortedGames = filteredGames.sort((a, b) => {
      const aValue = a[sort.field]
      const bValue = b[sort.field]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      } else if (
        typeof aValue === 'number' &&
        typeof bValue === 'number'
      ) {
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    setGames(
      sortedGames.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      ),
    )

    setTotalGames(filteredGames.length)
  }

  useEffect(() => {
    fetchGames()
  }, [currentPage, pageSize, sort])

  const handleSortChange = (field: SortField, order: 'asc' | 'desc') => {
    setSort({ field, order })
    setCurrentPage(1)
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value))
    setCurrentPage(1)
  }

  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
  }

  return {
    sort,
    games,
    pageSize,
    totalGames,
    currentPage,
    setCurrentPage,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
  }
}

export default useGames
