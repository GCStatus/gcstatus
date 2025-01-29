import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useLazyFindGamesByConditionQuery } from '@/services/api'

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
    if (condition && condition.trim() !== '') trigger(condition)
  }, [condition])

  return (
    <ModuledFilters
      games={games}
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
