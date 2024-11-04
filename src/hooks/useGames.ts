import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { useLazyFindGamesByQuery } from '@/services/api'
import { FiltersClassifications, GameList } from '@/types'

export type SortField =
  | 'title'
  | 'hearts_count'
  | 'views_count'
  | 'release_date'

export interface SortState {
  field: SortField
  order: 'asc' | 'desc'
}

function useGames(params: {
  platform?: string
  category?: string
  genre?: string
  tag?: string
  cracker?: string
  developer?: string
  publisher?: string
  crack?: string
  protection?: string
}) {
  const [trigger, { games, isLoading }] = useLazyFindGamesByQuery({
    selectFromResult: ({ data = [], isLoading, isFetching }) => ({
      games: data,
      isLoading: isLoading || isFetching,
    }),
  })
  const [initialRequestDone, setInitialRequestDone] =
    useState<boolean>(false)
  const [originalGames, setOriginalGames] = useState<GameList[]>([])
  const [displayedGames, setDisplayedGames] = useState<GameList[]>([])
  const [totalGames, setTotalGames] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [sort, setSort] = useState<SortState>({
    field: 'title',
    order: 'asc',
  })

  const memoizedParams = useMemo(
    () => params,
    [params.category, params.platform, params.genre, params.tag],
  )

  const fetchGames = async () => {
    const sortedGames = [...displayedGames].sort((a, b) => {
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

    setDisplayedGames(
      sortedGames.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      ),
    )
    setTotalGames(displayedGames.length)
  }

  useEffect(() => {
    fetchGames()
  }, [currentPage, pageSize, sort, originalGames])

  useEffect(() => {
    if (!isLoading && !initialRequestDone) {
      const filters: {
        by: FiltersClassifications
        filterable?: string
      }[] = [
        { by: 'tags', filterable: memoizedParams.tag },
        { by: 'genres', filterable: memoizedParams.genre },
        { by: 'cracks', filterable: memoizedParams.crack },
        { by: 'crackers', filterable: memoizedParams.cracker },
        { by: 'platforms', filterable: memoizedParams.platform },
        { by: 'categories', filterable: memoizedParams.category },
        { by: 'developers', filterable: memoizedParams.developer },
        { by: 'publishers', filterable: memoizedParams.publisher },
        { by: 'protections', filterable: memoizedParams.protection },
      ]

      filters.forEach((filter) => {
        if (filter.filterable && originalGames.length === 0) {
          trigger({
            by: filter.by,
            filterable: filter.filterable,
          })
        }
      })
      setInitialRequestDone(true)
    }
  }, [memoizedParams, isLoading, initialRequestDone])

  useEffect(() => {
    if (games && games.length > 0 && originalGames.length === 0) {
      setOriginalGames(games)
      setDisplayedGames(games)
      setTotalGames(games.length)
    }
  }, [games])

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
    pageSize,
    isLoading,
    totalGames,
    currentPage,
    setCurrentPage,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    games: displayedGames,
  }
}

export default useGames
