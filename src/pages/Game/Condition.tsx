import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyFindGamesByConditionQuery } from '@/services/api'
import { GameList } from '@/types'

import ModuledFilters from './ModuledFilters'

export type SortField =
  | 'title'
  | 'hearts_count'
  | 'views_count'
  | 'release_date'

export interface SortState {
  field: SortField
  order: 'asc' | 'desc'
}

function Condition() {
  const { condition = '' } = useParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [originalGames, setOriginalGames] = useState<GameList[]>([])
  const [displayedGames, setDisplayedGames] = useState<GameList[]>([])
  const [totalGames, setTotalGames] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [sort, setSort] = useState<SortState>({
    field: 'title',
    order: 'asc',
  })
  const [trigger, { games }] = useLazyFindGamesByConditionQuery({
    selectFromResult: ({ data = [], isLoading, isFetching }) => ({
      games: data,
      isLoading: isLoading || isFetching,
    }),
  })

  const handleViewChange = (newView: 'grid' | 'list') => {
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 500)
  }

  const fetchGames = async () => {
    const sortedGames = displayedGames.sort((a, b) => {
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

  useEffect(() => {
    fetchGames()
  }, [currentPage, pageSize, sort, originalGames])

  useEffect(() => {
    if (games && games.length > 0 && originalGames.length === 0) {
      setOriginalGames(games)
      setDisplayedGames(games)
      setTotalGames(games.length)
    }
  }, [games])

  useEffect(() => {
    if (condition && condition.trim() !== '') trigger(condition)
  }, [condition])

  return (
    <ModuledFilters
      games={games}
      totalGames={totalGames}
      currentPage={currentPage}
      pageSize={pageSize}
      sort={sort}
      view={view}
      isAnimating={isAnimating}
      onViewChange={handleViewChange}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSortChange={handleSortChange}
    />
  )
}

export default Condition
