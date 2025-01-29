import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { FiltersClassifications } from '@/types'
import { useLazyFindGamesByQuery } from '@/services/api'

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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [sort, setSort] = useState<SortState>({
    field: 'title',
    order: 'asc',
  })

  const memoizedParams = useMemo(
    () => params,
    [
      params.category,
      params.platform,
      params.genre,
      params.tag,
      params.crack,
      params.protection,
      params.developer,
      params.publisher,
    ],
  )

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
        if (filter.filterable && games.length === 0) {
          trigger({
            attribute: filter.by,
            value: filter.filterable,
          })
        }
      })
      setInitialRequestDone(true)
    }
  }, [memoizedParams, isLoading, initialRequestDone])

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
    isLoading,
    currentPage,
    setCurrentPage,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
  }
}

export default useGames
